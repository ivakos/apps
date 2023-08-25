import dataPets from '../pets.json' assert { type: 'json' }
export default scanCards;

function scanCards() {
  const popup = document.querySelector('.popup__wrapper');
  const card = document.querySelectorAll('.card');

  let indexPet = 0;

  card.forEach(element => {
    element.addEventListener('click', (event) => {
      if (event.target.closest('.card')) {
        let cardDom = event.target.closest('.card');
        indexPet = getPetName(cardDom, indexPet);
        openPopup(indexPet);
      }
    })
  })

  popup.addEventListener('click', e => {
    if (e.target.classList.contains('popup__wrapper') ||
      e.target.closest('.quitIcon')) {
      closePopup();
    }
  });
}

function openPopup(index) {
  const body = document.body;
  const popup = document.querySelector('.popup__wrapper');
  createPopUp(index);
  popup.classList.add('popup__wrapper-active');
  body.classList.add('scroll-lock');
}

function closePopup() {
  const body = document.body;
  const popup = document.querySelector('.popup__wrapper');
  popup.classList.remove('popup__wrapper-active');
  body.classList.remove('scroll-lock');
}

function getPetName(DomCard, index) {
  let name = DomCard.querySelector('.card__h4').innerText;
  for (let i = 0; i < dataPets.length; i++) {
    const pet = dataPets[i];
    if (pet["name"] == name) {
      index = i;
    }
  }
  return index;
}

function createPopUp(index) {
  const currentPet = dataPets[index];

  const petImg = document.querySelector(".popup__img");
  const petName = document.querySelector(".popup__title");
  const petType = document.querySelector(".pets_type");
  const petBreed = document.querySelector(".pets_breed");
  const petDescription = document.querySelector(".popup__description");
  const petAge = document.querySelector(".description__age");
  const petInoculations = document.querySelector(".inoculations");
  const petDiseases = document.querySelector(".diseases");
  const petParasites = document.querySelector(".parasites");

  petImg.src = `${currentPet["imgModal"]}`;
  petName.innerHTML = `${currentPet["name"]}`;
  petType.innerHTML = `${currentPet["type"]}`;
  petBreed.innerHTML = `${currentPet["breed"]}`;
  petDescription.innerHTML = `${currentPet["description"]}`;
  petAge.innerHTML = `${currentPet["age"]}`;
  petInoculations.innerHTML = `${currentPet["inoculations"]}`;
  petDiseases.innerHTML = `${currentPet["diseases"]}`;
  petParasites.innerHTML = `${currentPet["parasites"]}`;
}
