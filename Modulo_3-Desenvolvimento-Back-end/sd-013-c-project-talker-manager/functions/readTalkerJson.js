const fs = require('fs');
const path = require('path');

const json = path.join(__dirname, '..', '/talker.json');

function readTalker() {
  return JSON.parse(fs.readFileSync(json, 'utf8'));
}

module.exports = readTalker;