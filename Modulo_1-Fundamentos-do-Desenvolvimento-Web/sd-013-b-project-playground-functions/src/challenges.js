// Desafio 1
function compareTrue(param1, param2) {
  if (param1 === true && param2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  let area = (base * height) / 2;
  return area;
}

// Desafio 3
function splitSentence(string) {
  let frase = string.split(' ');
  return frase;
}

// Desafio 4
function concatName(array) {
  let primeiroItem = array[0];
  let ultimoItem = array[array.length - 1];
  return `${ultimoItem}, ${primeiroItem}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  let pontos = wins * 3 + ties;
  return pontos;
}

// Desafio 6
function highestCount(array) {
  array = array.sort((a, b) => a - b);
  let ultimoNumero = array[array.length - 1];
  return array.filter(function (valor) {
    return valor === ultimoNumero;
  }).length;
}

// Desafio 7
function catMaiorMouse(mouse, cat1, cat2) {
  if (cat1 > cat2) {
    return 'cat2';
  }
  if (mouse - cat1 === cat2 - mouse) {
    return 'os gatos trombam e o rato foge';
  }
  return 'cat1';
}
function carMenorMouse(mouse, cat1, cat2) {
  if (cat2 > cat1) {
    return 'cat1';
  }
  if (cat1 - mouse === cat2 - mouse) {
    return 'os gatos trombam e o rato foge';
  }
  return 'cat2';
}
function catAndMouse(mouse, cat1, cat2) {
  if (mouse > cat1 || mouse > cat2) {
    return catMaiorMouse(mouse, cat1, cat2);
  }
  if (mouse < cat1 || mouse < cat2) {
    return carMenorMouse(mouse, cat1, cat2);
  }
}

// Desafio 8
function fizzBuzz(array) {
  let final = [];
  for (let i in array) {
    let numero = array[i];
    if (numero % 3 === 0 && numero % 5 !== 0) {
      final.push('fizz');
    }
    if (numero % 5 === 0 && numero % 3 !== 0) {
      final.push('buzz');
    }
    if (numero % 3 === 0 && numero % 5 === 0) {
      final.push('fizzBuzz');
    }
    if (numero % 3 !== 0 && numero % 5 !== 0) {
      final.push('bug!');
    }
  }
  return final;
}

// Desafio 9
function encode(string) {
  let codigo = string.split('');
  for (let i in codigo) {
    if (codigo[i] === 'a') {
      codigo[i] = '1';
    }
    if (codigo[i] === 'e') {
      codigo[i] = '2';
    }
    if (codigo[i] === 'i') {
      codigo[i] = '3';
    }
    if (codigo[i] === 'o') {
      codigo[i] = '4';
    }
    if (codigo[i] === 'u') {
      codigo[i] = '5';
    }
  }
  let arrayString = codigo.join('');
  return arrayString;
}
function decode(string) {
  let codigo = string.split('');
  for (let i in codigo) {
    if (codigo[i] === '1') {
      codigo[i] = 'a';
    }
    if (codigo[i] === '2') {
      codigo[i] = 'e';
    }
    if (codigo[i] === '3') {
      codigo[i] = 'i';
    }
    if (codigo[i] === '4') {
      codigo[i] = 'o';
    }
    if (codigo[i] === '5') {
      codigo[i] = 'u';
    }
  }
  let arrayString = codigo.join('');
  return arrayString;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
