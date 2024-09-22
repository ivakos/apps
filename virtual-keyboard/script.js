let currentLocal = localStorage.getItem('currentLocal')
  ? localStorage.getItem('currentLocal')
  : 'en';

const domLayout = [];
let capsLock = false;

let positionCursor = 0;

const functionalKeys = [9, 8, 46, 13, 17, 91, 16, 20, 18, 32];

function createKey(keyCode, enValue, enSymbol, ruValue, ruSymbol) {
  return {
    code: keyCode,
    en: enValue,
    enSymbol,
    ru: ruValue,
    ruSymbol,
  };
}

const layout = [
  [createKey(192, '`', '~', 'ё', 'Ё'), createKey(49, 1, '!', 1, '!'), createKey(50, 2, '@', 2, '@'), createKey(51, 3, '#', 3, '#'), createKey(52, 4, '$', 4, '$'), createKey(53, 5, '%', 5, '%'), createKey(54, 6, '^', 6, '^'), createKey(55, 7, '&', 7, '&'), createKey(56, 8, '*', 8, '*'), createKey(57, 9, '(', 9, '('), createKey(48, 0, ')', 0, ')'), createKey(189, '-', '_', '-', '_'), createKey(187, '=', '+', '=', '+'), createKey(8, 'Backspace', 'Backspace', 'Backspace', 'Backspace')],
  [createKey(9, 'Tab', 'Tab', 'Tab', 'Tab'), createKey(81, 'q', 'Q', 'й', 'Й'), createKey(87, 'w', 'W', 'ц', 'Ц'), createKey(69, 'e', 'E', 'у', 'У'), createKey(82, 'r', 'R', 'к', 'К'), createKey(84, 't', 'T', 'е', 'Е'), createKey(89, 'y', 'Y', 'н', 'Н'), createKey(85, 'u', 'U', 'г', 'Г'), createKey(73, 'i', 'I', 'ш', 'Ш'), createKey(79, 'o', 'O', 'щ', 'Щ'), createKey(80, 'p', 'P', 'з', 'З'), createKey(219, '[', '{', 'х', 'Х'), createKey(221, ']', '}', 'ъ', 'Ъ'), createKey(220, '\\', '|', '\\', '/'), createKey(46, 'del', 'del', 'del', 'del')],
  [createKey(20, 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock'), createKey(65, 'a', 'A', 'ф', 'Ф'), createKey(83, 's', 'S', 'ы', 'Ы'), createKey(68, 'd', 'D', 'в', 'В'), createKey(70, 'f', 'F', 'а', 'А'), createKey(71, 'g', 'G', 'п', 'П'), createKey(72, 'h', 'H', 'р', 'Р'), createKey(74, 'j', 'J', 'о', 'О'), createKey(75, 'k', 'K', 'л', 'Л'), createKey(76, 'l', 'L', 'д', 'Д'), createKey(186, ';', ':', 'ж', 'Ж'), createKey(222, "'", '"', 'э', 'Э'), createKey(13, 'Enter', 'Enter', 'Enter', 'Enter')],
  [createKey(16, 'Shift', 'Shift', 'Shift', 'Shift'), createKey(90, 'z', 'Z', 'я', 'Я'), createKey(88, 'x', 'X', 'ч', 'Ч'), createKey(67, 'c', 'C', 'с', 'С'), createKey(86, 'v', 'V', 'м', 'М'), createKey(66, 'b', 'B', 'и', 'И'), createKey(78, 'n', 'N', 'т', 'Т'), createKey(77, 'm', 'M', 'ь', 'Ь'), createKey(188, ',', '<', 'б', 'Б'), createKey(190, '.', '>', 'ю', 'Ю'), createKey(191, '/', '?', '.', ','), createKey(16, 'Shift', 'Shift', 'Shift', 'Shift'), createKey(38, '↑', '↑', '↑', '↑')],
  [createKey(17, 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'), createKey(91, 'Win', 'Win', 'Win', 'Win'), createKey(18, 'Alt', 'Alt', 'Alt', 'Alt'), createKey(32, ' ', ' ', ' ', ' '), createKey(18, 'Alt', 'Alt', 'Alt', 'Alt'), createKey(17, 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'), createKey(37, '←', '←', '←', '←'), createKey(40, '↓', '↓', '↓', '↓'), createKey(39, '→', '→', '→', '→')],
];

const { body } = document;
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
body.append(wrapper);

const textAreaField = document.createElement('textarea');
textAreaField.className = 'textAreaField';
textAreaField.setAttribute('autofocus', 'autofocus');
wrapper.append(textAreaField);

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
wrapper.append(keyboard);

for (let i = 0; i < layout.length; i += 1) {
  domLayout[i] = [];
  const row = document.createElement('div');
  row.className = 'row';
  keyboard.append(row);

  for (let k = 0; k < layout[i].length; k += 1) {
    const key = document.createElement('div');
    const letter = layout[i][k];
    key.className = 'key';
    key.innerHTML = letter[currentLocal];
    key.id = letter.code;

    if ((i === 0 && (k === 0 || k === 13))
      || (i === 1 && (k === 0 || k === 14))
      || (i === 2 && (k === 0 || k === 12))
      || (i === 3 && (k === 0 || k === 11 || k === 12))
      || (i === 4 && (k !== 3))) {
      key.classList.add('key-special');
    }
    row.append(key);
    domLayout[i][k] = key;
  }
}

// --переделать--
domLayout[0][13].classList.add('backspace');

domLayout[1][0].classList.add('tab');
domLayout[1][14].classList.add('delete');

domLayout[2][0].classList.add('caps-lock');
domLayout[2][12].classList.add('enter');

domLayout[3][0].classList.add('shift');

domLayout[4][0].classList.add('ctrl');
domLayout[4][3].classList.add('space');
domLayout[4][5].classList.add('ctrl');

const description = document.createElement('div');
description.className = 'description';
description.innerHTML = 'Keyboard was created for Windows. <br>Ctrl + Alt to switch language.';
wrapper.append(description);

// ----------------------------- SWITCH THEME
const switchTheme = document.createElement('div');
switchTheme.className = 'switch-theme';
wrapper.append(switchTheme);

const keys = document.querySelectorAll('.key');

const lightTheme = [body, textAreaField, keyboard, description];
switchTheme.addEventListener('click', () => {
  switchTheme.classList.toggle('active');
  lightTheme.forEach((element) => element.classList.toggle('dark'));
});
// -----------------------------END SWITCH THEME

const textArea = document.getElementsByClassName('textAreaField')[0];

textArea.addEventListener('keydown', (event) => {
  event.preventDefault();
});

textArea.addEventListener('click', () => {
  positionCursor = textArea.selectionStart;
});

keys.forEach((element) => {
  element.addEventListener('click', (event) => {
    const key = +event.target.id;

    if (!functionalKeys.includes(key)) {
      let array = textArea.value.split('');
      array.splice(positionCursor, 0, event.target.innerText);
      array = array.join('');
      textArea.value = array;
      positionCursor += 1;
      textArea.setSelectionRange(positionCursor, positionCursor);
    }

    // SHIFT
    if (key === 16) {
      let localLang;
      for (let i = 0; i < layout.length; i += 1) {
        for (let k = 0; k < layout[i].length; k += 1) {
          const letter = layout[i][k];

          if (!capsLock) {
            switch (currentLocal) {
              case 'en': localLang = 'enSymbol'; break;
              case 'enSymbol': localLang = 'en'; break;
              case 'ru': localLang = 'ruSymbol'; break;
              case 'ruSymbol': localLang = 'ru'; break;
              default: break;
            }
            domLayout[i][k].innerHTML = letter[localLang];
          } else {
            if (currentLocal === 'en') {
              if (letter.enSymbol.toLowerCase() !== letter.en) {
                domLayout[i][k].innerHTML = letter.enSymbol;
              } else {
                domLayout[i][k].innerHTML = letter.en;
              }
            }

            if (currentLocal === 'ru') {
              if (letter.ruSymbol.toLowerCase() !== letter.ru) {
                domLayout[i][k].innerHTML = letter.ruSymbol;
              } else {
                domLayout[i][k].innerHTML = letter.ru;
              }
            }

            if (currentLocal === 'enSymbol') {
              if (letter.ruSymbol.toLowerCase() !== letter.ru) {
                domLayout[i][k].innerHTML = letter.enSymbol;
              } else {
                domLayout[i][k].innerHTML = letter.enSymbol;
              }
            }

            if (currentLocal === 'ruSymbol') {
              if (letter.ruSymbol.toLowerCase() !== letter.ru) {
                domLayout[i][k].innerHTML = letter.ru;
              } else {
                domLayout[i][k].innerHTML = letter.ruSymbol;
              }
            }
          }
        }
      }

      switch (currentLocal) {
        case 'en': currentLocal = 'enSymbol'; break;
        case 'enSymbol': currentLocal = 'en'; break;
        case 'ru': currentLocal = 'ruSymbol'; break;
        case 'ruSymbol': currentLocal = 'ru'; break;
        default: break;
      }
    }

    // CAPS LOCK
    if (key === 20) {
      if (!capsLock) { event.target.classList.add('click'); } else { event.target.classList.remove('click'); }

      for (let i = 0; i < layout.length; i += 1) {
        for (let k = 0; k < layout[i].length; k += 1) {
          const letter = layout[i][k];

          if (!functionalKeys.includes(letter.code)) {
            if (!capsLock) {
              domLayout[i][k].innerHTML = domLayout[i][k].innerHTML.toUpperCase();
            } else {
              domLayout[i][k].innerHTML = domLayout[i][k].innerHTML.toLowerCase();
            }
          }
        }
      }
      capsLock = !capsLock;
    }

    // TAB
    if (key === 9) {
      let array = textArea.value.split('');
      array.splice(textArea.selectionStart, 0, '  ');
      array = array.join('');
      textArea.value = array;
      positionCursor += 2;
      textArea.setSelectionRange(positionCursor, positionCursor);
    }

    // BackSpace
    if (key === 8) {
      if (positionCursor !== 0) {
        let array = textArea.value.split('');
        array.splice(positionCursor - 1, 1);
        array = array.join('');
        textArea.value = array;
        positionCursor -= 1;
        textArea.setSelectionRange(positionCursor, positionCursor);
      }
    }

    // Delete
    if (key === 46) {
      if (positionCursor !== textArea.value.length) {
        let array = textArea.value.split('');
        array.splice(positionCursor, 1);
        array = array.join('');
        textArea.value = array;
        textArea.setSelectionRange(positionCursor, positionCursor);
      }
    }

    // ENTER
    if (key === 13) {
      let array = textArea.value.split('');
      array.splice(positionCursor, 0, '\n');
      array = array.join('');
      textArea.value = array;
      positionCursor += 1;
      textArea.setSelectionRange(positionCursor, positionCursor);
    }

    // SPACE
    if (key === 32) {
      let array = textArea.value.split('');
      array.splice(positionCursor, 0, ' ');
      array = array.join('');
      textArea.value = array;
      positionCursor += 1;
      textArea.setSelectionRange(positionCursor, positionCursor);
    }

    textArea.focus();
  });
});

window.addEventListener('keydown', (event) => {
  const key = document.getElementById(event.keyCode);

  if (key && ![16, 17, 18, 20].includes(event.keyCode)) {
    key.classList.add('click');
  }

  switch (event.code) {
    case 'ShiftLeft': domLayout[3][0].classList.add('click'); break;
    case 'ShiftRight': domLayout[3][11].classList.add('click'); break;
    case 'ControlLeft': domLayout[4][0].classList.add('click'); break;
    case 'ControlRight': domLayout[4][5].classList.add('click'); break;
    case 'AltLeft': domLayout[4][2].classList.add('click'); break;
    case 'AltRight': domLayout[4][4].classList.add('click'); break;
    default: break;
  }

  if (!functionalKeys.includes(event.keyCode) && document.getElementById(event.keyCode)) {
    let array = textArea.value.split('');
    array.splice(positionCursor, 0, key.innerText);
    array = array.join('');
    textArea.value = array;
    positionCursor += 1;
    textArea.setSelectionRange(positionCursor, positionCursor);
  }

  // SHIFT
  if (event.keyCode === 16) {
    for (let i = 0; i < layout.length; i += 1) {
      for (let k = 0; k < layout[i].length; k += 1) {
        const letter = layout[i][k];
        if (!capsLock) {
          if (currentLocal === 'en') { domLayout[i][k].innerHTML = letter.enSymbol; }
          if (currentLocal === 'ru') { domLayout[i][k].innerHTML = letter.ruSymbol; }
        } else {
          if (currentLocal === 'en') {
            if (letter.enSymbol.toLowerCase() !== letter.en) {
              domLayout[i][k].innerHTML = letter.enSymbol;
            } else {
              domLayout[i][k].innerHTML = letter.en;
            }
          }

          if (currentLocal === 'ru') {
            if (letter.ruSymbol.toLowerCase() !== letter.ru) {
              domLayout[i][k].innerHTML = letter.ruSymbol;
            } else {
              domLayout[i][k].innerHTML = letter.ru;
            }
          }
        }
      }
    }
  }

  // CAPS LOCK
  if (event.keyCode === 20) {
    if (!capsLock) { key.classList.add('click'); } else { key.classList.remove('click'); }

    const localCapsLock = !capsLock;
    for (let i = 0; i < layout.length; i += 1) {
      for (let k = 0; k < layout[i].length; k += 1) {
        const letter = layout[i][k];
        if (!functionalKeys.includes(letter.code)) {
          if (!localCapsLock) {
            domLayout[i][k].innerHTML = domLayout[i][k].innerHTML.toLowerCase();
          } else {
            domLayout[i][k].innerHTML = domLayout[i][k].innerHTML.toUpperCase();
          }
        }
      }
    }
  }

  if (event.keyCode === 18) {
    this.returnValue = false;
  }

  // TAB
  if (event.keyCode === 9) {
    let array = textArea.value.split('');
    array.splice(event.target.selectionStart, 0, '  ');
    array = array.join('');
    textArea.value = array;
    positionCursor += 2;
    textArea.setSelectionRange(positionCursor, positionCursor);
  }

  // BackSpace
  if (event.keyCode === 8 && positionCursor !== 0) {
    let array = textArea.value.split('');
    array.splice(positionCursor - 1, 1);
    array = array.join('');
    textArea.value = array;
    positionCursor -= 1;
    textArea.setSelectionRange(positionCursor, positionCursor);
  }

  // Delete
  if (event.keyCode === 46 && positionCursor !== textArea.value.length) {
    let array = textArea.value.split('');
    array.splice(positionCursor, 1);
    array = array.join('');
    textArea.value = array;
    textArea.setSelectionRange(positionCursor, positionCursor);
  }

  // ENTER
  if (event.keyCode === 13) {
    let array = textArea.value.split('');
    array.splice(positionCursor, 0, '\n');
    array = array.join('');
    textArea.value = array;
    positionCursor += 1;
    textArea.setSelectionRange(positionCursor, positionCursor);
  }

  // SPACE
  if (event.keyCode === 32) {
    let array = textArea.value.split('');
    array.splice(positionCursor, 0, ' ');
    array = array.join('');
    textArea.value = array;
    positionCursor += 1;
    textArea.setSelectionRange(positionCursor, positionCursor);
  }
});

window.addEventListener('keyup', (event) => {
  setTimeout(() => {
    const key = document.getElementById(event.keyCode);

    if (key && ![16, 20].includes(event.keyCode)) {
      key.classList.remove('click');
    }

    switch (event.code) {
      case 'ShiftLeft': domLayout[3][0].classList.remove('click'); break;
      case 'ShiftRight': domLayout[3][11].classList.remove('click'); break;
      case 'ControlLeft': domLayout[4][0].classList.remove('click'); break;
      case 'ControlRight': domLayout[4][5].classList.remove('click'); break;
      case 'AltLeft': domLayout[4][2].classList.remove('click'); break;
      case 'AltRight': domLayout[4][4].classList.remove('click'); break;
      default: break;
    }
  }, 100);

  // SHIFT
  if (event.keyCode === 16) {
    for (let i = 0; i < layout.length; i += 1) {
      for (let k = 0; k < layout[i].length; k += 1) {
        const letter = layout[i][k];
        if (!capsLock) {
          if (currentLocal === 'en') { domLayout[i][k].innerHTML = letter.en; }
          if (currentLocal === 'ru') { domLayout[i][k].innerHTML = letter.ru; }
        } else {
          if (currentLocal === 'en') {
            if (letter.enSymbol.toLowerCase() !== letter.en) {
              domLayout[i][k].innerHTML = letter.en;
            } else {
              domLayout[i][k].innerHTML = letter.enSymbol;
            }
          }

          if (currentLocal === 'ru') {
            if (letter.ruSymbol.toLowerCase() !== letter.ru) {
              domLayout[i][k].innerHTML = letter.ru;
            } else {
              domLayout[i][k].innerHTML = letter.ruSymbol;
            }
          }
        }
      }
    }
  }

  // SWITCH LANGUAGE
  if (event.keyCode === 18 && event.ctrlKey === true) {
    currentLocal = currentLocal === 'en' ? 'ru' : 'en';
    for (let i = 0; i < layout.length; i += 1) {
      for (let k = 0; k < layout[i].length; k += 1) {
        const letter = layout[i][k];

        if (!capsLock) {
          if (currentLocal === 'en') {
            domLayout[i][k].innerHTML = letter.en;
          }

          if (currentLocal === 'ru') {
            domLayout[i][k].innerHTML = letter.ru;
          }
        } else {
          if (currentLocal === 'en') {
            if (letter.enSymbol.toLowerCase() !== letter.en) {
              domLayout[i][k].innerHTML = letter.en;
            } else {
              domLayout[i][k].innerHTML = letter.enSymbol;
            }
          }

          if (currentLocal === 'ru') {
            if (letter.ruSymbol.toLowerCase() !== letter.ru) {
              domLayout[i][k].innerHTML = letter.ru;
            } else {
              domLayout[i][k].innerHTML = letter.ruSymbol;
            }
          }
        }
      }
    }
    localStorage.setItem('currentLocal', currentLocal);
  }

  if (event.keyCode === 17 && event.altKey === true) {
    currentLocal = currentLocal === 'en' ? 'ru' : 'en';
    for (let i = 0; i < layout.length; i += 1) {
      for (let k = 0; k < layout[i].length; k += 1) {
        const letter = layout[i][k];
        if (!capsLock) {
          if (currentLocal === 'en') {
            domLayout[i][k].innerHTML = letter.en;
          }

          if (currentLocal === 'ru') {
            domLayout[i][k].innerHTML = letter.ru;
          }
        } else {
          if (currentLocal === 'en') {
            if (letter.enSymbol.toLowerCase() !== letter.en) {
              domLayout[i][k].innerHTML = letter.en;
            } else {
              domLayout[i][k].innerHTML = letter.enSymbol;
            }
          }

          if (currentLocal === 'ru') {
            if (letter.ruSymbol.toLowerCase() !== letter.ru) {
              domLayout[i][k].innerHTML = letter.ru;
            } else {
              domLayout[i][k].innerHTML = letter.ruSymbol;
            }
          }
        }
      }
    }
    localStorage.setItem('currentLocal', currentLocal);
  }

  // CAPS LOCK
  if (event.keyCode === 20) {
    capsLock = !capsLock;
    for (let i = 0; i < layout.length; i += 1) {
      for (let k = 0; k < layout[i].length; k += 1) {
        const letter = layout[i][k];
        if (!functionalKeys.includes(letter.code)) {
          if (capsLock) {
            domLayout[i][k].innerHTML = domLayout[i][k].innerHTML.toUpperCase();
          } else {
            domLayout[i][k].innerHTML = domLayout[i][k].innerHTML.toLowerCase();
          }
        }
      }
    }
  }
});
