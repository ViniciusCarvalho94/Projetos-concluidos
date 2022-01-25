const salesModel = require('../models/salesModel');
const salesSchema = require('../schemas/salesSchema');
const { idSaleSchema } = require('../schemas/idHexadecimalSchema');
const productsModel = require('../models/productsModel');
const errors = require('../errors/objErrors');

const createSalesService = async (body) => {
  const { error } = await salesSchema.validate(body);
  if (body.length === 0 || error) throw errors.productIdOrQuantityError;
  
  const { productId } = body[0];
  const quantitySale = body[0].quantity;
  const { _id, name, quantity } = await productsModel.findProductByIdModel(productId);
  const newQuantity = quantity - quantitySale;
  if (newQuantity < 0) throw errors.quantityMinorZeroError;
  const updateProduct = { _id, name, quantity: newQuantity };
  await productsModel.updateProductByIdModel(updateProduct);

  const { insertedId } = await salesModel.createSalesModel(body);

  return {
    _id: insertedId,
    itensSold: body,
  };
};

const findAllSalesService = async () => {
  const response = await salesModel.findAllSalesModel();

  return response;
};

const findSalesByIdService = async (id) => {
  if (id.length !== 24) throw errors.saleNotFoundError;

  const response = await salesModel.findSalesByIdModel(id);
  
  if (!response) throw errors.saleNotFoundError;

  return response;
};

const updateSalesByIdService = async (id, product) => {
  const { error } = await salesSchema.validate(product);
  if (error) throw errors.productIdOrQuantityError;

  const { itensSold } = await salesModel.findSalesByIdModel(id);
  const newSales = itensSold.map((itens) => {
    const newObj = itens.productId === product[0].productId ? { ...product[0] } : { ...itens };
    return newObj;
  });
  
  await salesModel.updateSalesByIdModel(id, newSales);
  const sales = { _id: id, itensSold: product };

  return sales;
};

const deleteSalesByIdService = async (id) => {
  const { error } = await idSaleSchema.validate(id);
  if (error) throw errors.schemaError(error);
  
  const sale = await salesModel.findSalesByIdModel(id);
  const { itensSold } = sale;
  const quantitySale = itensSold[0].quantity;
  const { _id, name, quantity } = await productsModel.findProductByIdModel(itensSold[0].productId);
  const newQuantity = quantity + quantitySale;
  const updateProduct = { _id, name, quantity: newQuantity };
  await productsModel.updateProductByIdModel(updateProduct);
  await salesModel.deleteSalesByIdModel(id);

  return sale;
};

module.exports = {
  createSalesService,
  findAllSalesService,
  findSalesByIdService,
  updateSalesByIdService,
  deleteSalesByIdService,
};