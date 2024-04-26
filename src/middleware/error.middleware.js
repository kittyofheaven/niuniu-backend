class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden Access') {
    super(message, 403);
  }
}

class FieldExistError extends CustomError {
  constructor(message = 'Field already exists') {
    super(message, 400);
  }
}

class FieldConflictError extends CustomError {
  constructor(message = 'Field Conflict') {
    super(message, 409);
  }
}

class UserNotFoundError extends CustomError {
  constructor(message = 'User not found') {
    super(message, 404);
  }
}

class FieldEmptyError extends CustomError {
  constructor(message = 'A field is empty') {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError{
  constructor(message = 'An Unauthorized Error'){
    super(message, 401)
  }
}

class UnknownError extends CustomError {
  constructor(message = 'Unknown error has occurred') {
    super(message, 500);
  }
}

const errorHandler = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ status: false, code: statusCode || 500, message: message, data: null });
};

module.exports = {
  CustomError,
  ForbiddenError,
  FieldExistError,
  UserNotFoundError,
  FieldEmptyError,
  UnknownError,
  errorHandler,
  FieldConflictError,
  UnauthorizedError
};
