document.body.oncontextmenu = function (e) {
  return false;
};

let interval;
let bombs;
const gameSettings = {
  sound: true,
  theme: true,
  field: 10,
  mines: 10,
};

const currentGame = {
  time: 0,
  clicks: 0,
  mines: 10,
  flags: 10,
};

let saveGame = {};
let scoreObj = {};

if (localStorage.getItem('scoreObj')) {
  scoreObj = JSON.parse(localStorage.getItem('scoreObj'));
}

if (localStorage.getItem('saveGame')) {
  saveGame = JSON.parse(localStorage.getItem('saveGame'));
}

gameSettings.sound = saveGame.sound === false ? saveGame.sound : true;
gameSettings.theme = saveGame.theme === false ? saveGame.theme : true;

const soundClick = new Audio('./assets/sounds/click.wav');
const soundMark = new Audio('./assets/sounds/mark.wav');

const soundWin = new Audio('./assets/sounds/win.mp3');
const soundLose = new Audio('./assets/sounds/lose.wav');

const { body } = document;

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
body.append(wrapper);

const title = document.createElement('h1');
title.className = 'title';
title.innerText = "Minesweeper";
wrapper.append(title);

const gameAria = document.createElement('div');
gameAria.className = 'game-area';
wrapper.append(gameAria);

//-----------GAME MENU
const gameMenu = document.createElement('div');
gameMenu.className = 'game-menu';
gameAria.append(gameMenu);

const newGameBtn = document.createElement('div');
newGameBtn.className = 'newGameBtn btn_score';
gameMenu.append(newGameBtn);
newGameBtn.innerText = "new game";

newGameBtn.addEventListener('click', () => {
  saveGame = {};
  localStorage.setItem('saveGame', JSON.stringify(saveGame));
  currentGame.time = 0;
  currentGame.clicks = 0;
  currentGame.mines = gameSettings.mines;
  currentGame.flags = gameSettings.mines;

  const field = document.querySelector('.field');
  field.remove();
  initGame(gameSettings.field, gameSettings.mines);
});

const saveGameBtn = document.createElement('div');
saveGameBtn.className = 'saveGameBtn btn_score';
gameMenu.append(saveGameBtn);
saveGameBtn.innerText = "save game";

saveGameBtn.addEventListener('click', () => {
  saveGame.time = currentGame.time;
  saveGame.clicks = currentGame.clicks;
  saveGame.mines = currentGame.mines;
  saveGame.flags = currentGame.flags;
  saveGame.bombs = bombs;
  saveGame.size = gameSettings.field;
  saveGame.minesInput = gameSettings.mines;
  saveGame.sound = gameSettings.sound
  saveGame.theme = gameSettings.theme
  localStorage.setItem('saveGame', JSON.stringify(saveGame));
});

const gameSettingsBtn = document.createElement('div');
gameSettingsBtn.className = 'gameSettingsBtn btn_score';
gameMenu.append(gameSettingsBtn);
gameSettingsBtn.innerText = "settings";

const scoreBtn = document.createElement('div');
scoreBtn.className = 'scoreBtn btn_score';
gameMenu.append(scoreBtn);
scoreBtn.innerText = "score";

//-----------GAME STAT
const gameStat = document.createElement('div');
gameStat.className = 'game-stat';
gameAria.append(gameStat);

const timeWrapper = document.createElement('div');
timeWrapper.className = 'time_wrapper';
gameStat.append(timeWrapper);

const timeIcon = document.createElement('div');
timeIcon.className = 'time-icon';
timeWrapper.append(timeIcon);

const time = document.createElement('p');
time.className = 'game-stat-text';
timeWrapper.append(time);

const clicksWrapper = document.createElement('div');
clicksWrapper.className = 'clicks_wrapper';
gameStat.append(clicksWrapper);

const clicksIcon = document.createElement('div');
clicksIcon.className = 'clicks-icon';
clicksWrapper.append(clicksIcon);

