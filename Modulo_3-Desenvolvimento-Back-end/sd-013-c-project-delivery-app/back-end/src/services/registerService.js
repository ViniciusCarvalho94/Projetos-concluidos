const md5 = require('md5');
const { user } = require('../database/models');
const registerSchema = require('../schemas/registerSchema');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, conflict } = require('../utils/statusCode');
const { createToken } = require('../auth/authService');

function validateSchema(name, email, password) {
  const { error } = registerSchema.validate({ name, email, password });
  if (error) throw errorConstructor(badRequest, { message: error.message });
}

async function validateUserExist(email) {
  const userExists = await user.findOne({ where: { email } });
  if (userExists) throw errorConstructor(conflict, { message: 'User already registered' });
}

module.exports = async (name, email, password, role = 'customer') => {
  validateSchema(name, email, password);
  await validateUserExist(email);

  const hash = md5(password);
  
  const userCreated = await user.create({ name, email, password: hash, role });
  
  const { password: _password, ...userWithoutPassword } = userCreated.dataValues;
  
  const token = createToken(userWithoutPassword);
  
  return token;
};
