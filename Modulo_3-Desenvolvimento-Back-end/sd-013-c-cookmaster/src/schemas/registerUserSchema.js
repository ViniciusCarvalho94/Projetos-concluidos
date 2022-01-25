const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid entries. Try again.',
  }),
  password: Joi.string().required(),
}).messages({
  'any.required': 'Invalid entries. Try again.',
});