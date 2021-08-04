const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) { return []; }
  if (ids.length >= 1) {
    return ids.map((id) => species.find((animal) => animal.id === id));
  }
}

function getAnimalsOlderThan(animal, age) {
  return species.find((animalName) => animal === animalName.name).residents
    .every((animalAge) => animalAge.age >= age);
}

function getEmployeeByName(findName) {
  if (findName === undefined) {
    return {};
  }
  return employees.find((name) => findName === name.firstName || findName === name.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((idM) => idM.managers.find((idT) => idT === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(specie) {
  if (specie === undefined) {
    const animals = species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
    return animals;
  }
  return species.find((animal) => animal.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const adultPrice = prices.Adult;
  const childPrice = prices.Child;
  const seniorPrice = prices.Senior;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const total = (adultPrice * Adult) + (childPrice * Child) + (seniorPrice * Senior);
  return total;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const days = Object.entries(hours).reduce((acc, curr) => {
    if (curr[1].open === 0 && curr[1].close === 0) {
      acc[curr[0]] = 'CLOSED';
      return acc;
    }
    acc[curr[0]] = `Open from ${curr[1].open}am until ${curr[1].close - 12}pm`;
    return acc;
  }, {});
  if (!dayName) {
    return days;
  }
  const result = {};
  const objectOfParameter = Object.entries(days)
    .filter((elemento) => elemento[0] === dayName)[0];
  const [key, value] = objectOfParameter;
  result[key] = value;
  return result;
}

function getOldestFromFirstSpecies(id) {
  const idAnimal = employees.find((idP) => idP.id === id).responsibleFor[0];
  const animals = species.find((idA) => idA.id === idAnimal).residents;
  const findOld = animals.reduce((acc, curr) => ((acc.age > curr.age) ? acc : curr));
  return [findOld.name, findOld.sex, findOld.age];
}

function increasePrices(percentage) {
  const price = prices;
  const key = Object.keys(price);
  key.forEach((keys) => {
    const newPrice = price[keys] + (price[keys] * (percentage / 100));
    price[keys] = Math.round(newPrice * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    const fullList = employees.reduce((acc, curr) => {
      acc[`${curr.firstName} ${curr.lastName}`] = curr.responsibleFor
        .map((idA) => species.find((idR) => idA === idR.id).name);
      return acc;
    }, {});
    return fullList;
  }
  const person = {};
  employees.map((arr) => {
    if (arr.id === idOrName || arr.firstName === idOrName || arr.lastName === idOrName) {
      person[`${arr.firstName} ${arr.lastName}`] = arr.responsibleFor
        .map(((idA) => species.find((idR) => idA === idR.id).name));
    }
    return person;
  });
  return person;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
