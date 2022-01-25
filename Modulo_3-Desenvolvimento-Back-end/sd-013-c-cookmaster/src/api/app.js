const express = require('express');
const path = require('path');

const { loginController, recipeController } = require('../controllers');
const { errorMiddleware, jwtValidateMiddleware } = require('../middlewares');
const uploadPhoto = require('../config/uploadPhoto');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', loginController.registerUserController);

app.post('/login', loginController.loginUserController);

app.post('/recipes', jwtValidateMiddleware, recipeController.createRecipeController);

app.get('/recipes', recipeController.getAllRecipesController);

app.get('/recipes/:id', recipeController.findRecipeByIdController);
app.put('/recipes/:id', jwtValidateMiddleware, recipeController.editRecipeByIdController);
app.delete('/recipes/:id', jwtValidateMiddleware, recipeController.deleteRecipeByIdController);

app.put(
  '/recipes/:id/image/', 
  jwtValidateMiddleware, 
  uploadPhoto, 
  recipeController.uploadPhotoRecipeControler,
);

app.use(errorMiddleware);

module.exports = app;
