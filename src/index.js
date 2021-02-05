import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import { ApolloServer } from 'apollo-server-koa'
import FileStore from './services/fileStore.js'
import initDbConnection from './services/db.js'
import graphqlSchema from './services/graphql.js'
import log from './services/logger.js'
import { success } from './helpers/responses.js'
import {
  ROUTE_API,
  ROUTE_HEALTH
} from './constants.js'

const {
  MONGODB_URI,
  MONGODB_POOL_SIZE,
  SERVER_HOST,
  SERVER_PORT_HTTP,
  JWT_SECRET
} = process.env

Promise.all([
  FileStore({  }),
  initDbConnection({ uri: MONGODB_URI, poolSize: MONGODB_POOL_SIZE })
])
  .then(() => {
    const koa = new Koa()
    const koaRouter = new KoaRouter()
    const apollo = new ApolloServer({
      schema: graphqlSchema,
      context: ({ ctx: { state: user } }) => ({ user })
    })

    koaRouter
      .get(ROUTE_HEALTH, context => context.body = success('I\'m alive!'))

    koa
      .use(jwt({ secret: JWT_SECRET, passthrough: true }))
      .use(koaBodyParser())
      .use(apollo.getMiddleware({ path: ROUTE_API }))
      .use(koaRouter.routes())
      .use(koaRouter.allowedMethods())
      .listen(
        { port: SERVER_PORT_HTTP },
        () => log(`🚀 Server ready at http://${SERVER_HOST}:${SERVER_PORT_HTTP}`)
      )
  })
  .catch(error => {
    log.error(error)
  })