const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createProductModel = async (name, quantity) => {
  const connect = await connection();
  const { insertedId: id } = await connect.collection('products').insertOne({ name, quantity });

  return id;
};

const findProductByNameModel = async (name) => {
  const connect = await connection();
  const product = await connect.collection('products').findOne({ name });
  return product;
};

const findAllProductsModel = async () => {
  const connect = await connection();
  const productsList = await connect.collection('products').find({}).toArray();

  return productsList;
};

const findProductByIdModel = async (id) => {
  const connect = await connection();
  const product = await connect.collection('products').findOne({ _id: ObjectId(id) });

  return product;
};

const updateProductByIdModel = async (newProduct) => {
  const { _id, name, quantity } = newProduct;
  const connect = await connection();
  await connect.collection('products')
    .updateOne({ _id: ObjectId(_id) }, { $set: { name, quantity } });

  const response = await connect.collection('products').findOne({ _id: ObjectId(_id) });

  return response;
};

const deleteProductByIdService = async (id) => {
  const connect = await connection();
  await connect.collection('products')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createProductModel,
  findProductByNameModel,
  findAllProductsModel,
  findProductByIdModel,
  updateProductByIdModel,
  deleteProductByIdService,
};