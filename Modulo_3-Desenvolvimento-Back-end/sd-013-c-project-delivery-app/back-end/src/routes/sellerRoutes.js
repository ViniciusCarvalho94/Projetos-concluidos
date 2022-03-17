const sellerRoutes = require('express').Router();

const { 
  findOrdersBySeller, 
  findAllSellers, 
  findOrderByIdController,
} = require('../controllers/sellerController');

sellerRoutes.get('/', findAllSellers);
sellerRoutes.post('/orders', findOrdersBySeller);
sellerRoutes.get('/orders/:id', findOrderByIdController);

module.exports = sellerRoutes;