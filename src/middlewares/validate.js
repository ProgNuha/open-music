import InvariantError from "../exceptions/invariant-error.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return next(new InvariantError(error.message));
    }
    
    req.validated = value;
    next();
  };
};

export default validate;