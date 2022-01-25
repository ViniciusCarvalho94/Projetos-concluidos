const { loginSchema, registerUserSchema } = require('../schemas');
const objError = require('../errors');
const { loginModel } = require('../models');
const genJwt = require('../auth/genJWT');

const loginUserService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw objError(401, error.message);

  const userFound = await loginModel.findEmailModel(email);
  if (!userFound || userFound.password !== password) {
    throw objError(401, 'Incorrect username or password');
  }
  
  const { password: _password, ...userWithoutPassword } = userFound;

  const token = await genJwt(userWithoutPassword);

  return token;
};

const registerUserService = async (name, email, password) => {
  const { error } = registerUserSchema.validate({ name, email, password });
  if (error) throw objError(400, error.message);

  const haveEmailDb = await loginModel.findEmailModel(email);
  if (haveEmailDb) throw objError(409, 'Email already registered');

  const role = 'user';

  const id = await loginModel.registerUserModel(name, email, password, role);

  return {
    user: { name, email, role, _id: id },
  };
};

module.exports = {
  loginUserService,
  registerUserService,
};