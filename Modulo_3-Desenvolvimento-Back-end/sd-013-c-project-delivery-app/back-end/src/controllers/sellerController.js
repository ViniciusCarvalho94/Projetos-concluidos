const { 
  findUserByRole, 
  findSellerOrders, 
  findOrderByIdService,
} = require('../services/sellerService');
const { success } = require('../utils/statusCode');

const findOrdersBySeller = async (req, res, next) => {
  try {
    const { email } = req.body;

    const orders = await findSellerOrders(email);

    return res.status(success).json(orders);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const findOrderByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await findOrderByIdService(id);
    return res.status(success).json(order);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const findAllSellers = async (req, res, next) => {
  try {
    const sellers = await findUserByRole();

    return res.status(success).json(sellers);
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  findAllSellers,
  findOrdersBySeller,
  findOrderByIdController,
};