const clicks = document.createElement('p');
clicks.className = 'game-stat-text';
clicksWrapper.append(clicks);

const minesWrapper = document.createElement('div');
minesWrapper.className = 'mines_wrapper';
gameStat.append(minesWrapper);

const minesIcon = document.createElement('div');
minesIcon.className = 'mines-icon';
minesWrapper.append(minesIcon);

const mines = document.createElement('p');
mines.className = 'game-stat-text';
minesWrapper.append(mines);

const flagsWrapper = document.createElement('div');
flagsWrapper.className = 'flags_wrapper';
gameStat.append(flagsWrapper);

const flagsIcon = document.createElement('div');
flagsIcon.className = 'flags-icon';
flagsWrapper.append(flagsIcon);

const flags = document.createElement('p');
flags.className = 'game-stat-text';
flagsWrapper.append(flags);

//-----------GAME FIELD

const gameField = document.createElement('div');
gameField.className = 'game-field';
gameAria.append(gameField);

const themeIcons = [body, title, gameField,
  newGameBtn, saveGameBtn, gameSettingsBtn, scoreBtn,
  timeIcon, clicksIcon, minesIcon, flagsIcon,
  time, clicks, mines, flags];
if (!gameSettings.theme) {
  themeIcons.forEach((element) => element.classList.add('dark'));
}

//-----------POPUP

gameSettingsBtn.addEventListener('click', () => {
  createPopUpSettings();

  const popupSettings = document.querySelector('.popupSettings_wrapper');
  popupSettings.classList.add('popupSettings_wrapper-active');

  popupSettings.addEventListener('click', e => {
    if (e.target.classList.contains('popupSettings_wrapper')) {
      popupSettings.classList.remove('popupSettings_wrapper-active');
      document.querySelector('.popupSettings_wrapper').remove();
    }
  });
});

