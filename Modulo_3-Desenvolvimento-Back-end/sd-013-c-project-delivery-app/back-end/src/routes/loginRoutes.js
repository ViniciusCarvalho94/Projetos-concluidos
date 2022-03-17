const loginRoutes = require('express').Router();

const loginController = require('../controllers/loginController');

loginRoutes.post('/', loginController);

module.exports = loginRoutes;
