const errorMiddleware = require('./errorMiddleware');
const jwtValidateMiddleware = require('./jwtValidateMiddleware');

module.exports = {
  errorMiddleware,
  jwtValidateMiddleware,
};