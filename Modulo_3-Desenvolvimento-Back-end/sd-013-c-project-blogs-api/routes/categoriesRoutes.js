const express = require('express');
const jwtValidateMiddleware = require('../middlewares/jwtValidateMiddleware');

const categoriesRoutes = express.Router();
const { 
  createCategoriesController, 
  getAllCategoriesController,
} = require('../controllers/categoriesController');

categoriesRoutes.post('/', jwtValidateMiddleware, createCategoriesController);
categoriesRoutes.get('/', jwtValidateMiddleware, getAllCategoriesController);

module.exports = categoriesRoutes;