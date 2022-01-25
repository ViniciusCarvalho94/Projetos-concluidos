const service = require('../services/salesService');

const createSalesController = async (req, res, next) => {
  try {
    const salesArray = req.body;

    const response = await service.createSalesService(salesArray);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const findAllSalesController = async (_req, res, next) => {
  try {
    const response = await service.findAllSalesService();

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const findSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.findSalesByIdService(id);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const updateSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const response = await service.updateSalesByIdService(id, product);
    
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.deleteSalesByIdService(id);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createSalesController,
  findAllSalesController,
  findSalesByIdController,
  updateSalesByIdController,
  deleteSalesByIdController,
};