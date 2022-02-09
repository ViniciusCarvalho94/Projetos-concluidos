const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().empty().required(),
  password: Joi.string().length(6).required(),
});
