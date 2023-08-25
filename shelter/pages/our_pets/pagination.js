import dataPets from '../pets.json' assert { type: 'json' }
import scanCards from './popup.js';

const DBL_BTN_LEFT = document.querySelector(".button__left-twice");
const BTN_LEFT = document.querySelector(".button__left");
const PAGE = document.querySelector(".button__page")
const BTN_RIGHT = document.querySelector(".button__right");
const DBL_BTN_RIGHT = document.querySelector(".button__right-twice");
const ITEM_ACTIVE = document.querySelector(".card__container");

let pageNumber = 1;
let lastPage;
let amountCard;
let PetsArr = getRandomArr();

init();

function init() {
  amountCard = setAmount();
  lastPage = 48 / amountCard;
  createCardTemplate(dataPets, PetsArr, amountCard);
}

// ------------------- RANDOM  

function getRandomArr() {
  let result = []
  let arr = [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5);
  let head = arr.slice(0, 3);
  let body = arr.slice(3, 6)
  let tail = arr.slice(6, 8)
  for (let i = 0; i < 6; i++) {
    head = head.sort(() => Math.random() - 0.9);
    head.forEach((e) => {
      result.push(e)
    })
    body = body.sort(() => Math.random() - 0.9);
    body.forEach((e) => {
      result.push(e)
    })
    tail = tail.sort(() => Math.random() - 0.9);
    tail.forEach((e) => {
      result.push(e)
    })
  }
  return result
}
// // ------------------- END RANDOM  

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);
DBL_BTN_LEFT.addEventListener('click', moveLeftDBL);
DBL_BTN_RIGHT.addEventListener('click', moveRightDBL);

function moveLeft() {
  pageNumber = getPage();
  if (pageNumber == lastPage) {
    BTN_RIGHT.classList.remove('button__arrow-inactive');
    DBL_BTN_RIGHT.classList.remove('button__arrow-inactive');
  }
  if (pageNumber != 1) {
    pageNumber = pageNumber - 1;
    setPage(pageNumber);
    createCardTemplate(dataPets, PetsArr, amountCard);
  }
  if (pageNumber == 1) {
    BTN_LEFT.classList.add('button__arrow-inactive');
    DBL_BTN_LEFT.classList.add('button__arrow-inactive');
  }
};

function moveRight() {
  pageNumber = getPage();
  if (pageNumber == 1) {
    BTN_LEFT.classList.remove('button__arrow-inactive');
    DBL_BTN_LEFT.classList.remove('button__arrow-inactive');
  }
  if (pageNumber != lastPage) {
    pageNumber = pageNumber + 1;
    setPage(pageNumber);
    createCardTemplate(dataPets, PetsArr, amountCard);
  }
  if (pageNumber == lastPage) {
    BTN_RIGHT.classList.add('button__arrow-inactive');
    DBL_BTN_RIGHT.classList.add('button__arrow-inactive');
  }
};

function moveLeftDBL() {
  pageNumber = 1;
  setPage(pageNumber);
  createCardTemplate(dataPets, PetsArr, amountCard);
  BTN_LEFT.classList.add('button__arrow-inactive');
  DBL_BTN_LEFT.classList.add('button__arrow-inactive');
  BTN_RIGHT.classList.remove('button__arrow-inactive');
  DBL_BTN_RIGHT.classList.remove('button__arrow-inactive');
}

function moveRightDBL() {
  pageNumber = lastPage;
  setPage(pageNumber);
  createCardTemplate(dataPets, PetsArr, amountCard);
  BTN_RIGHT.classList.add('button__arrow-inactive');
  DBL_BTN_RIGHT.classList.add('button__arrow-inactive');
  BTN_LEFT.classList.remove('button__arrow-inactive');
  DBL_BTN_LEFT.classList.remove('button__arrow-inactive');
}

function getPage() {
  return +PAGE.innerText;
}

function setPage(page) {
  PAGE.innerHTML = page;
}

window.addEventListener('resize', function () {

  let curElement = (pageNumber) * amountCard;
  amountCard = setAmount();
  lastPage = 48 / amountCard;

  let actualPage = Math.round(curElement / amountCard);
  pageNumber = actualPage;

  setPage(pageNumber);

  createCardTemplate(dataPets, PetsArr, amountCard);

  if (pageNumber != 1 && pageNumber != lastPage) {
    BTN_LEFT.classList.remove('button__arrow-inactive');
    BTN_RIGHT.classList.remove('button__arrow-inactive');
    DBL_BTN_LEFT.classList.remove('button__arrow-inactive');
    DBL_BTN_RIGHT.classList.remove('button__arrow-inactive');
  }


});

function setAmount() {
  let windowWidth = window.innerWidth;
  if (windowWidth >= 1280) { return amountCard = 8; }
  if (windowWidth < 1280 && windowWidth >= 768) { return amountCard = 6; }
  if (windowWidth < 768) { return amountCard = 3; }
}

function createCardTemplate(obj, randomArr, amountCard) {
  const card = ITEM_ACTIVE.querySelectorAll(".card");
  const cardImg = ITEM_ACTIVE.querySelectorAll(".card__img");
  const cardName = ITEM_ACTIVE.querySelectorAll(".card__h4");

  for (let i = 0, k = (pageNumber - 1) * amountCard; i < amountCard; i++) {
    const currentPet = obj[randomArr[k]];
    card[i].dataset.item = randomArr[k];

    cardImg[i].src = `${currentPet['img']}`;
    cardName[i].innerHTML = `${currentPet['name']}`;
    k++;
  }
  scanCards();
}