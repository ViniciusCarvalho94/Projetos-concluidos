const Sequelize = require('sequelize');
const { sale, user, saleProduct } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const findUserByEmail = async (email) => {
  try {
    const { dataValues: { id } } = await user.findOne({ where: { email } });
  
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const findSellerById = async (sellerId) => {
//   const { dataValues: { name } } = await user.findOne({ where: { id: sellerId } });

//   return name;
// };

const createSale = async (saleCheckout, globalCart) => {
  const t = await sequelize.transaction();
  const { email, sellerId, totalPrice, deliveryAddress, deliveryNumber } = saleCheckout;
  try {
    const userId = await findUserByEmail(email);
    const { dataValues } = await sale
      .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
        { transaction: t });
    const newArrayOfProducts = await globalCart.map((item) => ({ saleId: dataValues.id,
      ...item }));
    const saleProductValues = await saleProduct
      .bulkCreate([...newArrayOfProducts], { transaction: t });
    await t.commit();
    return { dataValues, saleProductValues };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = { createSale };