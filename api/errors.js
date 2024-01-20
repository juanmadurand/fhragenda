class BadRequestError extends Error {
  constructor(message = 'BAD REQUEST', statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'UNAUTHORIZED', statusCode = 401) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'FORBIDDEN', statusCode = 403) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

module.exports = { BadRequestError, UnauthorizedError, ForbiddenError };
