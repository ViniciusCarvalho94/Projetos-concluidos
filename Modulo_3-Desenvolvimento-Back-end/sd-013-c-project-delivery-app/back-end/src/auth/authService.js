const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = fs.readFileSync(
  path.join(__dirname, '..', '..', 'jwt.evaluation.key'), 
  { encoding: 'utf-8' },
).trim();

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, JWT_SECRET, JWT_CONFIG);

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    return decoded;
  } catch (error) {
    console.log('Falha na verificação', error.message);
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
}; 