function createPopUpSettings() {
  const popupSettingWrapper = document.createElement('div');
  popupSettingWrapper.className = 'popupSettings_wrapper';
  body.append(popupSettingWrapper);

  const popupSettings = document.createElement('div');
  popupSettings.className = 'popupSettings';
  popupSettingWrapper.append(popupSettings);

  const settingsTitle = document.createElement('p');
  settingsTitle.className = 'settings-title';
  settingsTitle.innerText = 'Settings'
  popupSettings.append(settingsTitle);

  const sizeWrapper = document.createElement('div');
  sizeWrapper.className = 'size_wrapper';
  popupSettings.append(sizeWrapper);

  const sizeTitle = document.createElement('p');
  sizeTitle.className = 'size-title';
  sizeTitle.innerText = 'Size:'
  sizeWrapper.append(sizeTitle);

  [10, 15, 25].forEach((item) => {
    const size = document.createElement('div');
    sizeWrapper.append(size);

    const sizeInput = document.createElement('input');
    sizeInput.className = 'size-input';
    sizeInput.type = 'radio';
    sizeInput.id = `size${item}`;
    sizeInput.name = 'size';
    sizeInput.value = `${item}`;
    size.append(sizeInput);

    const sizeLabel = document.createElement('label');
    sizeLabel.className = 'size-label';
    sizeLabel.setAttribute('for', `size${item}`);
    sizeLabel.innerText = `${item}x${item}`;
    size.append(sizeLabel);

    if (gameSettings.field == item) {
      sizeInput.checked = true;
    }
  });

  const minesWrapper = document.createElement('div');
  minesWrapper.className = 'minesSet_wrapper';
  popupSettings.append(minesWrapper);

  const minesTitle = document.createElement('p');
  minesTitle.className = 'size-title';
  minesTitle.innerText = 'Mines:'
  minesWrapper.append(minesTitle);

  const minesChangeWrapper = document.createElement('div');
  minesWrapper.append(minesChangeWrapper);

  const minesInput = document.createElement('input');
  minesInput.className = 'mines-input';
  minesInput.type = 'number';
  minesInput.step = '1';
  minesInput.min = '10';
  minesInput.max = '99';
  minesInput.value = saveGame.minesInput ? saveGame.minesInput : gameSettings.mines;
  minesInput.id = 'mines';
  minesInput.name = 'mines';
  minesChangeWrapper.append(minesInput);

  const minesLabel = document.createElement('label');
  minesLabel.className = 'mines-label';
  minesLabel.setAttribute('for', 'mines');
  minesChangeWrapper.append(minesLabel);

  const secondSettingsWrapper = document.createElement('div');
  secondSettingsWrapper.className = 'second-settings_wrapper';
  popupSettings.append(secondSettingsWrapper);

  const soundImg = document.createElement('div');
  soundImg.className = 'sound-img';
  secondSettingsWrapper.append(soundImg);

  if (!gameSettings.sound) {
    soundImg.classList.add('sound-img-active');
  }

  soundImg.addEventListener('click', () => {
    soundImg.classList.toggle('sound-img-active');
    gameSettings.sound = !gameSettings.sound;
  });

  const saveBtn = document.createElement('div');
  saveBtn.className = 'btn-save';
  saveBtn.innerText = 'Save';
  popupSettings.append(saveBtn);

  const themeImg = document.createElement('div');
  themeImg.className = 'theme-img';
  secondSettingsWrapper.append(themeImg);

  const themeIcons = [body, title, gameField,
    newGameBtn, saveGameBtn, gameSettingsBtn, scoreBtn,
    timeIcon, clicksIcon, minesIcon, flagsIcon,
    time, clicks, mines, flags,
    popupSettings, soundImg, themeImg, saveBtn, gameField];
  if (!gameSettings.theme) {
    themeIcons.forEach((element) => element.classList.add('dark'));
  }

  themeImg.addEventListener('click', () => {
    gameSettings.theme = !gameSettings.theme;
    if (!gameSettings.theme) {
      themeIcons.forEach((element) => element.classList.add('dark'));
    } else {
      themeIcons.forEach((element) => element.classList.remove('dark'));
    }
  });

  saveBtn.addEventListener('click', () => {
    saveGame = {};
    localStorage.setItem('saveGame', JSON.stringify(saveGame));
    const sizeChoose = document.querySelectorAll('.size-input');
    sizeChoose.forEach((item) => {
      if (item.checked) {
        gameSettings.field = item.value;
      }
    });
    const minesChoose = document.querySelector('.mines-input');
    gameSettings.mines = minesChoose.value;
    currentGame.time = 0;
    currentGame.clicks = 0;

    if (minesChoose.value > 99) {
      gameSettings.mines = 99;
      gameSettings.flags = 99;
      minesChoose.value = 99;
    }
    if (minesChoose.value < 10) {
      gameSettings.mines = 10;
      gameSettings.flags = 10;
      minesChoose.value = 10;
    }
    currentGame.mines = gameSettings.mines;
    currentGame.flags = gameSettings.mines;

    const field = document.querySelector('.field');
    field.remove();
    initGame(gameSettings.field, gameSettings.mines);
    const popupSettings = document.querySelector('.popupSettings_wrapper');
    popupSettings.classList.remove('popupSettings_wrapper-active');
    document.querySelector('.popupSettings_wrapper').remove();
  });
}

scoreBtn.addEventListener('click', () => {
  createPopUpScore();

  const popupScore = document.querySelector('.popupScore_wrapper');
  popupScore.classList.add('popupScore_wrapper-active');

  popupScore.addEventListener('click', e => {
    if (e.target.classList.contains('popupScore_wrapper')) {
      popupScore.classList.remove('popupScore_wrapper-active');
      document.querySelector('.popupScore_wrapper').remove();
    }
  });
})

