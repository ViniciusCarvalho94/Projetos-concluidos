const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const connect = await connection();
  const { insertedId } = await connect.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  
  return insertedId;
};

const getAllRecipesModel = async () => {
  const connect = await connection();
  const recipes = await connect.collection('recipes')
    .find().toArray();

  return recipes;
};

const findRecipeByIdModel = async (recipeId) => {
  const connect = await connection();
  const recipe = await connect.collection('recipes')
    .findOne({ _id: ObjectId(recipeId) });
  
  return recipe;
};

const editRecipeByIdModel = async (id, editedRecipe) => {
  const connect = await connection();
  await connect.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...editedRecipe } });
};

const deleteRecipeByIdModel = async (id) => {
  const connect = await connection();
  await connect.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipeModel,
  getAllRecipesModel,
  findRecipeByIdModel,
  editRecipeByIdModel,
  deleteRecipeByIdModel,
};