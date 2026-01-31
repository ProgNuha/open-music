import Joi from'joi';

export const albumPayloadSchema = Joi.object({
  name: Joi.string().required().max(50),
  year: Joi.number().required(),
});

export const albumUpdatePayloadSchema = Joi.object({
  name: Joi.string().required().max(50),
  year: Joi.number().required(),
});

export const albumQuerySchema = Joi.object({
  name: Joi.string().empty(),
});