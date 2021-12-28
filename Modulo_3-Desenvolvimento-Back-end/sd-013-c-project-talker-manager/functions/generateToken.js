const crypto = require('crypto');

// Dica do Rafael Romano da turma
function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

module.exports = generateToken;