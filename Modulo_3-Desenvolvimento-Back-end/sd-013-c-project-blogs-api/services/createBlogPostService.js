const postSchema = require('../schemas/postSchema');
const { Categorie, User, BlogPost } = require('../models');
const objError = require('../functions/objError');

function validateSchema(title, categoryIds, content) {
  const { error } = postSchema.validate({ title, categoryIds, content });
  if (error) throw objError(400, error.message);
}

async function validateCategories(categoryIds) {
  const categoryExist = await Categorie.findAll({ where: { id: categoryIds } });
  if (categoryExist.length !== categoryIds.length) throw objError(400, '"categoryIds" not found');
}

module.exports = async ({ title, categoryIds, content }, userEmail) => {
  validateSchema(title, categoryIds, content);
  await validateCategories(categoryIds);

  const { dataValues: { id: userId } } = await User.findOne({ where: { email: userEmail } });
  const newPost = { userId, categoryIds, title, content };
  const { dataValues: { id } } = await BlogPost.create({ ...newPost });
  return { id, userId, title, content };
};
