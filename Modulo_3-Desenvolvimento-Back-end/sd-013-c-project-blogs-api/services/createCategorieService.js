const objError = require('../functions/objError');
const { Categorie } = require('../models');
const categorieSchema = require('../schemas/categorieSchema');

function validateSchema(name) {
  const { error } = categorieSchema.validate({ name });
  if (error) throw objError(400, error.message); 
}

module.exports = async (name) => {
  validateSchema(name);

  const categorie = await Categorie.create({ name });
  return categorie;
};