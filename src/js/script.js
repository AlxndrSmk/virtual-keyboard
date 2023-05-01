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
    this.keyboard.addEventListener('click', (el) => {
      this.textarea.focus();
      const keyDownEvent = new KeyboardEvent('keydown', {
        code: el.target.id,
      });
      document.dispatchEvent(keyDownEvent);

      this.textarea.focus();
      const keyUpEvent = new KeyboardEvent('keyup', {
        code: el.target.id,
      });
      document.dispatchEvent(keyUpEvent);
    });

    document.addEventListener('keydown', (el) => {
      el.stopImmediatePropagation();
      this.textarea.focus();

      const key = document.getElementById(el.code);

      if (!key) {
        el.preventDefault();
        return;
      }

      switch (el.code) {
        case 'CapsLock': {
          el.preventDefault();
          this.capsLock = !this.capsLock;

          const option = this.capsLock ? 'add' : 'remove';
          key.classList[option]('selected');
          key.classList[option]('selected');

          this.changeLettersKeys(el.shiftKey);
          break;
        }

        default:
          key.classList.add('selected');

          if (el.ctrlKey && el.altKey) {
            el.preventDefault();
            this.setLang();
            this.currentLanguage(this.lang, el.shiftKey);
          } else if (!keysPattern[el.code].isFunctional) {
            el.preventDefault();
            this.addContent(key.textContent);
          } else if (el.key === 'Shift') {
            el.preventDefault();
            this.changeLettersKeys(el.shiftKey);
          } else if (el.code === 'Tab') {
            el.preventDefault();
            this.addContent('    ');
          } else if (el.code === 'ArrowLeft') {
            el.preventDefault();
            this.addContent('◂');
          } else if (el.code === 'ArrowRight') {
            el.preventDefault();
            this.addContent('▸');
          } else if (el.code === 'ArrowUp') {
            el.preventDefault();
            this.addContent('▴');
          } else if (el.code === 'ArrowDown') {
            el.preventDefault();
            this.addContent('▾');
          } else if (el.code === 'Backspace') {
            el.preventDefault();
            this.clickBackspace();
          } else if (el.code === 'Enter') {
            el.preventDefault();
            this.addContent('\n');
          }
      }
    });

    document.addEventListener('keyup', (el) => {
      el.stopImmediatePropagation();

      const key = document.getElementById(el.code);

      if (el.code !== 'CapsLock') key.classList.remove('selected');
      if (el.key === 'Shift') {
        el.preventDefault();
        this.changeLettersKeys(el.shiftKey);
      }
    });
  }

  clickBackspace() {
    let start = this.textarea.selectionStart;
    let end = this.textarea.selectionEnd;

    if (start !== end) {
      this.addContent('');
    } else {
      const cursorLocation = Math.max(0, start - 1);

      this.textarea.value = this.textarea.value.slice(0, cursorLocation)
        + this.textarea.value.slice(end);

      start = cursorLocation;
      end = start;
    }
  }

  addContent(symbol) {
    let start = this.textarea.selectionStart;
    let end = this.textarea.selectionEnd;

    const cursorLocation = start;
    this.textarea.value = this.textarea.value.slice(0, cursorLocation)
      + symbol
      + this.textarea.value.slice(end);

    start = cursorLocation + symbol.length;
    end = start;
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
