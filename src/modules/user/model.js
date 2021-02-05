import mongoose from 'mongoose'

const { Schema } = mongoose
const { Types } = Schema

const modelName = 'User'

const schema = Schema({
  name: {
    type: Types.String,
    required: true,
    index: {
      unique: true
    }
  },
  email: {
    type: Types.String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: Types.String,
    required: true
  }
}, {
  strict: 'throw',
  minimize: false,
  timestamps: true
})

export default mongoose.model(modelName, schema)
export { schema, modelName }