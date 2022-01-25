const jwt = require('jsonwebtoken');
const { loginModel } = require('../models');
const secret = require('../config/jwtSecret');
const objError = require('../errors');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization) throw objError(401, 'missing auth token');
    
    const decoded = jwt.verify(authorization, secret);
    const user = await loginModel.findEmailModel(decoded.data.email);

    if (!user) throw objError(401, 'jwt malformed');

    const { password: _password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};