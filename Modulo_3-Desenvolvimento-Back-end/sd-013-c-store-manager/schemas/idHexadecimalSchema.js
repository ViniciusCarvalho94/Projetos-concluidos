const Joi = require('joi');

const idProductSchema = Joi.string().hex().length(24).message(
  'Wrong id format',
);

const idSaleSchema = Joi.string().hex().length(24).message(
  'Wrong sale ID format',
);

module.exports = {
  idProductSchema,
  idSaleSchema,
};