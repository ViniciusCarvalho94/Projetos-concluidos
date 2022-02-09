const genJWT = require('../auth/genJWT');
const objError = require('../functions/objError');
const registerUserSchema = require('../schemas/userSchema');
const { User } = require('../models');

function validateSchema(displayName, email, password) {
  const { error } = registerUserSchema.validate({ displayName, email, password });
  if (error) throw objError(400, error.message);
}

async function checkUserAlreadyRegistered(email) {
  const user = await User.findOne({ where: { email } });
  if (user) throw objError(409, 'User already registered');
}

module.exports = async ({ displayName, email, password, image }) => {
  validateSchema(displayName, email, password);
  await checkUserAlreadyRegistered(email);

  await User.create({ displayName, email, password, image });

  const data = { email };
  const token = genJWT(data);

  return token;
};
