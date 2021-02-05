import Event from './model.js'

export const fetchAll = () => {
  return Event.find()
    .then(events => events.map(event => event.toObject()))
    .catch(error => Promise.reject(error))
}

/**
 * 
 * @param {Object} query
 * @param {Object} query.filters
 * @returns {Promise}
 */
export const fetchOne = (query) => {
  return Event.findOne(query)
    .then(event => event ? event.toObject() : null)
    .catch(error => Promise.reject(error))
}

export const createOne = () => {
  return Promise.resolve()
}

export const updateOne = () => {
  return Promise.resolve()
}

export const removeOne = () => {
  return Promise.resolve()
}

export const login = () => {
  return Promise.resolve()
}

export const logout = () => {
  return Promise.resolve()
}