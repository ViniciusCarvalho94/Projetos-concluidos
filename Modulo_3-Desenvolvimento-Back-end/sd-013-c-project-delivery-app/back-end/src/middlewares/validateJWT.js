const { verifyToken } = require('../auth/authService');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const data = await verifyToken(authorization);

    if (!data) return res.status(401).json({ message: 'Expired or invalid token' });

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
