const Joi = require('joi');

// Body Validation Schema
const todoBodySchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(200),
  isCompleted: Joi.boolean(),
  dueDate: Joi.date().required()
});

// Params Validation Schema
const todoParamsSchema = Joi.object({
  id: Joi.string().hex().length(24).required(), // For MongoDB ObjectId
});

// Query Validation Schema
const todoQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

module.exports = {todoBodySchema,todoParamsSchema,todoQuerySchema}


