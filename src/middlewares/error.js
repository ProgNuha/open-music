import AuthenticationError from "../exceptions/authentication-error.js";
import InvariantError from "../exceptions/invariant-error.js";
import NotFoundError from "../exceptions/not-found-error.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      status: 'fail',
      message: err.message,
    });
  }

  if (err instanceof InvariantError) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server kami.',
  });
};

export default errorHandler;