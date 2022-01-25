const { loginService } = require('../services');

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const response = await loginService.registerUserService(name, email, password);

    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginService.loginUserService(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};