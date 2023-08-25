const burgerIcon = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const body = document.body;

function openMenu(){
  nav.classList.toggle('nav-active');
  body.classList.toggle('scroll-lock');
}

function closeMenu(){
  nav.classList.remove('nav-active');
  body.classList.remove('scroll-lock');
}

burgerIcon.addEventListener('click', openMenu)

nav.addEventListener('click', e => {
  if (!e.target.classList.contains('nav__ul')) {
    closeMenu();
  }
})

nav.querySelectorAll('.nav__a').forEach(link => {
  link.addEventListener('click', () =>{
    closeMenu();
  })
})