import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLScalarType,
  GraphQLInputObjectType
} from 'graphql'
import {
  createFilterInputType,
  StringFilterInputType
} from '../../utils/types.js'
import { UserType } from '../user/schema.js'
import {
  fetchOne,
  fetchAll
} from './api.js'

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    users: {
      type: new GraphQLList(UserType)
    }
  }
})

const EventFilterType = createFilterInputType({
  name: 'EventFilter',
  fields: {
    _id: {
      type: StringFilterInputType
    },
    name: {
      type: StringFilterInputType
    },
    date: {
      type: StringFilterInputType
    }
  }
})

const EventQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    events: {
      type: new GraphQLList(EventType),
      resolve: () => fetchAll()
    },
    event: {
      type: EventType,
      args: {
        filters: {
          type: EventFilterType
        }
      },
      resolve: (root, args) => fetchOne(args)
    }
  }
})

const EventMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    eventCreate: {
      type: EventType,
      resolve: (root, args) => createOne(args)
    },
    eventUpdate: {
      type: EventType,
      resolve: (root, args) => updateOne(args)
    },
    eventRemove: {
      type: EventType,
      resolve: (root, args) => removeOne(args)
    }
  }
})

const Schema = new GraphQLSchema({
  query: EventQueryType,
  mutation: EventMutationType
})

export default Schema