const { createSale } = require('../services/sale');
const { created } = require('../utils/statusCode');

const registerSaleController = async (req, res, next) => {
  try {
    const { saleCheckout, globalCart } = req.body;

    const createdSale = await createSale(saleCheckout, globalCart);
    return res.status(created).json(createdSale);
  } catch (err) {
    return next(err);
  }
 };

 module.exports = { registerSaleController };