function createPopUpScore() {
  const popupScoreWrapper = document.createElement('div');
  popupScoreWrapper.className = 'popupScore_wrapper';
  body.append(popupScoreWrapper);

  const popupScore = document.createElement('div');
  popupScore.className = 'popupScore';
  popupScoreWrapper.append(popupScore);

  const scoreTitle = document.createElement('p');
  scoreTitle.className = 'settings-title';
  scoreTitle.innerText = 'Score';
  popupScore.append(scoreTitle);

  const scoreWrapper = document.createElement('div');
  scoreWrapper.className = 'score_wrapper';
  popupScore.append(scoreWrapper);

  let counter = 1;
  for (let key in scoreObj) {
    if (counter <= 10) {
      const scoreRow = document.createElement('div');
      scoreRow.className = 'scoreRow';
      scoreWrapper.append(scoreRow);

      const scoreCount = document.createElement('p');
      scoreCount.className = 'scoreCount';
      scoreCount.innerText = `${counter}.`;
      scoreRow.append(scoreCount);

      const score = document.createElement('div');
      score.className = 'scoreCount';

      if (key) {
        score.innerText = `${key}s`;
      }
      scoreRow.append(score);

      const scoreName = document.createElement('div');
      scoreName.className = 'scoreCount';
      if (scoreObj[key]) {
        scoreName.innerText = `- ${scoreObj[key]}`;
      }
      scoreRow.append(scoreName);
      counter++;
    }
  }

  const themeScoreIcons = [popupScore]
  if (!gameSettings.theme) {
    themeScoreIcons.forEach((element) => element.classList.add('dark'));
  }
}

if (saveGame.size) {
  gameSettings.field = saveGame.size;
}

initGame(gameSettings.field, gameSettings.mines);

