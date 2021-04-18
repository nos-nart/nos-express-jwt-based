const sendApiSuccess = (res, statusCode, data, message) => {
  return res.status(statusCode)
    .send({
      ok: true,
      status: statusCode,
      message,
      data,
      error: null
    })
}

const sendApiError = (res, status, error, message) => {
  return res.status(statusCode)
    .send({
      ok: false,
      status: statusCode,
      message,
      data: null,
      error
    })
}

module.exports = {
  sendApiSuccess,
  sendApiError
}