const name = document.getElementById('input-name');
const lastName = document.getElementById('input-lastname');
const email = document.getElementById('input-email');
const house = document.getElementById('house');
const radio = document.querySelectorAll('.radio-family');
const content = document.querySelectorAll('.subject');
const rate = document.querySelectorAll('.radio-rate');
const textArea = document.getElementById('textarea');

document.querySelector('.login').addEventListener('click', () => {
  const inputLogin = document.getElementById('login').value;
  const inputSenha = document.getElementById('senha').value;

  return inputLogin !== 'tryber@teste.com' || inputSenha !== '123456'
    ? alert('Login ou senha inválidos.')
    : alert('Olá, Tryber!');
});

document.getElementById('agreement').addEventListener('click', () => {
  const check = document.getElementById('agreement');
  const button = document.getElementById('submit-btn');
  if (check.value === 'false') {
    button.removeAttribute('disabled');
    check.value = 'true';
  } else {
    button.disabled = true;
    check.value = 'false';
  }
});

document.getElementById('textarea').addEventListener('input', () => {
  const counter = document.getElementById('counter');
  counter.textContent = 500 - textArea.value.length;
});

function getFullName(nameElement, lastNameElement, textTitle) {
  const pAnswer = document.createElement('p');
  pAnswer.innerText = `${textTitle}: ${nameElement.value} ${lastNameElement.value}`;
  return pAnswer;
}

function getELement(element, textTitle) {
  const pAnswer = document.createElement('p');
  pAnswer.innerText = `${textTitle}: ${element.value}`;
  return pAnswer;
}

function getElementsRadio(elements, textTitle) {
  for (let index = 0; index < elements.length; index += 1) {
    if (elements[index].type === 'radio' && elements[index].checked) {
      return getELement(elements[index], textTitle);
    }
  }
}

function getElementsCheckbox(elements, textTitle) {
  const valorP = [];
  const pAnswer = document.createElement('p');
  for (let index = 0; index < elements.length; index += 1) {
    if (elements[index].type === 'checkbox' && elements[index].checked) {
      valorP.push(` ${elements[index].value}`);
    }
  } pAnswer.innerText = `${textTitle}: ${valorP}`;
  return pAnswer;
}

document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const div = document.createElement('div');
  const form = document.getElementById('evaluation-form');
  div.appendChild(getFullName(name, lastName, 'Nome'));
  div.appendChild(getELement(email, 'Email'));
  div.appendChild(getELement(house, 'Casa'));
  div.appendChild(getElementsRadio(radio, 'Família'));
  div.appendChild(getElementsCheckbox(content, 'Matérias'));
  div.appendChild(getElementsRadio(rate, 'Avaliação'));
  div.appendChild(getELement(textArea, 'Observações'));
  form.innerHTML = '';
  form.appendChild(div);
});
