class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default ErrorHandler;

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.code == 11000) {
    const statusCode = 400;
    const message = "Duplicate field value entered";
    err = new ErrorHandler(message, statusCode);
  }

  if (err.name == "JsonWebTokenError") {
    const statusCode = 400;
    const message = "Json Web Token is Invalid";
    err = new ErrorHandler(message, statusCode);
  }

  if (err.name == "TokenExpiredError") {
    const statusCode = 400;
    const message = "Json Web Token is Expired";
    err = new ErrorHandler(message, statusCode);
  }

  // if (err.name === "NotBeforeError") {
  //   err.message = "Token not active yet.";
  //   err.statusCode = 400;
  // }

  if (err.name === "CastError") {
    const message = `Resource not found. ${err.path}`;
    const statusCode = 400;
    err = new ErrorHandler(message, statusCode);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
