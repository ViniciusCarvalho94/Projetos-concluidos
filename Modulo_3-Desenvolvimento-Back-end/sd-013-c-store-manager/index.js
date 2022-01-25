const express = require('express');

const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const error = require('./middlewares/errorMiddleware');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.findAllProductsController);
app.post('/products', productController.createProductController);

app.get('/products/:id', productController.findProductByIdController);
app.put('/products/:id', productController.updateProductByIdController);
app.delete('/products/:id', productController.deleteProductByIdController);

app.get('/sales', salesController.findAllSalesController);
app.post('/sales', salesController.createSalesController);

app.get('/sales/:id', salesController.findSalesByIdController);
app.put('/sales/:id', salesController.updateSalesByIdController);
app.delete('/sales/:id', salesController.deleteSalesByIdController);

app.use(error);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
