const connection = require('./connection');

const registerUserModel = async (name, email, password, role) => {
  const connect = await connection();
  const { insertedId } = await connect.collection('users')
    .insertOne({ name, email, password, role });
  
  return insertedId;
};

const findEmailModel = async (email) => {
  const connect = await connection();
  const response = await connect.collection('users').findOne({ email });
  
  return response;
};

module.exports = {
  registerUserModel,
  findEmailModel,
};