import File from './model.js'
import FileStore from '../../services/fileStore.js'
import { calcHashSum } from './helpers.js'
import { noWrap } from '../../utils/strings.js'

const createFile = (file, payload) => {
  return FileStore.createOne(file)
    .catch(error => {
      throw Error(noWrap`
      Error occurs while writing file into file store.
      Native error: ${error.message}
    `)
    })
    .then(() => {
      return File.createOne(payload)
    })
    .catch(error => {
      throw Error(noWrap`
        Error occurs while creating file in DB
        "${name}" (${mime}, ${encoding}) from ${createdBy}.
        Native error: ${error.message}
      `)
    })
}

/** @todo Need to implement one */
export const fetchOne = () => {
  return Promise.resolve()
}

/** @todo Need to implement one */
export const fetchMany = () => {
  return Promise.resolve()
}

export const createOne = ({
  name,
  mime,
  encoding,
  createdBy
}, file) => {
  const calculatingHash = calcHashSum(file.createReadStream())
    .catch(error => {
      throw Error(noWrap`
        Error occurs while calculating hash sum for file
        "${name}" (${mime}, ${encoding}) from ${createdBy}.
        Native error: ${error.message}
      `)
    })

  const fetchingDbFile = calculatingHash
    .then(md5 => {
      return File.findOne({ md5 })
    })
    .catch(error => {
      throw Error(noWrap`
        Error occurs while searching for md5 file hash in DB
        "${name}" (${mime}, ${encoding}) from ${createdBy}.
        Native error: ${error.message}
      `)
    })

  Promise.all([
    calculatingHash,
    fetchingDbFile
  ])
    .then(([md5, file]) => {
      return file
        ? file
        : createFile({
          name,
          mime,
          encoding,
          md5,
          createdBy
        })
    })
}

/** @todo Need to implement one */
export const createMany = () => {
  return Promise.resolve()
}

/** @todo Need to implement one */
export const removeOne = () => {
  return Promise.resolve()
}