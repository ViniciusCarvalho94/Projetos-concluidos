module.exports = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\S+[@]\S+[.]\S+$/;
  const validateEmail = regexEmail.test(email);

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validateEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};