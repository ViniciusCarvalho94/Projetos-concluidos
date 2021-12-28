const readTalker = require('./readTalkerJson');

function filterTalkerById(id) {
  const data = readTalker();
  const filter = data.find((talker) => talker.id === parseInt(id, 10));
  return filter;
}

module.exports = filterTalkerById;
