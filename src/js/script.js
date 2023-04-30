import { fragment, keysPattern } from './components/keyboardRows.js';

class Keyboard {
  constructor() {
    this.capsLock = false;
    this.lang = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
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
    this.langParagraph.innerText = 'Для переключения языка: левыe ctrl + alt (Windows), левые control + option (MacOS)';

    this.keyboard.append(fragment);
    this.currentLanguage(this.lang);

    document.body.append(this.title);
    document.body.append(this.textarea);
    document.body.append(this.keyboard);
    document.body.append(this.description);
    document.body.append(this.langParagraph);

    this.addListeners();
  }

  addListeners() {
    this.textarea.addEventListener('blur', () => {
      setTimeout(() => {
        this.textarea.focus();
      }, 0);

      this.keyboard.addEventListener('click', (el) => {
        this.textarea.focus();
        const keyDownEvent = new Event('keydown', {
          bubbles: true,
          cancelable: true,
          code: el.target.id,
          view: window,
        });
        document.dispatchEvent(keyDownEvent);

        this.textarea.focus();
        const keyUpEvent = new Event('keyup', {
          bubbles: true,
          cancelable: true,
          code: el.target.id,
          view: window,
        });
        document.dispatchEvent(keyUpEvent);
      });
    });

    document.addEventListener('keydown', (el) => {
      el.stopImmediatePropagation();

      const key = document.getElementById(el.code);
      key.classList.add('selected');

      if (el.ctrlKey && el.altKey) {
        el.preventDefault();
        this.setLang();
        this.currentLanguage(this.lang, el.shiftKey);
      } else if (!keysPattern[el.code].isFunctional) {
        el.preventDefault();
        this.addContent(key.textContent);
      }

      switch (el.code) {
        case 'CapsLock': {
          this.capsLock = !this.capsLock;

          const option = this.capsLock ? 'add' : 'remove';
          key.classList[option]('selected');
          key.classList[option]('selected');

          this.changeLettersKeys(el.shiftKey);
          break;
        }

        case 'ShiftLeft':
          el.preventDefault();
          this.changeLettersKeys(el.shiftKey);
          break;

        case 'ShiftRight':
          el.preventDefault();
          this.changeLettersKeys(el.shiftKey);
          break;

        case 'Tab':
          el.preventDefault();
          this.addContent('    ');
          break;

        case 'ArrowLeft':
          el.preventDefault();
          this.addContent('◂');
          break;

        case 'ArrowRight':
          el.preventDefault();
          this.addContent('▸');
          break;

        case 'ArrowUp':
          el.preventDefault();
          this.addContent('▴');
          break;

        case 'ArrowDown':
          el.preventDefault();
          this.addContent('▾');
          break;

        default:
      }
    });

    document.addEventListener('keyup', (el) => {
      el.stopImmediatePropagation();

      const key = document.getElementById(el.code);

      if (el.code !== 'CapsLock') key.classList.remove('selected');
      if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') {
        el.preventDefault();
        this.changeLettersKeys(el.shiftKey);
      }
    });
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
