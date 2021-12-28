// modules
const express = require('express');
const bodyParser = require('body-parser');

// functions
const readTalker = require('./functions/readTalkerJson');
const generateToken = require('./functions/generateToken');
const createTalkerJson = require('./functions/createTalkerJson');
const filterTalkerById = require('./functions/filterTalkerById');
const editTalkerJson = require('./functions/editTalkerJson');
const deleteTalkerJson = require('./functions/deleteTalkerJson');

// middlewares
const validatePassword = require('./middlewares/validatePassword');
const validateEmail = require('./middlewares/validateEmail');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateToken = require('./middlewares/validateToken');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt.js');
const validateRate = require('./middlewares/validateRate.js');

// configs
const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// req 1
app.get('/talker', (_req, res) => {
  const data = readTalker();
  return res.status(HTTP_OK_STATUS).json(data);
});

// req 2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const filter = filterTalkerById(id);

  if (!filter || filter.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(filter);
});
// req 3
app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token: `${token}` });
});

// req 4
app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  (req, res) => {
    const { body } = req;
    const newBody = createTalkerJson(body);
    return res.status(201).json(newBody);
  },
);

// req 5
app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const newBody = editTalkerJson(body, id);
    return res.status(HTTP_OK_STATUS).json(newBody);
  },
);

// req 6
app.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  deleteTalkerJson(id);
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
