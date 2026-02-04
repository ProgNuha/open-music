import { InvariantError } from '../exceptions/index.js';

const validatePayload = (schema, payload) => {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    throw new InvariantError(error.details.map(detail => detail.message).join(', '));
  }

  return value;
};

export default validatePayload;
