const { user, sale, product } = require('../database/models');

async function findOrders(id) {
  const arrayOfOrders = await sale.findAll({ where: { sellerId: id } });
  return arrayOfOrders;
}

async function findSellerId(email) {
  const { dataValues: { id } } = await user.findOne({ where: { email } });
  const arrayOfOrders = await findOrders(id);
  return arrayOfOrders;
}

const findSellerOrders = async (email) => {
  const arrayOfOrders = await findSellerId(email);

  return arrayOfOrders;
};

const findOrderByIdService = async (id) => {
  const { dataValues } = await sale.findOne({ 
    where: { id },
    include: { model: product, as: 'product', through: { attributes: ['quantity'] } },
  });
  return dataValues;
};

const findUserByRole = async () => {
  const dataValues = await user.findAll({ where: { role: 'seller' } });

  return dataValues;
};

module.exports = { 
  findUserByRole,
  findSellerOrders,
  findOrderByIdService,
 };