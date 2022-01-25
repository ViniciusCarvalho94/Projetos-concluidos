const productIdOrQuantityError = { 
  status: 422, 
  code: 'invalid_data', 
  message: 'Wrong product ID or invalid quantity',
};

const quantityMinorZeroError = {
  status: 404,
  code: 'stock_problem',
  message: 'Such amount is not permitted to sell',
};

const saleNotFoundError = {
  status: 404,
  code: 'not_found',
  message: 'Sale not found',
};

const nameMinorFiveError = {
  status: 422, 
  code: 'invalid_data', 
  message: '"name" length must be at least 5 characters long',
};

const productExistsError = { 
  status: 422, 
  code: 'invalid_data', 
  message: 'Product already exists',
};

 const schemaError = (error) => { 
  const objError = { 
    status: 422, 
    code: 'invalid_data', 
    message: error.message,
  };

  return objError;
};

module.exports = {
  productIdOrQuantityError,
  quantityMinorZeroError,
  saleNotFoundError,
  nameMinorFiveError,
  productExistsError,
  schemaError,
};