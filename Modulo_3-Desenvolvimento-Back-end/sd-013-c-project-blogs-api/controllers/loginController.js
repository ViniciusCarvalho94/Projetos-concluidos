const { loginUserService } = require('../services');

const loginController = async (req, res, next) => {
  try {
    const loginUser = req.body;
    const token = await loginUserService(loginUser);

    return res.status('200').json({ token });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  loginController,
};