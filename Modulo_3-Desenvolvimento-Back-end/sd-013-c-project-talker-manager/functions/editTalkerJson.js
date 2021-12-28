const fs = require('fs');
const path = require('path');

const readTalkerJson = require('./readTalkerJson');

const json = path.join(__dirname, '..', '/talker.json');

function editTalkerJson(body, idString) {
  const data = readTalkerJson();
  const idNumber = parseInt(idString, 10);
  const index = data.findIndex((talker) => talker.id === idNumber);
  data[index] = { id: idNumber, ...body };
  const newBody = { id: idNumber, ...body };

  fs.writeFileSync(json, JSON.stringify(data));
  return newBody;
}

module.exports = editTalkerJson;