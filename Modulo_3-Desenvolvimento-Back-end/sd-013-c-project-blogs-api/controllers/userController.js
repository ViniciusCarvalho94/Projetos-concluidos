const { createUserService, findUserByIdService } = require('../services');
const { User } = require('../models');

const createUserController = async (req, res, next) => {
  try {
    const newUser = req.body;
    const token = await createUserService(newUser);

    return res.status('201').json({ token });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const getAllUsersController = async (_req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUserByIdService(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUserByIdController,
};