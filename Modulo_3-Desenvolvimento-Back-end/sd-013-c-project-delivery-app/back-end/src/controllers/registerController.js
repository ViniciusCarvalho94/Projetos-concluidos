const registerService = require('../services/registerService');
const { created } = require('../utils/statusCode');

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const token = await registerService(name, email, password);
    
    return res.status(created).json({ token });
  } catch (err) {
    next(err);
  }
 };
