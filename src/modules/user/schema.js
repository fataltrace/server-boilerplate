import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType
} from 'graphql'
import {
  createFilterInputType,
  IntegerFilterInputType,
  StringFilterInputType
} from '../../utils/types.js'
import {
  fetchOne,
  fetchAll,
  createOne,
  updateOne,
  removeOne
} from './api.js'

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})

const UserFilterType = createFilterInputType({
  name: 'UserFilter',
  fields: {
    _id: {
      type: StringFilterInputType
    },
    name: {
      type: StringFilterInputType
    }
  }
})

const UserQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        const users = await fetchAll()

        return users
      }
    },
    user: {
      type: UserType,
      args: {
        filter: {
          type: UserFilterType
        }
      },
      resolve: (root, args) => fetchOne(args)
    }
  }
})

const UserMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    userCreate: {
      type: UserType,
      resolve: (root, args) => createOne(args)
    },
    userUpdate: {
      type: UserType,
      resolve: (root, args) => updateOne(args)
    },
    userRemove: {
      type: UserType,
      resolve: (root, args) => removeOne(args)
    }
  }
})

const Schema = new GraphQLSchema({
  query: UserQueryType,
  mutation: UserMutationType
})

export default Schema