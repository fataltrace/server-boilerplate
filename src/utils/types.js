import {
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'

const SORT_ORDER_ASC = 'ASC'
const SORT_ORDER_DESC = 'DESC'

export const SortOrderType = new GraphQLEnumType({
  name: 'SortOrder',
  values: {
    ASC: {
      value: SORT_ORDER_ASC
    },
    DESC: {
      value: SORT_ORDER_DESC
    }
  }
})

export const createSortInputType = ({ name, type }) => new GraphQLInputObjectType({
  name,
  fields: {
    field: {
      type: new GraphQLNonNull(type)
    },
    order: {
      type: SortOrderType,
      defaultValue: SORT_ORDER_ASC
    }
  }
})

export const StringFilterInputType = new GraphQLInputObjectType({
  name: 'StringFilter',
  fields: {
    equals: {
      type: GraphQLString
    },
    contains: {
      type: GraphQLString
    }
  }
})

export const IntegerFilterInputType = new GraphQLInputObjectType({
  name: 'IntegerFilter',
  fields: {
    equals: {
      type: GraphQLInt
    },
    gt: {
      type: GraphQLInt
    },
    gte: {
      type: GraphQLInt
    },
    lt: {
      type: GraphQLInt
    },
    lte: {
      type: GraphQLInt
    }
  }
})

export const createFilterInputType = ({ name, fields }) => {
  const FilterInputType = new GraphQLInputObjectType({
    name,
    fields: () => ({
      ...fields,
      and: {
        type: new GraphQLList(new GraphQLNonNull(FilterInputType))
      },
      or: {
        type: new GraphQLList(new GraphQLNonNull(FilterInputType))
      },
      not: {
        type: FilterInputType
      }
    })
  })

  return FilterInputType
}