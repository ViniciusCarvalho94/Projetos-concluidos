module.exports = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (rate <= 0 || rate >= 6) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  if (!rate || rate === '') {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};