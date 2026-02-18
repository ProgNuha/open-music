import multer from 'multer';
import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';
 
// eslint-disable-next-line no-unused-vars
const ErrorHandler = (err, req, res, next) => {
  // Handle Multer errors (e.g. file too large)
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return response(res, 413, 'Ukuran file terlalu besar', null);
    }
    return response(res, 400, err.message, null);
  }
  // Handle ClientError and its subclasses (InvariantError, NotFoundError)
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }
  // Handle Joi validation errors
  if (err.isJoi) {
    return response(res, err.statusCode, err.details[0].message, null);
  }
 
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
 
  console.error('Unhandled error:', err);
  return response(res, status, message, null);
};
 
export default ErrorHandler;