const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const jwtConfig = require('../config/jwtConfig');

module.exports = (data) => jwt.sign({ data }, secret, jwtConfig);