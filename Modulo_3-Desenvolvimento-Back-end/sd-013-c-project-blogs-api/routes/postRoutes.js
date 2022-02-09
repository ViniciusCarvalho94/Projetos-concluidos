const express = require('express');
const jwtValidateMiddleware = require('../middlewares/jwtValidateMiddleware');

const postRoutes = express.Router();
const { 
  createBlogPostController, 
  getAllBlogPostController,
} = require('../controllers/postController');

postRoutes.post('/', jwtValidateMiddleware, createBlogPostController);
postRoutes.get('/', jwtValidateMiddleware, getAllBlogPostController);

module.exports = postRoutes;