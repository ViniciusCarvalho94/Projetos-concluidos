const { User } = require('../models');
const objError = require('../functions/objError');

module.exports = async (id) => {
  const user = await User.findOne({ 
    where: { id }, 
    attributes: { exclude: ['password'] },
  });
  if (!user) throw objError(404, 'User does not exist');

  return user;
};