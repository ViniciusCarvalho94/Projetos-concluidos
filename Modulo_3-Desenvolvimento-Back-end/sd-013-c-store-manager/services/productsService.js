const model = require('../models/productsModel');
const productsSchema = require('../schemas/productsSchema');
const { idProductSchema } = require('../schemas/idHexadecimalSchema');
const errors = require('../errors/objErrors');

const findProductByNameService = async (name) => {
  const response = await model.findProductByNameModel(name);
  return response;
};

const createProductService = async (product) => {
  const { name, quantity } = product;
  const { error } = await productsSchema.validate({ name, quantity });

  if (error) throw errors.schemaError(error);

  const productExists = await findProductByNameService(name);
  if (productExists) throw errors.productExistsError;

  const id = await model.createProductModel(name, quantity);

  return { _id: id, name, quantity };
};

const findAllProductsService = async () => {
  const response = await model.findAllProductsModel();
  const newObj = { 
    products: response,
  };

  return newObj;
};

const findProductByIdService = async (id) => {
  const { error } = await idProductSchema.validate(id);
  if (error) throw errors.schemaError(error);

  const response = await model.findProductByIdModel(id);

  return response;
};

const updateProductByIdService = async (id, name, quantity) => {
  const { error } = await productsSchema.validate({ name, quantity });
  if (error) throw errors.schemaError(error);

  const updateProductObj = { 
    _id: id,
    name,
    quantity,
  };

  const response = await model.updateProductByIdModel(updateProductObj);
  
  return response;
};

const deleteProductByIdService = async (id) => {
  const { error } = await idProductSchema.validate(id);
  if (error) throw errors.schemaError(error);
  const sale = await model.findProductByIdModel;
  await model.deleteProductByIdService(id);

  return sale;
};

module.exports = {
  createProductService,
  findAllProductsService,
  findProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
};