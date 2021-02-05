export const noWrap = (parts, ...values) => {
  return parts
    .reduce((result, part, index) => result + part + (values[index] ?? (values[index] === null ? 'null' : '')), '')
    .replace(/\n/g, ' ')
    .trim()
}