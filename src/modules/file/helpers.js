import crypto from 'crypto'

/**
 * Calculates hash sum for stream
 * 
 * @param {ReadStream} stream
 * @param {string} [algorithm]
 * @param {string} [encoding]
 * @returns {Promise.<string>} hash
 */
export const calcHashSum = (stream, algorithm = 'md5', encoding = 'hex') => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm)

    stream.on('data', (chunk) => hash.update(chunk))
    stream.on('close', () => resolve(hash.digest(encoding)))
    stream.on('error', reject)
  })
}