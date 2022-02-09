const { createBlogPostService } = require('../services');
const { BlogPost, User, Categorie } = require('../models');

const createBlogPostController = async (req, res, next) => {
  try {
    const newBlogPost = req.body;
    const { data: userEmail } = req.user;
    const response = await createBlogPostService(newBlogPost, userEmail);
    
    return res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

const getAllBlogPostController = async (_req, res, next) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, as: 'user' }, { model: Categorie, as: 'categories' }],
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  createBlogPostController,
  getAllBlogPostController,
};
