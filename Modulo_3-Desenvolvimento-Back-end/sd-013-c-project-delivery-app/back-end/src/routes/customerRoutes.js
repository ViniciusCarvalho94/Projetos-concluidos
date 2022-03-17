const express = require('express');
const {
  findProductsForCustomer,
  findOrdersOfCustomer } = require('../controllers/customerController');

const customerRoutes = express.Router();

customerRoutes.get('/products', findProductsForCustomer);
customerRoutes.post('/orders', findOrdersOfCustomer);

module.exports = customerRoutes;
