const { recipeService } = require('../services');

const createRecipeController = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const userId = _id;    
    const response = await recipeService.createRecipeService(
      name, ingredients, preparation, userId,
    );

    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
};

const getAllRecipesController = async (_req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipesService();

    return res.status(200).json(recipes);
  } catch (error) {
    return next(error);
  }
};

const findRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeId = id;
    const recipe = await recipeService.findRecipeByIdService(recipeId);
    
    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
};

const editRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editedRecipe = req.body;

    const response = await recipeService.editRecipeByIdService(id, editedRecipe);

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await recipeService.deleteRecipeByIdService(id);

    return res.status(204).json(response);
  } catch (error) {
    return next(error);
  }
};

const uploadPhotoRecipeControler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    
    const recipe = await recipeService.uploadPhotoRecipeService(id, filename);
    
    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  createRecipeController,
  getAllRecipesController,
  findRecipeByIdController,
  editRecipeByIdController,
  deleteRecipeByIdController,
  uploadPhotoRecipeControler,
};