module.exports = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const regexWatchedAt = /\d{2}[/]\d{2}[/]\d{4}/;
  const validateWatchedAt = regexWatchedAt.test(watchedAt);
  
  if (!watchedAt || watchedAt === '') {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  if (!validateWatchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};