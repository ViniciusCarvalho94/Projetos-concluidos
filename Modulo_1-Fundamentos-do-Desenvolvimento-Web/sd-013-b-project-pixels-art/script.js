const color = document.querySelector('#color-palette');
const buttonInput = document.querySelector('#generate-board');
const colors = document.querySelectorAll('.color');
const buttonChangeColors = document.querySelector('#change-colors');
const board = '#board-size';
let numberOfColors = 7;

function newColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgb(${r}, ${g}, ${b})`;
}

colors[0].style.backgroundColor = 'black';
colors[1].style.backgroundColor = 'white';

for (let i = 2; i < numberOfColors; i += 1) {
  let newColors = document.createElement('div');
  newColors.classList.add('color');
  color.appendChild(newColors);
}

window.onload = function palette() {
  const colors = document.querySelectorAll('.color');
  for (let i = 2; i < numberOfColors; i += 1) {
    colors[i].style.backgroundColor = newColor();
  }
};

buttonChangeColors.addEventListener('click', () => {
  const colors = document.querySelectorAll('.color');
  for (let i = 2; i < numberOfColors; i += 1) {
    colors[i].style.backgroundColor = newColor();
  }
});

color.addEventListener('click', (event) => {
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');
  event.target.classList.add('selected');
});

let corSelected = 'rgb(0, 0, 0)';
color.addEventListener('click', () => {
  const selected = document.querySelector('.selected');
  corSelected = getComputedStyle(selected).backgroundColor;
  return corSelected;
});

const pixelBoard = document.querySelector('#pixel-board');
pixelBoard.addEventListener('click', (e) => {
  e.target.style.backgroundColor = corSelected;
});

const clearButton = document.querySelector('#clear-board');
clearButton.addEventListener('click', () => {
  const pixel = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
});

function removeTable() {
  const line = document.querySelectorAll('.line');
  const input = document.querySelector(board);
  if (input.value > 5 || input.value < 50) {
    for (let i = 0; i < line.length; i += 1) {
      line[i].remove();
    }
  }
}

function limitInput() {
  const input = document.querySelector(board);
  if (input.value < 5) {
    input.value = 5;
  }
  if (input.value > 50) {
    input.value = 50;
  }
}

function inputValue() {
  const input = document.querySelector(board);
  if (input.value < 5 || input.value > 50) {
    return alert('Board inválido!');
  }
}

function createPixels(newLine) {
  const input = document.querySelector(board);
  for (let pixels = 0; pixels < input.value; pixels += 1) {
    const newPixel = newLine.insertCell(pixels);
    newPixel.classList.add('pixel');
  }
}

buttonInput.addEventListener('click', () => {
  inputValue();
  limitInput();
  removeTable();
  const input = document.querySelector(board);
  const line = document.querySelectorAll('.line');
  const table = document.querySelector('.table');
  if (line.length < input.value) {
    for (let lines = 0; lines < input.value; lines += 1) {
      const newLine = table.insertRow(lines);
      newLine.classList.add('line');
      createPixels(newLine);
    }
  }
});
