import { InvariantError } from '../exceptions/index.js';

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
      });

      if (error) {
        throw new InvariantError(error.details.map(detail => detail.message).join(', '));
      }

      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validate;