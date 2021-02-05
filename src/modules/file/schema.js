import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql'
import { GraphQLUpload } from 'apollo-server-koa'
import {
  fetchOne,
  fetchMany,
  createOne,
  createMany,
  removeOne
} from './api.js'
import UserType from '../user/schema.js'
import {
  createFilterInputType,
  StringFilterInputType
} from '../../utils/types.js'

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    md5: { type: new GraphQLNonNull(GraphQLString) },
    mime: { type: new GraphQLNonNull(GraphQLString) },
    encoding: { type: new GraphQLNonNull(GraphQLString) },
    createdBy: { type: new GraphQLNonNull(UserType) }
  }
})

const FileFilterType = createFilterInputType({
  name: 'FileFilter',
  fields: {
    _id: {
      type: StringFilterInputType
    },
    name: {
      type: StringFilterInputType
    }
  }
})

const queries = {
  file: {
    type: FileType,
    args: {
      filter: {
        type: FileFilterType
      }
    },
    resolve (root, { filters }) {
      return fetchOne(filters)
    }
  },
  files: {
    type: new GraphQLList(FileType),
    args: {
      filter: {
        type: FileFilterType
      }
    },
    resolve (root, { filters }) {
      return fetchMany(filters)
    }
  }
}

const mutations = {
  fileUpload: {
    type: FileType,
    args: {
      files: {
        type: new GraphQLNonNull(GraphQLList(GraphQLUpload))
      }
    },
    resolve: (root, { file }) => {
      const {
        filename: name,
        mimetype: mime,
        encoding,
        createReadStream
      } = file

      return createOne({
        name,
        mime,
        encoding,
        createReadStream
      })
    }
  },

  filesUpload: {
    type: FileType,
    args: {
      files: {
        type: new GraphQLNonNull(GraphQLList(GraphQLUpload))
      }
    },
    resolve: (root, { files }) => {
      const payload = files.map(({
        filename: name,
        mimetype: mime,
        encoding,
        createReadStream
      }) => ({
        name,
        mime,
        encoding,
        createReadStream
      }))

      return createMany(payload)
    }
  },
  fileRemove: {
    type: FileType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve (root, { id }) {
      return removeOne({ _id: id })
    }
  }
}

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      file: queries.file,
      files: queries.files
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      fileUpload: mutations.fileUpload,
      filesUpload: mutations.filesUpload,
      fileRemove: mutations.fileRemove
    }
  })
})

export default Schema