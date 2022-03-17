const loginService = require('../services/loginService');
const { success } = require('../utils/statusCode');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    return res.status(success).json({ user });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
