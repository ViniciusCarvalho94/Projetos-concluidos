const express = require('express');
const cors = require('cors');

const handleError = require('../middlewares/handleError');

const loginRoutes = require('../routes/loginRoutes');  
const registerRoutes = require('../routes/registerRoutes');
const customerRoutes = require('../routes/customerRoutes');
const imageRoutes = require('../routes/imageRoutes');
const sellerRoutes = require('../routes/sellerRoutes');
const saleRoutes = require('../routes/registerSale');
const auth = require('../middlewares/validateJWT');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/customer', customerRoutes);
app.use('/images', imageRoutes);
app.use('/seller', sellerRoutes);
app.use('/sale', auth, saleRoutes);

app.use(handleError);

module.exports = app;
