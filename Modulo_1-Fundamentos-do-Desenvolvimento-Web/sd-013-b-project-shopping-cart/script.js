const itemList = '.cart__items';
const clearListButton = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createListItems(section) {
  const items = document.querySelector('.items');
  items.appendChild(section);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  createListItems(section);
}

function arrDesc(object) {
  for (let i = 0; i < 50; i += 1) {
    const newObject = {
      sku: object[i].id,
      name: object[i].title,
      image: object[i].thumbnail,
    };
    createProductItemElement(newObject);
  }
}

function load() {
  const loading = document.createElement('div');
  loading.innerText = 'loading';
  loading.className = 'loading';

  return loading;
}

function fetchApi(product) {
  const itemsContainer = document.querySelector('.items');
  const loadingText = load();

  itemsContainer.appendChild(loadingText);

  return new Promise((resolve, reject) => {
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
      .then((response) => response.json())
      .then((object) => object.results)
      .then((newObject) => {
        arrDesc(newObject);
        loadingText.remove();
        resolve();
      })
      .catch((error) => reject(error));
  });
}

function saveLocal() {
  const items = document.querySelectorAll('.cart__item');
  const arrS = [];
  items.forEach((element) => arrS.push(element.innerText));
  localStorage.setItem('items', JSON.stringify(arrS));
}

clearListButton.addEventListener('click', () => {
  const cart = document.querySelector('.cart');
  const ol = document.querySelector('.cart__items');
  cart.removeChild(ol);
  const newOl = document.createElement('ol');
  newOl.className = 'cart__items';
  cart.appendChild(newOl);
  saveLocal();
});

function addHtmlItem(item) {
  const cart = document.querySelector(itemList);
  cart.appendChild(item);
}

function addTotal() {
  const cart = document.querySelector('.cart');
  const span = document.createElement('span');
  span.className = 'total-price';
  span.innerHTML = 0;
  cart.appendChild(span);
}

let total = 0;
function sumCart(price) {
  const totalPrice = document.querySelector('.total-price');
  total += price;
  if (totalPrice.innerHTML === 0) {
    totalPrice.innerHTML = `${price}`;
  } else {
    totalPrice.innerHTML = `${total}`;
  }
}

function cartItemClickListener(event) {
  const items = document.querySelector(itemList);
  const item = event.target;
  items.removeChild(item);
  saveLocal();
  sumCart(0);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sumCart(salePrice);
  total -= salePrice;
  addHtmlItem(li);
}

function arr(item) {
  const arrItem = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  createCartItemElement(arrItem);
  saveLocal();
}

function fecthItemId(id) {
  fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((object) => arr(object));
}

function getSkuFromProductItem(item) {
  const id = item.querySelector('span.item__sku').innerText;
  fecthItemId(id);
}

function buttons() {
  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => {
    element.addEventListener('click', (event) => {
      const target = event.target.parentNode;
      getSkuFromProductItem(target);
    });
  });
}

function loadLocal() {
  let items = localStorage.getItem('items');
  const ol = document.querySelector(itemList);
  if (items !== null && items.length > 0) {
    items = JSON.parse(items);
    items.forEach((element) => {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerHTML = element;
      ol.appendChild(li);
    });
  }
}

const fecthAsyncAwait = async () => {
  try {
    await fetchApi('computador');
    await buttons();
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  fecthAsyncAwait();
  loadLocal();
  addTotal();
};
