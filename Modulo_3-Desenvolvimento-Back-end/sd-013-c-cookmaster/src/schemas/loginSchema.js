const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Incorrect username or password',
  }),
  password: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
});