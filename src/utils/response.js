const response = (res, statusCode, message, data) => {
  return res
    .status(statusCode)
    .json({
      code: statusCode,
      status: statusCode < 400 ? 'success' : 'fail',
      message,
      data,
    })
    .end();
};

export const success = (res, data, message = 'Success', statusCode = 200) => {
  return res
    .status(statusCode)
    .json({
      status: 'success',
      message,
      data,
    })
    .end();
};

export const fail = (res, message, statusCode = 400) => {
  return res
    .status(statusCode)
    .json({
      status: 'fail',
      message,
    })
    .end();
};

export default response;
