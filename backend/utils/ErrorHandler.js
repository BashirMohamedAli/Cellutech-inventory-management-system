class ErrorHandler extends Error {
  constructor(message, statusCode) {
    manager(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
