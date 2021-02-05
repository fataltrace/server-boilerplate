import bcrypt from 'bcrypt'
import jwt from 'jwt'

/**
 * Generates hash
 * 
 * @param {string} value plain text
 * @param {number} [saltRounds] default value 10
 * @returns {Promise.<string>} hash
 */
export const hashPassword = (value, saltRounds = 10) => {
  return bcrypt.hash(value, saltRounds)
}

/**
 * Verifies value
 * 
 * @param {string} value
 * @param {string} hash
 * @returns {Promise.<boolean>}
 */
export const verifyPassword = (value, hash) => {
  return bcrypt.compare(value, hash)
}

export const signToken = () => {
  return jwt.sign(payload, secret, options)
}

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret)
}