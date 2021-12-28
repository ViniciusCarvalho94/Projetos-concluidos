const fs = require('fs');
const path = require('path');

const readTalkerJson = require('./readTalkerJson');

const json = path.join(__dirname, '..', '/talker.json');

const newId = (data) => data.length + 1;

function createTalkerJson(body) {
  const data = readTalkerJson();
  const idNumber = newId(data);
  const newBody = { id: idNumber, ...body };
  data.push(newBody);
  fs.writeFileSync(json, JSON.stringify(data));
  return newBody;
}

module.exports = createTalkerJson;