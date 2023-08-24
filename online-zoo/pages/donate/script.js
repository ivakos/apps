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



/* AMOUNT */
let inputValue = document.querySelector('.input_amount');

inputValue.addEventListener('input', checkAmountLength)

function checkAmountLength() {
    if (inputValue.value.length > 4) {
        inputValue.value = inputValue.value.slice(0, 4);
    }
    inputValue.value = inputValue.value.replace(/[e,+,-]/g, '');
}



let CountsArr = document.querySelectorAll('.progress_bar_radio');

let ArrOfCounts = []

CountsArr.forEach(function (item) {
    ArrOfCounts.push(+item.dataset.count)
})

inputValue.addEventListener('input', CheckInputValue);

function CheckInputValue(e) {
    let valueInput = +e.target.value;
    if (ArrOfCounts.includes(valueInput)) {
        CountsArr.forEach(function (item) {
            +item.dataset.count === valueInput ? item.checked = true : null;
        })
    }
    else {
        CountsArr.forEach(function (item) {
            +item.dataset.count !== valueInput ? item.checked = false : null;
        })
    }
}

inputAnotherValue();

function inputAnotherValue(){
    CountsArr.forEach(function (item) {
        inputValue.value = '100';
        item.addEventListener('click', () => {
            inputValue.value = item.dataset.count;
        })
    })
}