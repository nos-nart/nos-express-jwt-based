const sendApiError = require('./response');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error on console
  console.log(err);

  // Handle Bad ObjectID error
  if (err.name === 'CaseError') {
    const message = `Resource not found with id of ${err.value}`;
    sendApiError(res, 404, err, message); // 404 - Not found error
  }

  // Handle Duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    sendApiError(res, 400, err, message); // 400 - Client error
  }

  // Handle Validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(error => error.message);
    sendApiError(res, 400, err, message); // 400 - Client error
  }

  sendApiError(res, error.statusCode || 500, error, error.message || 'Server Error');
};

module.exports = errorHandler;
