import { fragment, keysPattern } from './components/keyboardRows.js';
import icon from './components/icon.js';

class Keyboard {
  constructor() {
    this.capsLock = false;
    this.lang = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
    this.interval = null;
  }

  setLang() {
    this.lang = this.lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', this.lang);
  }

  getLang() {
    return localStorage.getItem('lang', this.lang || 'en');
  }

  init() {
    this.title = document.createElement('h1');
    this.title.classList.add('title');
    this.title.innerText = 'RSS Виртуальная клавиатура';

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.autofocus = true;

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');

    this.description = document.createElement('p');
    this.description.classList.add('description');
    this.description.innerText = 'Клавиатура создана в операционной системе MacOS';

    this.langParagraph = document.createElement('p');
    this.langParagraph.classList.add('description');
    this.langParagraph.innerText = 'Для переключения языка: левыe ctrl + alt (Win), левые control + option (Mac)';

    this.keyboard.append(fragment);
    this.currentLanguage(this.lang);

    document.title = 'Virtual Keyboard || Alexander Samak';
    document.head.append(icon);

    document.body.append(this.title);
    document.body.append(this.textarea);
    document.body.append(this.keyboard);
    document.body.append(this.description);
    document.body.append(this.langParagraph);

    this.addListeners();
  }

  addListeners() {
    this.keyboard.addEventListener('mousedown', (event) => {
      if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
        this.changeLettersKeys(!event.shiftKey);
      } else if (event.target.id === 'Backspace') {
        event.preventDefault();
        this.clickBackspace();
        this.interval = setInterval(() => {
          this.clickBackspace();
        }, 150);
      } else if (event.target.id === 'Space') {
        event.preventDefault();
        this.interval = setInterval(() => {
          this.addContent(' ');
        }, 150);
      }
    });

