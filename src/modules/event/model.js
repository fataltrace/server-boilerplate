import mongoose from 'mongoose'

import { modelName as UserRef } from '../user/model.js'

const { Schema } = mongoose
const { Types } = Schema

const modelName = 'Event'

const schema = Schema({
  _id: Types.ObjectId,
  name: Types.String,
  users: [{
    type: Types.ObjectId,
    ref: UserRef,
    required: true
  }]
}, {
  strict: 'throw',
  minimize: false,
  timestamps: true
})

export default mongoose.model(modelName, schema)
export { schema, modelName }