const createCategorieService = require('../services/createCategorieService');
const { Categorie } = require('../models');

const createCategoriesController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const categorie = await createCategorieService(name);

    return res.status(201).json(categorie);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const getAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await Categorie.findAll();
    
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  createCategoriesController,
  getAllCategoriesController,
};
