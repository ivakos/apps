import dataPets from '../pets.json' assert { type: 'json' }
import scanCards from './popup.js';

const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");

const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_ACTIVE = document.querySelector("#item-active");
const ITEM_RIGHT = document.querySelector("#item-right");

let currentPetsOnPage = [];
let newPetsLeft = [];
let newPetsRight = [];
let newPetsMove = [];

init();

function init() {
  generateRandomCardsActive(currentPetsOnPage);
  generateRandomCardsMoveLeft(currentPetsOnPage, newPetsMove);
  newPetsLeft = newPetsMove;
  newPetsRight = newPetsMove;

  createCardTemplateMoveLeft(dataPets, newPetsLeft);
  createCardTemplateActive(dataPets, currentPetsOnPage);
  createCardTemplateMoveRight(dataPets, newPetsRight);

  scanCards();
}

const moveLeft = () => {
  CAROUSEL.classList.add("transition-left");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
  CAROUSEL.classList.add("transition-right");
  BTN_LEFT.removeEventListener("click", moveLeft);
  BTN_RIGHT.removeEventListener("click", moveRight);
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

CAROUSEL.addEventListener('animationend', (animation) => {
  CAROUSEL.classList.remove("transition-left");
  CAROUSEL.classList.remove("transition-right");

  let buffer = ITEM_ACTIVE.innerHTML;

  if (animation.animationName === "move-left") {
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
    ITEM_RIGHT.innerHTML = buffer;

    newPetsRight = currentPetsOnPage;
    currentPetsOnPage = newPetsLeft;
    newPetsLeft = [];
    newPetsLeft = generateRandomCardsMoveLeft(currentPetsOnPage, newPetsLeft);

    createCardTemplateMoveLeft(dataPets, newPetsLeft);
  }
  if (animation.animationName === "move-right") {
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
    ITEM_LEFT.innerHTML = buffer;

    newPetsLeft = currentPetsOnPage;
    currentPetsOnPage = newPetsRight;
    newPetsRight = [];
    newPetsRight = generateRandomCardsMoveRight(currentPetsOnPage, newPetsRight);

    createCardTemplateMoveRight(dataPets, newPetsRight);
  }

  scanCards();

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);
});

// ----------------------------------------------- RANDOM

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomCardsActive(newArr) {
  while (newArr.length != 3) {
    const currentValue = getRandom(8);
    if (!newArr.includes(currentValue)) {
      newArr.push(currentValue);
    }
  }
}

function generateRandomCardsMoveLeft(currentArr, newArr) {
  while (newArr.length != 3) {
    const currentValue = getRandom(8);
    if (!currentArr.includes(currentValue) && !newArr.includes(currentValue)) {
      newArr.push(currentValue);
    }
  }
  return newArr;
}

function generateRandomCardsMoveRight(currentArr, newArr) {
  while (newArr.length != 3) {
    const currentValue = getRandom(8);
    if (!currentArr.includes(currentValue) && !newArr.includes(currentValue)) {
      newArr.push(currentValue);
    }
  }
  return newArr;
}

// -----------------------------------------------CREATE CARD

function createCardTemplateActive(obj, randomArr) {
  const cardImg = ITEM_ACTIVE.querySelectorAll(".card__img");
  const cardName = ITEM_ACTIVE.querySelectorAll(".card__h4");

  for (let i = 0, k = 0; i < 3; i++, k++) {
    const currentPet = obj[randomArr[k]];
    cardImg[i].src = `${currentPet['img']}`;
    cardName[i].innerHTML = `${currentPet['name']}`;
  }
}

function createCardTemplateMoveLeft(obj, randomArr) {
  const cardImgLeft = ITEM_LEFT.querySelectorAll(".card__img");
  const cardNameLeft = ITEM_LEFT.querySelectorAll(".card__h4");

  for (let i = 0, k = 0; i < 3; i++, k++) {
    const currentPet = obj[randomArr[k]];
    cardImgLeft[i].src = `${currentPet['img']}`;
    cardNameLeft[i].innerHTML = `${currentPet['name']}`;
  }
}

function createCardTemplateMoveRight(obj, randomArr) {
  const cardImgRight = ITEM_RIGHT.querySelectorAll(".card__img");
  const cardNameRight = ITEM_RIGHT.querySelectorAll(".card__h4");

  for (let i = 0, k = 0; i < 3; i++, k++) {
    const currentPet = obj[randomArr[k]];
    cardImgRight[i].src = `${currentPet['img']}`;
    cardNameRight[i].innerHTML = `${currentPet['name']}`;
  }
}