function initGame(size, bombCount) {
  if (document.querySelector('.safe-screen')) document.querySelector('.safe-screen').remove();
  clearInterval(interval);
  if (saveGame.mines) {
    time.innerText = `${saveGame.time}s`;
    currentGame.time = saveGame.time;
    clicks.innerText = saveGame.clicks;
    currentGame.clicks = saveGame.clicks;
    mines.innerText = saveGame.mines;
    currentGame.mines = saveGame.mines;
    flags.innerText = saveGame.flags;
    currentGame.flags = saveGame.flags;
  } else {
    time.innerText = `${currentGame.time}s`;
    clicks.innerText = currentGame.clicks;
    mines.innerText = currentGame.mines;
    flags.innerText = currentGame.flags;
  }

  function updateTime() {
    currentGame.time++;
    time.innerText = `${currentGame.time}s`;
  }
  interval = setInterval(updateTime, 1000);

  const field = document.createElement('div');
  if (size == 10) field.className = 'field field10';
  if (size == 15) field.className = 'field field15';
  if (size == 25) field.className = 'field field25';
  gameField.append(field);

  const cellsCount = size * size;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children];

  let closedCount = cellsCount;
  let openedIndex = [];
  let openedFlags = saveGame.flagsOpen ?
    saveGame.flagsOpen :
    [];


  bombs = saveGame.bombs
    ? saveGame.bombs
    : [...Array(cellsCount).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, bombCount);

  let markCell = [];

  field.addEventListener('click', (event) => {
    const index = cells.indexOf(event.target);
    const row = Math.floor(index / size);
    const column = index % size;

    checkFirstMove();
    function checkFirstMove() {
      if (currentGame.clicks == 0 && isMine(row, column)) {
        bombs = [...Array(cellsCount).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, bombCount);
        checkFirstMove();
      }
    }

    if (!markCell.includes(index)) {
      currentGame.clicks++;
      open(row, column);
    }
    clicks.innerText = currentGame.clicks;
  });

  if (openedFlags) {
    openedFlags.forEach((item) => {
      if (!openedIndex.includes(item)) {
        cells[item].classList.add('cell-mark');
      }
    });
    markCell = openedFlags;
  }

  field.addEventListener('contextmenu', (event) => {
    const index = cells.indexOf(event.target);
    const cell = cells[index];
    if (markCell.includes(index)) {
      markCell.splice(markCell.indexOf(index), 1);
      saveGame.flagsOpen = markCell;
      cell.classList.remove('cell-mark');
      currentGame.flags++;
      flags.innerText = currentGame.flags;
      currentGame.mines++;
      mines.innerText = currentGame.mines;
      if (gameSettings.sound) {
        soundMark.play();
      }
    } else {
      if (!openedIndex.includes(index) && currentGame.flags > 0) {
        markCell.push(index);
        saveGame.flagsOpen = markCell;
        cell.classList.add('cell-mark');
        currentGame.flags--;
        flags.innerText = currentGame.flags;
        currentGame.mines--;
        mines.innerText = currentGame.mines;
        if (gameSettings.sound) {
          soundMark.play();
        }
      }
    }
  });

  if (saveGame.openCell) {
    saveGame.openCell.forEach((elem) => {
      const row = Math.floor(elem / size);
      const column = elem % size;
      open(row, column);
    });
  }

  function getCountItem(row, column) {
    let counter = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isMine(row + y, column + x)) {
          counter++;
        }
      }
    }
    return counter;
  }

  function isMine(row, column) {
    if (!isValid(row, column)) return false;
    const index = row * size + column;
    return bombs.includes(index);
  }

  function isValid(row, column) {
    return row >= 0
      && column >= 0
      && row < size
      && column < size;
  }

  function open(row, column) {
    if (!isValid(row, column)) return;

    const index = row * size + column;
    const cell = cells[index];

    if (cell.disabled) return;

    cell.disabled = true;
    closedCount--;
    openedIndex.push(index);

    saveGame.openCell = openedIndex;
    if (markCell.includes(index)) {
      markCell.splice(markCell.indexOf(index), 1);
      cell.classList.remove('cell-mark');
      currentGame.flags++;
      flags.innerText = currentGame.flags;
      currentGame.mines++;
      mines.innerText = currentGame.mines;
    }

    if (gameSettings.sound) {
      soundClick.play();
    }

    const count = getCountItem(row, column);

    if (isMine(row, column)) {
      bombs.forEach(index => {
        cells[index].className = 'cell-mine';
      });
      clearInterval(interval);
      safeScreen();
      if (gameSettings.sound) {
        soundLose.play();
      }
      setTimeout(() => {
        popupLose();
      }, 1500);
      return;
    }

    if (closedCount == bombCount) {
      if (count !== 0) {
        if (count == 1) cell.className = 'cell1';
        if (count == 2) cell.className = 'cell2';
        if (count == 3) cell.className = 'cell3';
        if (count == 4) cell.className = 'cell4';
        if (count == 5) cell.className = 'cell5';
        if (count == 6) cell.className = 'cell6';
        if (count == 7) cell.className = 'cell7';
        if (count == 8) cell.className = 'cell8';
        cell.innerHTML = count;
      }
      bombs.forEach(index => {
        cells[index].className = 'cell-mine';
      });
      clearInterval(interval);
      safeScreen();
      if (gameSettings.sound) {
        soundWin.play();
      }
      setTimeout(() => {
        popupWin();
      }, 1500);
      return;
    }

    if (count !== 0) {
      if (count == 1) cell.className = 'cell1';
      if (count == 2) cell.className = 'cell2';
      if (count == 3) cell.className = 'cell3';
      if (count == 4) cell.className = 'cell4';
      if (count == 5) cell.className = 'cell5';
      if (count == 6) cell.className = 'cell6';
      if (count == 7) cell.className = 'cell7';
      if (count == 8) cell.className = 'cell8';
      cell.innerHTML = count;
      return;
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        open(row + y, column + x);
      }
    }
  }

  function safeScreen() {
    const safeScreen = document.createElement('div');
    safeScreen.className = 'safe-screen';
    gameField.append(safeScreen);
  }
}

