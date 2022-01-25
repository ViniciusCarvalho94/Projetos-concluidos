const service = require('../services/productsService');

const createProductController = async (req, res, next) => {
  try {
    const product = req.body;
    const response = await service.createProductService(product);

    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
};

const findAllProductsController = async (_req, res, next) => {
  try {
    const response = await service.findAllProductsService();

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const findProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.findProductByIdService(id);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const response = await service.updateProductByIdService(id, name, quantity);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.deleteProductByIdService(id);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProductController,
  findAllProductsController,
  findProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
};