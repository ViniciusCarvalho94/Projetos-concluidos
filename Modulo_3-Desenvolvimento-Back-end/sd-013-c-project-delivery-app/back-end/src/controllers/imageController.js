const imageService = require('../services/imageService');

module.exports = async (req, res, next) => {
  try {
    const { name } = req.params;

    const image = await imageService(name);
    
    return res.sendFile(image);
  } catch (error) {
    return next(error);
  }
};
