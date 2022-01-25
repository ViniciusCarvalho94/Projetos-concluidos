const { ObjectId } = require('mongodb');

const { createRecipeSchema } = require('../schemas');
const objError = require('../errors');
const { recipeModel } = require('../models');

const STATUS_404 = 404;
const DESC_404 = 'recipe not found';

const createRecipeService = async (name, ingredients, preparation, userId) => {
  const { error } = createRecipeSchema.validate({ name, ingredients, preparation });
  if (error) throw objError(400, error.message);
 
  const recipeId = await recipeModel.createRecipeModel(name, ingredients, preparation, userId);
 
  return {
    recipe: { name, ingredients, preparation, userId, _id: recipeId },
  };
 };

const getAllRecipesService = async () => {
  const recipes = await recipeModel.getAllRecipesModel();
  
  return recipes;
};

const findRecipeByIdService = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) throw objError(STATUS_404, DESC_404);
  
  const recipe = await recipeModel.findRecipeByIdModel(recipeId);
  if (!recipe) throw objError(STATUS_404, DESC_404);
  
  return recipe;
};

const editRecipeByIdService = async (id, editedRecipe) => {
  if (!ObjectId.isValid(id)) throw objError(STATUS_404, DESC_404);
  
  const { userId } = await recipeModel.findRecipeByIdModel(id);
  
  await recipeModel.editRecipeByIdModel(id, editedRecipe);

  return { _id: id, ...editedRecipe, userId };
};

const deleteRecipeByIdService = async (id) => {
  if (!ObjectId.isValid(id)) throw objError(STATUS_404, DESC_404);

  await recipeModel.deleteRecipeByIdModel(id);
};

const uploadPhotoRecipeService = async (id, filename) => {
  if (!ObjectId.isValid(id)) throw objError(STATUS_404, DESC_404);
  
  const recipe = await recipeModel.findRecipeByIdModel(id);
  await recipeModel.editRecipeByIdModel(id, filename);
  
  return {
    ...recipe,
    image: `localhost:3000/src/uploads/${filename}`,
  };
};

module.exports = {
  createRecipeService,
  getAllRecipesService,
  findRecipeByIdService,
  editRecipeByIdService,
  deleteRecipeByIdService,
  uploadPhotoRecipeService,
};