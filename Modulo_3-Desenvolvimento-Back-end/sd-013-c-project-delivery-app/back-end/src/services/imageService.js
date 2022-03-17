const path = require('path');

module.exports = async (name) => {
  const directory = path.resolve(__dirname, '..', '..', 'public');
 
  return `${directory}/${name}`;
};
