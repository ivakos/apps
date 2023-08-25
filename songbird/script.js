import birdsData from './object.js';

const buttonStart = document.querySelector(".main__button-start"); //button start
const startMainPage = document.querySelector(".main__start-page"); //div start main
const playMainPage = document.querySelector(".main__game-page"); //div play main
const buttonHome = document.getElementById("home");
const buttonPlay = document.getElementById("play");
const divScore = document.querySelector(".header__score")

const buttonGoAgain = document.querySelector(".btn-go-again"); //btn score page
const scoreMainPage = document.querySelector(".main__score-page"); // div score page

const buttonNextLevel = document.querySelector(".next-level"); //btn score page

//----------------КНОПКА START или PLAY
buttonStart.addEventListener("click", createField);
buttonPlay.addEventListener("click", createField);
buttonGoAgain.addEventListener("click", createField);

function deleteStartPage() {
  startMainPage.style.display = 'none';
  playMainPage.style.display = 'flex';
  divScore.style.display = 'flex';
  scoreMainPage.style.display = 'none';
  buttonHome.classList.remove("nav__a-active");
  buttonPlay.classList.add("nav__a-active");
}

function deleteMainPage() {
  playMainPage.style.display = 'none';
  divScore.style.display = 'none';
  scoreMainPage.style.display = 'flex';
  buttonHome.classList.remove("nav__a-active");
  buttonPlay.classList.remove("nav__a-active");
}

//----------------КНОПКА HOME 
buttonHome.addEventListener("click", moveBackToStart);

function moveBackToStart() {
  startMainPage.style.display = 'flex';
  playMainPage.style.display = 'none';
  divScore.style.display = 'none';
  scoreMainPage.style.display = 'none';
  buttonHome.classList.add("nav__a-active");
  buttonPlay.classList.remove("nav__a-active");
}

const buttonAnswer = document.querySelectorAll(".answers__li"); //btn answer


const playObjdefault = {
  active: 0,
  finished: false,
  questions: random,

}

function createObj(){

}

function createField() {
  deleteStartPage();
  let random = getRandom();



  //deleteMainPage() //функция для скора. когда выигрыш вызвать её.
}

function getRandom() {
  return Math.floor(Math.random() * 5);
}

alert("Sad :( --- I didn't make it in time.");