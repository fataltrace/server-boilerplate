export const success = (data) => {
  return {
    status: 'success',
    data
  }
}

export const fail = (message, data = {}) => {
  return {
    status: 'fail',
    message,
    data,
  }
}