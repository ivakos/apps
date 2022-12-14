let isPlay = false;

let activeSong = "forest";

const audio = document.querySelector('audio');
const playBtn = document.querySelector('.player');


function playAudio() {
    if (!isPlay) {
        audio.src = `./assets/audio/${activeSong}.mp3`;
        audio.currentTime = 0;
        audio.play();
        playBtn.classList.add('activePlayer');
        isPlay = true;
    }
    else {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('activePlayer');
    }
}

playBtn.addEventListener('click', playAudio);

const image = ['solovey', 'drozd', 'zarynka', 'javoronok', 'slavka'];
function preloadImages() {
    image.forEach(image => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${image}.jpg`;
        }
    })
}


const main = document.querySelector('.main');
const header_link = document.querySelector('.header_container');

header_link.addEventListener('click', changeSong);

function changeSong(event) {
    isPlay = false;
  activeSong = event.target.dataset.song;
  if(event.target.classList.contains('nav_child')) {
    playAudio();
    preloadImages();
    const ActiveButton = document.querySelectorAll('.active');
    ActiveButton[0].classList.remove('active');
    event.target.classList.add('active');
    main.style.backgroundImage = `url(./assets/img/${activeSong}.jpg)`;
  }
}