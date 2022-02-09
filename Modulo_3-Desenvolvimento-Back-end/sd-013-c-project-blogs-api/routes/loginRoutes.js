const express = require('express');

const loginRoutes = express.Router();
const { loginController } = require('../controllers/loginController');

loginRoutes.post('/', loginController);

module.exports = loginRoutes;