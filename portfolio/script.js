/* ИЗМЕНЕНИЕ ФОТОГРАФИЙ */
const portfolioButtons = document.querySelector('.portfolio-buttons-con');
let portfolioImages = document.querySelectorAll('.portfolio-image');

portfolioButtons.addEventListener('click', changeImage);

function changeImage(event) {
  let season = event.target.dataset.season;
  if(event.target.classList.contains('portfolio-buttons')) {
    portfolioImages.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
    const ActiveButton = document.querySelectorAll('.active-b');
    ActiveButton[0].classList.remove('active-b');
    event.target.classList.add('active-b');
  }
}
portfolioButtons.addEventListener('click', changeImage);


/* КЭШИРОВАНИЕ ФОТОГРАФИЙ */

const seasons = ['winter', 'spring', 'summer', 'autumn'];

  function preloadImages() {
    seasons.forEach(seasons => {
      for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `assets/img/${seasons}/${i}.jpg`;
      }
    })
  }
  preloadImages();

/* ИЗМЕНЕНИЕ АКТИВ КЛАССА */

  /*
  function changeClassActive(event) {
    const ActiveButton = document.querySelectorAll('.active');
    ActiveButton[0].classList.remove('active');
    event.target.classList.add('active');
  };
  */


  /* ПЕРЕВОД СТРАНИЦЫ */

  import i18Obj from './translate.js';

  const ru = document.getElementById('ru');
  const en = document.getElementById('en');

  const textTranslate = document.querySelectorAll('[data-i18]');  
  const switchLng = document.querySelector('.header-list-lang');

  function getTranslate(language) {
      textTranslate.forEach((element)=> element.textContent = i18Obj
      [language][element.dataset.i18])
  };

  en.addEventListener('click',(eve) => {
    getTranslate('en');
    const ActiveButton = document.querySelectorAll('.active-l');
    ActiveButton[0].classList.remove('active-l');
    eve.target.classList.add('active-l');
    localStorage.setItem('lang', 'en');
    localStorage.setItem('lang-active', 'en');
  });

  ru.addEventListener('click',(eve) => {
    getTranslate('ru');
    const ActiveButton = document.querySelectorAll('.active-l');
    ActiveButton[0].classList.remove('active-l');
    eve.target.classList.add('active-l');
    localStorage.setItem('lang', 'ru');
    localStorage.setItem('lang-active', 'ru');
  });
          

  /* ПЕРЕКЛЮЧЕНИЕ ТЕМ */

  const skills = document.querySelector('.skills')
  const portfolio = document.querySelector('.portfolio')
  const video = document.querySelector('.video')
  const price = document.querySelector('.price')
  const contact = document.querySelector('.contacts')
  const switchTheme =  document.querySelector('.switch_theme')

  const lightTheme = [skills, portfolio, video, price, contact]

  switchTheme.addEventListener('click', switchLight);
  function switchLight(){
    lightTheme.forEach((element) => element.classList.toggle('light'))
    switchTheme.classList.toggle('light-icon');
    
  }


  /* КЭШИРОВАНИЕ ДАННЫХ */

  function getLocalStorage() {
    if(localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      getTranslate(lang);}
    }
  
  
  window.addEventListener('load', getLocalStorage)



