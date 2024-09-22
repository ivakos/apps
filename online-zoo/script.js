/* BURGER */
const body = document.body
const burger = body.querySelector('.burger')
const header = body.querySelector('.header')
const burger_menu = body.querySelector('.menu_burger')
const shadow = body.querySelector('.shadow')
const burger_item = body.querySelector('.burger_item')

burger.addEventListener(('click'), open_menu)

function open_menu(event) {
    body.classList.toggle('scroll_lock');
    burger.classList.toggle('active_burger');
    burger_menu.classList.toggle('active');
    shadow.classList.toggle('shadow_active');
}

shadow.addEventListener(('click'), close_menu)

function close_menu(event) {
    const target = event.target;
    if (!target.classList.contains('burger')) {
        body.classList.remove('scroll_lock');
        burger.classList.remove('active_burger');
        burger_menu.classList.remove('active');
        shadow.classList.remove('shadow_active');
    }
}

