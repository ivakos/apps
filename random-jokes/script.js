const btn = document.querySelector('.btn');
const joke = document.querySelector('.joke')
const img_chuck = document.querySelector('.img_main')

const url = 'https://api.icndb.com/jokes/random';


async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    joke.innerHTML = data.value.joke;
    img_chuck.classList.toggle('active');
  }

btn.addEventListener('click', getData);
window.addEventListener('load', getData)
