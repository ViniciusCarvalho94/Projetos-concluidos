const { findAllProducts, findAllOrders } = require('../services/customerService');
const { verifyToken } = require('../auth/authService');

const findProductsForCustomer = async (req, res, next) => {
  try {
    const products = await findAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const findOrdersOfCustomer = async (req, res, next) => {
  try {
    const { token } = req.body;

    const { data: { id } } = await verifyToken(token);

    const UserOrders = await findAllOrders(id);

    return res.status(200).json(UserOrders);
  } catch (error) {
    return next(error);
  }
};

module.exports = { 
  findProductsForCustomer,
  findOrdersOfCustomer,
};