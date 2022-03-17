const registerRoutes = require('express').Router();

const registerUserController = require('../controllers/registerController');

registerRoutes.post('/', registerUserController);

module.exports = registerRoutes;
