import { mergeSchemas } from '@graphql-tools/merge'
import UserSchema from '../modules/user/schema.js'
import EventSchema from '../modules/event/schema.js'
import FileSchema from '../modules/file/schema.js'

const schema = mergeSchemas({
  schemas: [
    UserSchema,
    EventSchema,
    FileSchema
  ]
})

export default schema