const { product, sale } = require('../database/models');

const findAllProducts = async () => {
  const products = await product.findAll({});

  return products;
};

const findAllOrders = async (id) => {
  const UserOrders = await sale.findAll({ where: { userId: id } });

  return UserOrders;
};

module.exports = { 
  findAllProducts,
  findAllOrders,
};