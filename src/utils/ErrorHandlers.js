class NotFoundError {
  constructor(message) {
    this.message = message;
    this.status = 404;
  }
}

class UnAuthorizedError {
  constructor(message) {
    this.message = message;
    this.status = 401;
  }
}

class ForbiddenError {
  constructor(message) {
    this.message = message;
    this.status = 403;
  }
}

class DbError {
  constructor(message) {
    this.message = message;
    this.status = 500;
  }
}

exports.ForbiddenError = ForbiddenError;
exports.DbError = DbError;
exports.UnAuthorizedError = UnAuthorizedError;
exports.NotFoundError = NotFoundError;
