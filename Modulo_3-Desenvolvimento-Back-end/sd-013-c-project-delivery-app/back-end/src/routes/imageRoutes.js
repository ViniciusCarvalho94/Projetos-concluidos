const express = require('express');

const imageController = require('../controllers/imageController');

const imageRoutes = express.Router();

imageRoutes.get('/:name', imageController);

module.exports = imageRoutes;
