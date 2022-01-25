const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createSalesModel = async (body) => {
  const connect = await connection();
  const response = await connect.collection('sales')
    .insertOne({ itensSold: body });

  return response;
};

const findAllSalesModel = async () => {
  const connect = await connection();
  const response = await connect.collection('sales').find({}).toArray();

  const salesObj = {
    sales: response,
  };

  return salesObj;
};

const findSalesByIdModel = async (id) => {
  const connect = await connection();
  const response = await connect.collection('sales').findOne({ _id: ObjectId(id) });

  return response;
};

const updateSalesByIdModel = async (id, newSales) => {
  const connect = await connection();
  await connect.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: newSales.itensSold } });
};

const deleteSalesByIdModel = async (id) => {
  const connect = await connection();
  await connect.collection('sales')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createSalesModel,
  findAllSalesModel,
  findSalesByIdModel,
  updateSalesByIdModel,
  deleteSalesByIdModel,
};