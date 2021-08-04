const answerText = document.querySelector('#answer');
const randomBalls = document.querySelector('#randomBalls');
const buttons = document.querySelector('#buttons');
const numberOfBalls = 6;

function newColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function createBall() {
  for (let index = 0; index < numberOfBalls; index += 1) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.backgroundColor = newColor();
    randomBalls.appendChild(ball);
  }
}

createBall();

function textRGB() {
  const rgbColor = document.querySelector('#rgb-color');
  const ball = document.querySelectorAll('.ball');
  const text = document.createElement('p');
  const randomBall = window.getComputedStyle(ball[(Math.floor(Math.random() * 6))]);
  const circleSelected = randomBall.getPropertyValue('background-color');
  text.id = 'correctRGB';
  text.innerHTML = circleSelected;
  rgbColor.appendChild(text);
}

textRGB();

function scoreBoard() {
  const score = document.querySelector('#score');
  const scoreBoardText = document.createElement('span');
  const points = document.createElement('span');
  scoreBoardText.innerHTML = 'Placar ';
  points.id = 'points';
  points.innerHTML = 0;
  score.appendChild(scoreBoardText);
  score.appendChild(points);
}

scoreBoard();

function newGame() {
  const text = answerText;
  text.innerHTML = 'Escolha uma cor';
}

newGame();

function hit() {
  const text = answerText;
  text.innerHTML = 'Acertou!';
}

function missed() {
  const text = answerText;
  text.innerHTML = 'Errou! Tente novamente!';
}

randomBalls.addEventListener('click', (event) => {
  const correctRGB = document.querySelector('#correctRGB');
  const selectedCircle = event.target;
  const selectedStyle = window.getComputedStyle(selectedCircle);
  const correct = selectedStyle.getPropertyValue('background-color');
  const points = document.querySelector('#points');
  if (correctRGB.textContent === correct) {
    hit();
    points.innerHTML = Number(points.textContent) + 3;
  } else {
    missed();
    points.innerHTML = Number(points.textContent) - 1;
  }
});

function createResetButton() {
  const resetButton = document.createElement('button');
  resetButton.id = 'reset-game';
  resetButton.innerText = 'Resetar o jogo!';
  buttons.appendChild(resetButton);
}

createResetButton();

const resetButton = document.querySelector('#reset-game');
resetButton.addEventListener('click', () => {
  const ball = document.querySelectorAll('.ball');
  for (let index = 0; index < 6; index += 1) {
    ball[index].remove('div');
  }
  createBall();
  const text = document.querySelector('#correctRGB');
  text.remove('p');
  textRGB();
  newGame();
});

