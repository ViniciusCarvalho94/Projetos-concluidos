const Joi = require('joi');

const salesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().hex().length(24),
    quantity: Joi.number().greater(0).required(),
  }),
);

module.exports = salesSchema;