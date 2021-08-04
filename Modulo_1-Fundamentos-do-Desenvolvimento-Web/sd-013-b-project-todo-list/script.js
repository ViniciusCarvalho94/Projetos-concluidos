const buttonAdd = document.querySelector('#criar-tarefa');
const list = document.querySelector('#lista-tarefas');
const clearButton = document.querySelector('#apaga-tudo');
const clearCheked = document.querySelector('#remover-finalizados');
const saveTasks = document.querySelector('#salvar-tarefas');
const upButton = document.querySelector('#mover-cima');
const downButton = document.querySelector('#mover-baixo');
const clearSelected = document.querySelector('#remover-selecionado');
const selected = '.liSelectedColor';

buttonAdd.addEventListener('click', () => {
  const input = document.querySelector('#texto-tarefa');
  const li = document.createElement('li');
  list.appendChild(li);
  li.innerHTML = input.value;
  input.value = '';
});

function classRemove() {
  const classTrue = document.getElementsByClassName('liSelectedColor')[0];
  if (classTrue) {
    classTrue.classList.remove('liSelectedColor');
  }
}

list.addEventListener('click', (event) => {
  classRemove();
  event.target.classList.add('liSelectedColor');
});

list.addEventListener('dblclick', (event) => {
  event.target.classList.toggle('completed');
});

clearButton.addEventListener('click', () => {
  const li = document.querySelectorAll('li');
  for (let index = 0; index < li.length; index += 1) {
    li[index].remove();
  }
});

clearCheked.addEventListener('click', () => {
  const completed = document.querySelectorAll('.completed');
  for (let index = 0; index < completed.length; index += 1) {
    completed[index].remove();
  }
});

saveTasks.addEventListener('click', () => {
  const li = document.querySelectorAll('li');
  const items = [];
  const completeds = [];
  for (let index = 0; index < li.length; index += 1) {
    items.push(li[index].innerText);
    if (li[index].classList.contains('completed') === true) {
      completeds.push(index);
    }
  }
  localStorage.setItem('items', JSON.stringify(items));
  localStorage.setItem('completeds', JSON.stringify(completeds));
});

window.onload = () => {
  let items = localStorage.getItem('items');
  if (items !== null && items.length > 0) {
    items = JSON.parse(items);
    const completeds = JSON.parse(localStorage.getItem('completeds'));
    items.forEach((value, index) => {
      const li = document.createElement('li');
      if (completeds.indexOf(index) !== -1) {
        li.className = 'completed';
      }
      li.innerText = value;
      list.appendChild(li);
    });
  }
};

upButton.addEventListener('click', () => {
  const upSelected = document.querySelector(selected);
  if (upSelected != null && upSelected.previousElementSibling) {
    upSelected.parentNode.insertBefore(upSelected, upSelected.previousElementSibling);
  }
});

downButton.addEventListener('click', () => {
  const downSelected = document.querySelector(selected);
  if (downSelected != null && downSelected.nextElementSibling) {
    downSelected.parentNode.insertBefore(downSelected.nextElementSibling, downSelected);
  }
});

clearSelected.addEventListener('click', () => {
  const removeSelected = document.querySelector(selected);
  removeSelected.remove();
});
