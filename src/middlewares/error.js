// error.js - using NAMED imports (matches validator.js)
import {
  AuthenticationError,
  InvariantError,
  NotFoundError,
} from "../exceptions/index.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid JSON format",
    });
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }

  if (err instanceof InvariantError) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: "error",
    message: "Terjadi kegagalan pada server kami.",
  });
};

export default errorHandler;
