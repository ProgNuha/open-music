import Joi from 'joi';

export const songPayloadSchema = Joi.object({
  title: Joi.string().required().max(100),
  year: Joi.number().required().integer().min(1900).max(2100),
  genre: Joi.string().required().max(50),
  performer: Joi.string().required().max(100),
  duration: Joi.number().integer().min(0),
  albumId: Joi.string().max(50),
});

export const songUpdatePayloadSchema = Joi.object({
  title: Joi.string().required().max(100),
  year: Joi.number().required().integer().min(1900).max(2100),
  genre: Joi.string().required().max(50),
  performer: Joi.string().required().max(100),
  duration: Joi.number().integer().min(0),
  albumId: Joi.string().max(50),
});

export const songQuerySchema = Joi.object({
  title: Joi.string().allow(''),
  performer: Joi.string().allow(''),
});
