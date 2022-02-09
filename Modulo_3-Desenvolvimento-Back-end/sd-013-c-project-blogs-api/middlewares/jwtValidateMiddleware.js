const jwt = require('jsonwebtoken');
const SECRET = require('../auth/SECRET');
const objError = require('../functions/objError');

function validateAuthorization(authorization) {
  if (!authorization) throw objError(401, 'Token not found');
}

const validateToken = (authorization) => {
  try {
    const decoded = jwt.verify(authorization, SECRET);
    return decoded;
  } catch (error) {
    console.log(error.message);
    throw objError(401, 'Expired or invalid token');
  }
};

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    validateAuthorization(authorization);
    const user = validateToken(authorization);
    
    req.user = user;
    
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: error.message });
  }
};
