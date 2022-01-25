require('dotenv').config();

const SECRET = process.env.SECRET || 'issoNaoEhUmaSenhaSecreta';

module.exports = SECRET;