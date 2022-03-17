const registerSale = require('express').Router();

const { registerSaleController } = require('../controllers/saleController');

registerSale.post('/', registerSaleController);

module.exports = registerSale;
