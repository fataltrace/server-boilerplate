import mongoose from 'mongoose'

export default ({ uri, poolSize }) => {
  mongoose.connection.on('error', (error) => console.error(error))
  mongoose.connection.on('disconnect', (error) => console.log('DB reconnecting', error))
  mongoose.connection.on('disconnected', () => console.log('DB connection lost.'))
  mongoose.connection.on('close', () => console.log('DB connection closed.'))

  return mongoose.connect(
    uri,
    {
      poolSize,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
}