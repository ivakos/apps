const test = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
const field = document.querySelector('.container_box');
const result = document.querySelector('.result_game');
const nextGame = document.querySelector('.nextGame');
const winner = document.querySelector('.winner');
const moves = document.querySelector('.moves');
const audio_tap1 = document.querySelector('.tap1');
const audio_tap2 = document.querySelector('.tap2');
const audio_won = document.querySelector('.won_Game');
let move = 0;
let won = '';

const box = document.querySelectorAll('.box');

field.addEventListener('click', put);

function put(eve){
    if(eve.target.className = 'box'){
        if(eve.target.innerHTML == 'x' || eve.target.innerHTML == 'o'){}
        else if(move % 2===0) 
        {eve.target.innerHTML = 'x';
        audio_tap1.play();
        move++
        }
        else {
        eve.target.innerHTML = 'o';
        audio_tap2.play();
        move++
        }
    
    check();
    }
}

function check(){
    for(let i = 0; i < test.length; i++){
        if(box[test[i][0]].innerHTML === 'x' &&
        box[test[i][1]].innerHTML === 'x' &&
        box[test[i][2]].innerHTML === 'x') {
            won = 'Выиграли крестики!';
            winner.innerHTML = won;
            winnerGame();   
            audio_won.play();
        }
        else if(box[test[i][0]].innerHTML === 'o' &&
        box[test[i][1]].innerHTML === 'o' &&
        box[test[i][2]].innerHTML === 'o'){
            won = 'Выиграли нолики!';
            winnerGame();   
            audio_won.play();
        }
        else if(move==9 && won != 'Выиграли крестики!' && won != 'Выиграли нолики!')
        {   won = 'Ничья!';
        winnerGame();
        }
      
      
    }
    
}

function winnerGame(){
    result.style.display = 'flex';
    field.style.display = 'none';
    if(won=='Ничья!'){
        winner.innerHTML = won;
    }
    else {winner.innerHTML = won;
    moves.innerHTML = `За ${move} ходов!`;}
}

nextGame.addEventListener('click', e =>{
location.reload();
});