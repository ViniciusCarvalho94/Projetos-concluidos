const fs = require('fs');
const path = require('path');

const readTalkerJson = require('./readTalkerJson');

const json = path.join(__dirname, '..', '/talker.json');

function deleteTalkerJson(id) {
  const data = readTalkerJson();
  const filter = data.filter((jsonFile) => jsonFile.id !== parseInt(id, 10));
  fs.writeFileSync(json, JSON.stringify(filter));
}

module.exports = deleteTalkerJson;