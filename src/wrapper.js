module.exports = {
  data: (status, data, message = null) => {
    return {
      err: !status, 
      data, 
      message
    }
  },
  response: (message = null, code = 200, data = null, details = null) => {
    return {
      code,
      data,
      message,
      details
    }
  },
}
