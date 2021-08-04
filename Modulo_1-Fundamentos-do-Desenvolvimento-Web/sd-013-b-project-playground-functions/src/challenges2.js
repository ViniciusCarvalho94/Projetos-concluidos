// Desafio 10
function techList(array, name) {
  let alfabetico = array.sort();
  let objetos = [];
  if (alfabetico.length === 0) {
    return 'Vazio!';
  }
  for (let i in alfabetico) {
    objetos.push({
      tech: alfabetico[i],
      name: name,
    });
  }
  return objetos;
}

// Desafio 11
function generatePhoneNumber() {
  // seu código aqui
}

// Desafio 12
function triangleCheck() {
  // seu código aqui
}

// Desafio 13
function hydrate(string) {
  const numbers = /\d+/g;
  const result = string.match(numbers);
  const sum = result.reduce((acc, curr) => acc + parseInt(curr), 0);
  return `${sum} copos de água`
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
