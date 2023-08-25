const field = document.querySelector('.field'); //Поле
const popup = document.querySelector('.popup');
const cross = document.querySelector('.cross');
const shuffle = document.querySelector('.shuffle');

const music = new Audio('sound.mp3');
const musicWinner = new Audio('winner.mp3');

const movesCounter = document.querySelector('.moves');
const movesWinner = document.querySelector('.moves_winner');

const movesTimer = document.querySelector('.time');
const timeWinner = document.querySelector('.time_winner');

const sound = document.querySelector('.sound'); //звук
const sound_switch = document.querySelector('.sound_switch');


const cellProperties = document.querySelector('.cell');
//Настройки поля по-умолчанию
let rows = 4;
let cellSize = 100; //Размер ячейки по умолчанию
let fieldSize = 400;
let fontSize = 40;


const empty = {
    value: 0,
    top: 0,
    left: 0
};

const counter = document.createElement('p');  //Счётчик
counter.className = 'counter';
movesCounter.append(counter);

//Таймер
let seconds = '00';
let minutes = '00';


const timerEl = document.createElement('p');  //Таймер
timerEl.className = 'timerEl';
movesTimer.append(timerEl)
timerEl.textContent = seconds + ':' + minutes;

let timerId = 0;

function timer() {
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(function () {
        if (+seconds <= 58) {
            seconds++;
            if (+seconds < 10) {
                seconds = "0" + +seconds;
            }

        } else {
            seconds = 0;
            minutes++;
            if (+minutes <= 9) {
                seconds = "0" + +seconds;
            }
        }
        if (+minutes < 10) {
            timerEl.textContent = '0' + minutes + ':' + seconds;
        } else {
            timerEl.textContent = minutes + ':' + seconds;
        }
    }, 1000);
}

createField() //Вызов создания поля

//Создание Поля
function createField() {
    minutes = 0;
    seconds = -1;

    timer();
    let count = 0;
    counter.textContent = 0;
    field.style.width = `${fieldSize}px`
    field.style.height = `${fieldSize}px`
    const empty = {
        value: 0,
        top: 0,
        left: 0
    };
    const cells = [empty];

    const random = [...Array(rows * rows - 1).keys()]
        .sort(() => Math.random() - 0.5)

    for (let i = 1; i <= (rows * rows - 1); i++) {
        const cell = document.createElement('div');//Создание ячейки
        cell.className = 'cell';
        cell.innerHTML = random[i - 1] + 1;

        cell.style.fontSize = `${fontSize}px`
        cell.style.width = `${cellSize}px`
        cell.style.height = `${cellSize}px`

        const left = i % rows;
        const top = (i - left) / rows;

        cells.push({
            value: random[i - 1] + 1,
            left: left,
            top: top,
            element: cell
        });
        cell.style.left = `${left * cellSize}px`
        cell.style.top = `${top * cellSize}px`

        field.append(cell);

        cell.addEventListener('click', () => {
            move(i);
        });
    }


    function move(index) {
        const cell = cells[index];
        const leftDiff = Math.abs(empty.left - cell.left);
        const topDiff = Math.abs(empty.top - cell.top);

        if (leftDiff + topDiff > 1) {
            return;
        }

        cell.element.style.left = `${empty.left * cellSize}px`
        cell.element.style.top = `${empty.top * cellSize}px`

        const bufferLeft = empty.left;
        const bufferTop = empty.top;

        empty.left = cell.left;
        empty.top = cell.top;
        cell.left = bufferLeft;
        cell.top = bufferTop;

        if (!sound_switch.classList.contains('sound_off'))
            music.play();

        const isWin = cells.every(cell => {
            return cell.value === cell.top * rows + cell.left;
        });

        count++; //Счётчик ходов
        counter.textContent = count;
        movesWinner.textContent = count;

        if (isWin) {
            popup.classList.toggle('active');

            if (!sound_switch.classList.contains('sound_off'))
                musicWinner.play();

            if (timerId) {
                clearInterval(timerId);
            }

            if (+seconds < 59) {
                if (+seconds < 10) {
                    seconds = "0" + +seconds;
                }
            } else {
                seconds = 0;
                if (+minutes < 10) {
                    seconds = "0" + +seconds;
                }
            }
            if (+minutes < 10) {
                timeWinner.textContent = '0' + minutes + ':' + seconds;
            } else {
                timeWinner.textContent = minutes + ':' + seconds;
            }

        }
    }
}

//Звуки off/on
sound.addEventListener('click', () => {
    sound_switch.classList.toggle('sound_off');
})

//Закрытие попап
cross.addEventListener('click', () => {
    popup.classList.toggle('active');
    restart();
})

//Перемешать и начать заново
shuffle.addEventListener('click', restart)
function restart() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(element => {
        element.remove();
    }); //Удалили старые ячейки
    createField();
}


//Меняем размеры поля
const CountsArr = document.querySelectorAll('.size_input');
const ArrOfCounts = []

CountsArr.forEach(function (item) {
    ArrOfCounts.push(+item.dataset.count)
})

CountsArr.forEach(function (item) {
    item.addEventListener('click', () => {
        rows = item.dataset.count;
        cellSize = 400 / item.dataset.count;
        fieldSize = cellSize * item.dataset.count;
        fontSize = 160 / rows;
        restart();
    })
})
