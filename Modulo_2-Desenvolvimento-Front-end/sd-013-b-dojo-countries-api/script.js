const list = document.querySelector('ul')

function appendItemList(text) {
  const img = document.createElement('img');
  const newLi = document.createElement('li');
  img.src = text.flag;
  img.className = 'img'
  const countryName = text.translations.br
  newLi.innerHTML = `${countryName} cujo a capital é ${text.capital}, possui como lingua oficial: ${text.languages[0].nativeName}`;
  document.querySelector('ul').appendChild(newLi);
  newLi.appendChild(img);
}

function button() {
  const btn = document.createElement('button');
  btn.innerText = 'Sort AZ-ZA'
  btn.id = 'sort';
  
  return btn
}

function loading () {
  const div = document.createElement('div');
  div.className = 'loading'

  return div
}

const fetchCountries = async () => {
  const main = document.querySelector('main');
  const loadingAnimation = loading();
  const btn = button();
  
  main.appendChild(loadingAnimation)
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const obj = await response.json();
  setTimeout(() => {
    loadingAnimation.remove()
    Object.values(obj).forEach((countries) => appendItemList(countries));
    main.appendChild(btn)
  }, 3000)
}

setTimeout(() => {
  document.querySelector('#sort').addEventListener('click', () => {
    if (document.querySelector('.AZ')) {
      list.classList.remove('AZ')
      list.classList.add('ZA')
      Array.from(list.getElementsByTagName('li'))
      .sort((a, b) => b.textContent.localeCompare(a.textContent))
      .forEach(li => list.appendChild(li));
    } else {
      list.classList.remove('ZA')
      list.classList.add('AZ')
      Array.from(list.getElementsByTagName('li'))
      .sort((a, b) => a.textContent.localeCompare(b.textContent))
      .forEach(li => list.appendChild(li));
    }
  })
}, 3050)

window.onload = async function() {
  loading()
  await fetchCountries()
  button()
}