    this.keyboard.addEventListener('mouseup', (event) => {
      clearInterval(this.interval);
      if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
        this.changeLettersKeys(event.shiftKey);
      }
    });

    this.keyboard.addEventListener('click', (event) => {
      this.textarea.focus();
      const keyDownEvent = new KeyboardEvent('keydown', {
        code: event.target.id,
      });
      document.dispatchEvent(keyDownEvent);

      this.textarea.focus();
      const keyUpEvent = new KeyboardEvent('keyup', {
        code: event.target.id,
      });
      document.dispatchEvent(keyUpEvent);
    });

    document.addEventListener('keydown', (event) => {
      event.stopImmediatePropagation();
      this.textarea.focus();

      const key = document.getElementById(event.code);

      if (!key) {
        event.preventDefault();
        return;
      }

      switch (event.code) {
        case 'CapsLock': {
          event.preventDefault();
          this.capsLock = !this.capsLock;

          const option = this.capsLock ? 'add' : 'remove';
          key.classList[option]('selected');
          key.classList[option]('selected');

          this.changeLettersKeys(event.shiftKey);
          break;
        }

        default:
          key.classList.add('selected');

          if (event.ctrlKey && event.altKey) {
            event.preventDefault();
            this.setLang();
            this.currentLanguage(this.lang, event.shiftKey);
          } else if (!keysPattern[event.code].isFunctional) {
            event.preventDefault();
            this.addContent(key.textContent);
          } else if (event.key === 'Shift') {
            event.preventDefault();
            this.changeLettersKeys(event.shiftKey);
          } else if (event.code === 'Tab') {
            event.preventDefault();
            this.addContent('    ');
          } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            this.addContent('◂');
          } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            this.addContent('▸');
          } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            this.addContent('▴');
          } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            this.addContent('▾');
          } else if (event.code === 'Enter') {
            event.preventDefault();
            this.addContent('\n');
          }
      }
    });

    document.addEventListener('keyup', (event) => {
      event.stopImmediatePropagation();

      const key = document.getElementById(event.code);

      if (event.code !== 'CapsLock' && event.code !== 'F12') key.classList.remove('selected');
      if (event.key === 'Shift') {
        event.preventDefault();
        this.changeLettersKeys(event.shiftKey);
      }
    });
  }

  clickBackspace() {
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.addContent('');
    } else {
      const cursorLocation = Math.max(0, this.textarea.selectionStart - 1);

      this.textarea.value = this.textarea.value.slice(0, cursorLocation)
        + this.textarea.value.slice(this.textarea.selectionEnd);

      this.textarea.selectionStart = cursorLocation;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    }
  }

  addContent(symbol) {
    const cursorLocation = this.textarea.selectionStart;
    this.textarea.value = this.textarea.value.slice(0, cursorLocation)
      + symbol
      + this.textarea.value.slice(this.textarea.selectionEnd);

    this.textarea.selectionStart = cursorLocation + symbol.length;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  currentLanguage(lang, shiftKey = false) {
    Array.from(this.keyboard.querySelectorAll('.btn')).forEach((el) => {
      const e = el;

      e.textContent = keysPattern[e.id][lang];
    });

    this.changeLettersKeys(shiftKey);
  }

  changeLettersKeys(shiftKey) {
    const upperCase = (this.capsLock && !shiftKey) || (!this.capsLock && shiftKey);
    const switchCase = upperCase ? 'toUpperCase' : 'toLowerCase';

    Array.from(this.keyboard.querySelectorAll('.btn')).forEach((el) => {
      const e = el;

      if (!keysPattern[e.id].isFunctional) {
        if (e.id === 'Backquote' && this.lang === 'en') {
          e.textContent = shiftKey ? '~' : '`';
        } else if (e.id === 'Backquote' && this.lang === 'ru') {
          e.textContent = shiftKey ? '[' : ']';
        } else if (e.id === 'Digit1') {
          e.textContent = shiftKey ? '!' : '1';
        } else if (e.id === 'Digit2' && this.lang === 'en') {
          e.textContent = shiftKey ? '@' : '2';
        } else if (e.id === 'Digit2' && this.lang === 'ru') {
          e.textContent = shiftKey ? '"' : '2';
        } else if (e.id === 'Digit3' && this.lang === 'en') {
          e.textContent = shiftKey ? '#' : '3';
        } else if (e.id === 'Digit3' && this.lang === 'ru') {
          e.textContent = shiftKey ? '№' : '3';
        } else if (e.id === 'Digit4' && this.lang === 'en') {
          e.textContent = shiftKey ? '$' : '4';
        } else if (e.id === 'Digit4' && this.lang === 'ru') {
          e.textContent = shiftKey ? '%' : '4';
        } else if (e.id === 'Digit5' && this.lang === 'en') {
          e.textContent = shiftKey ? '%' : '5';
        } else if (e.id === 'Digit5' && this.lang === 'ru') {
          e.textContent = shiftKey ? ':' : '5';
        } else if (e.id === 'Digit6' && this.lang === 'en') {
          e.textContent = shiftKey ? '^' : '6';
        } else if (e.id === 'Digit6' && this.lang === 'ru') {
          e.textContent = shiftKey ? ',' : '6';
        } else if (e.id === 'Digit7' && this.lang === 'en') {
          e.textContent = shiftKey ? '&' : '7';
        } else if (e.id === 'Digit7' && this.lang === 'ru') {
          e.textContent = shiftKey ? '.' : '7';
        } else if (e.id === 'Digit8' && this.lang === 'en') {
          e.textContent = shiftKey ? '*' : '8';
        } else if (e.id === 'Digit8' && this.lang === 'ru') {
          e.textContent = shiftKey ? ';' : '8';
        } else if (e.id === 'Digit9') {
          e.textContent = shiftKey ? '(' : '9';
        } else if (e.id === 'Digit0') {
          e.textContent = shiftKey ? ')' : '0';
        } else if (e.id === 'Minus') {
          e.textContent = shiftKey ? '_' : '-';
        } else if (e.id === 'Equal') {
          e.textContent = shiftKey ? '+' : '=';
        } else if (e.id === 'BracketLeft' && this.lang === 'en') {
          e.textContent = shiftKey ? '{' : '[';
        } else if (e.id === 'BracketRight' && this.lang === 'en') {
          e.textContent = shiftKey ? '}' : ']';
        } else if (e.id === 'Backslash' && this.lang === 'en') {
          e.textContent = shiftKey ? '|' : '\\';
        } else if (e.id === 'Semicolon' && this.lang === 'en') {
          e.textContent = shiftKey ? ':' : ';';
        } else if (e.id === 'Quote' && this.lang === 'en') {
          e.textContent = shiftKey ? '"' : "'";
        } else if (e.id === 'Comma' && this.lang === 'en') {
          e.textContent = shiftKey ? '<' : ',';
        } else if (e.id === 'Period' && this.lang === 'en') {
          e.textContent = shiftKey ? '>' : '.';
        } else if (e.id === 'Slash') {
          e.textContent = shiftKey ? '?' : '/';
        } else {
          e.textContent = e.textContent[switchCase]();
        }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.getLang();
  keyboard.init();
});
