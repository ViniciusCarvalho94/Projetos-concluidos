const genJWT = require('../auth/genJWT');
const objError = require('../functions/objError');
const loginSchema = require('../schemas/loginSchema');
const { User } = require('../models');

function validateSchema(email, password) {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw objError(400, error.message);
}

async function validateUser(email, password) {
  const user = await User.findOne({ where: { email, password } });
  if (!user) throw objError(400, 'Invalid fields');
}

module.exports = async ({ email, password }) => {
  validateSchema(email, password);
  await validateUser(email, password);

  const token = genJWT(email);

  return token;
};