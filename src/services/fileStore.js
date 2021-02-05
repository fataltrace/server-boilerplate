import fs from 'fs'
import { pipeline } from 'stream'

let instance = null

export default instance

export const init = ({
  resolvePath = () => {}
}) => {
  if (instance !== null) {
    return instance
  }

  const createOne = ({
    stream,
    path = resolvePath(),
  }) => {
    return pipeline(
      stream,
      fs.createWriteStream(path)
    )
  }

  const removeOne = (path) => {
    return fs.readWriteStream(path)
  }

  instance = Object.freeze({
    createOne,
    removeOne
  })

  return instance
}