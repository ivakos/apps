/* BURGER */

const body = document.body
const burger = body.querySelector('.burger')
const header = body.querySelector('.header')

burger.addEventListener(('click'), open_menu)

function open_menu(event) {
    body.classList.toggle('scroll_lock')
    header.classList.toggle('active_menu')
}

body.addEventListener(('click'), close_menu)

function close_menu(event) {
    const target = event.target;
    if (!target.classList.contains('burger')) {
        body.classList.remove('scroll_lock')
        header.classList.remove('active_menu')
    }
}