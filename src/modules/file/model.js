import mongoose from 'mongoose'
import { modelName as UserRef } from '../user/model.js'

const { Schema } = mongoose
const { Types } = Schema
const modelName = 'File'

const schema = Schema({
  name: {
    type: Types.String,
    required: true
  },
  mime: {
    type: Types.String,
    required: true
  },
  encoding: {
    type: Types.String,
    required: true
  },
  md5: {
    type: Types.String,
    required: true
  },
  sha512: {
    type: Types.String,
    required: true
  },
  createdBy: {
    type: Types.ObjectId,
    ref: UserRef,
    required: true
  }
}, {
  strict: 'throw',
  minimize: false,
  timestamps: true
})

export default mongoose.model(modelName, schema)
export { schema, modelName }