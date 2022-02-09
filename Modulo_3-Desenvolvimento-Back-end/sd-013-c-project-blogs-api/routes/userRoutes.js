const express = require('express');
const jwtValidateMiddleware = require('../middlewares/jwtValidateMiddleware');

const userRoutes = express.Router();
const { 
  createUserController, 
  getAllUsersController, 
  getUserByIdController,
} = require('../controllers/userController');

userRoutes.post('/', createUserController);
userRoutes.get('/', jwtValidateMiddleware, getAllUsersController);
userRoutes.get('/:id', jwtValidateMiddleware, getUserByIdController);

module.exports = userRoutes;