function popupLose() {
  const popupLoseWrapper = document.createElement('div');
  popupLoseWrapper.className = 'popupLose_wrapper';
  body.append(popupLoseWrapper);

  const popupLose = document.createElement('div');
  popupLose.className = 'popupLose';
  popupLoseWrapper.append(popupLose);

  const loseTitle = document.createElement('p');
  loseTitle.className = 'settings-title';
  loseTitle.innerText = 'You Lose!'
  popupLose.append(loseTitle);

  const tryAgainBtn = document.createElement('div');
  tryAgainBtn.className = 'btn-try-again';
  tryAgainBtn.innerText = 'Try Again';
  popupLose.append(tryAgainBtn);

  tryAgainBtn.addEventListener('click', () => {
    saveGame = {};
    localStorage.setItem('saveGame', JSON.stringify(saveGame));
    currentGame.time = 0;
    currentGame.clicks = 0;
    currentGame.mines = gameSettings.mines;
    currentGame.flags = gameSettings.mines;

    const field = document.querySelector('.field');
    field.remove();
    initGame(gameSettings.field, gameSettings.mines);
    popupLoseWrapper.remove();
  });

  const themeLose = [popupLose, tryAgainBtn]
  if (!gameSettings.theme) {
    themeLose.forEach((element) => element.classList.add('dark'));
  }

  popupLoseWrapper.addEventListener('click', (event) => {
    if (event.target == popupLoseWrapper)
      popupLoseWrapper.remove();
  });
}

function popupWin() {
  const popupWinWrapper = document.createElement('div');
  popupWinWrapper.className = 'popupWin_wrapper';
  body.append(popupWinWrapper);

  const popupWin = document.createElement('div');
  popupWin.className = 'popupWin';
  popupWinWrapper.append(popupWin);

  const winTitle = document.createElement('p');
  winTitle.className = 'settings-title';
  winTitle.innerText = 'You Win!'
  popupWin.append(winTitle);

  const youScore = document.createElement('p');
  youScore.className = 'your-score';
  youScore.innerText = `Your score: \n ${currentGame.time} seconds \nand\n ${currentGame.clicks} clicks.`
  popupWin.append(youScore);

  const scoreNameWrapper = document.createElement('div');
  scoreNameWrapper.className = 'score-name_wrapper';
  popupWin.append(scoreNameWrapper);

  const scoreNameLabel = document.createElement('label');
  scoreNameLabel.className = 'score-name-label';
  scoreNameLabel.innerText = 'Name: '
  scoreNameLabel.setAttribute('for', 'scoreName');
  scoreNameWrapper.append(scoreNameLabel);

  const scoreNameInput = document.createElement('input');
  scoreNameInput.className = 'score-name-input';
  scoreNameInput.type = 'text';
  scoreNameInput.id = 'scoreName';
  scoreNameInput.name = 'scoreName';
  scoreNameWrapper.append(scoreNameInput);

  const okBtn = document.createElement('div');
  okBtn.className = 'btn-try-again';
  okBtn.innerText = 'Save and Restart';
  popupWin.append(okBtn);

  okBtn.addEventListener('click', () => {
    if (scoreNameInput.value) {
      scoreObj[currentGame.time] = scoreNameInput.value;
    } else {
      scoreObj[currentGame.time] = 'noname'
    }
    localStorage.setItem('scoreObj', JSON.stringify(scoreObj));

    saveGame = {};
    localStorage.setItem('saveGame', JSON.stringify(saveGame));
    currentGame.time = 0;
    currentGame.clicks = 0;
    currentGame.mines = gameSettings.mines;
    currentGame.flags = gameSettings.mines;
    const field = document.querySelector('.field');
    field.remove();
    initGame(gameSettings.field, gameSettings.mines);
    popupWinWrapper.remove();
  });

  const themeWin = [popupWin, okBtn];
  if (!gameSettings.theme) {
    themeWin.forEach((element) => element.classList.add('dark'));
  }

  popupWinWrapper.addEventListener('click', () => {
    if (event.target == popupWinWrapper)
      popupWinWrapper.remove();
  });
}
