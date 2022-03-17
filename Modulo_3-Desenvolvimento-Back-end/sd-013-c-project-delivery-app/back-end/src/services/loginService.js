const md5 = require('md5');
const { user } = require('../database/models');
const loginSchema = require('../schemas/loginSchema');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest, notFound, conflict } = require('../utils/statusCode');
const { createToken } = require('../auth/authService');

function validateSchema(email, password) {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw errorConstructor(badRequest, error.message);
}

async function validatePassword(dataValues, password) {
  const { password: findPassword } = dataValues;
  
  const hashPassword = await md5(password);
  if (findPassword !== hashPassword) throw errorConstructor(conflict, 'Incorrect password');
}

async function validateLogin(email, password) {
  const findUser = await user.findOne({ where: { email } });

  if (!findUser) throw errorConstructor(notFound, 'Not found!');

  const { dataValues } = findUser;
  await validatePassword(dataValues, password);
  
  return dataValues;
}

module.exports = async (email, password) => {
  validateSchema(email, password);

  const findUser = await validateLogin(email, password);

  const { password: _password, ...userWithoutPassword } = findUser;

  const token = await createToken(userWithoutPassword);

  const { name, role } = userWithoutPassword;

  return { name, email, role, token };
};
