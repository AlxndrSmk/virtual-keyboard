import { fragment, keysPattern } from './components/keyboardRows.js';

class Keyboard {
  constructor() {
    this.capsLock = false;
    this.language = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
  }

  init() {
    this.title = document.createElement('h1');
    this.textarea = document.createElement('textarea');
    this.keyboard = document.createElement('div');
    this.description = document.createElement('p');
    this.language = document.createElement('p');

    this.currentLanguage(this.language);

    this.title.innerText = 'RSS Виртуальная клавиатура';
    this.description.innerText = 'Клавиатура создана в операционной системе MacOS';
    this.language.innerText = 'Для переключения языка: левыe ctrl + alt (Windows), левые control + option (MacOS)';

    this.textarea.autofocus = true;
    this.title.classList.add('title');
    this.textarea.classList.add('textarea');
    this.keyboard.classList.add('keyboard');
    this.description.classList.add('description');
    this.language.classList.add('description');

    this.keyboard.append(fragment);

    document.body.append(this.title);
    document.body.append(this.textarea);
    document.body.append(this.keyboard);
    document.body.append(this.description);
    document.body.append(this.language);

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
        this.language = this.language === 'ru' ? 'en' : 'ru';
        localStorage.setItem('language', this.language);
        this.currentLanguage(this.language);
      }

      switch (el.code) {
        case 'CapsLock': {
          this.capsLock = !this.capsLock;

          const option = this.capsLock ? 'add' : 'remove';
          key.classList[option]('selected');
          key.classList[option]('selected');

          this.changeLettersKeys(el.upperKey);
          break;
        }

        case 'Tab':
          el.preventDefault();
          this.pasteText('    ');
          break;

        case 'ArrowLeft':
          el.preventDefault();
          this.pasteText('◂');
          break;

        case 'ArrowRight':
          el.preventDefault();
          this.pasteText('▸');
          break;

        case 'ArrowUp':
          el.preventDefault();
          this.pasteText('▴');
          break;

        case 'ArrowDown':
          el.preventDefault();
          this.pasteText('▾');
          break;

        default:
      }
    });

    document.addEventListener('keyup', (el) => {
      el.stopImmediatePropagation();

      const key = document.getElementById(el.code);

      if (el.code !== 'CapsLock') key.classList.remove('selected');
    });
  }

  pasteText(text) {
    const cursorLocation = this.textarea.selectionStart;
    this.textarea.value = this.textarea.value.slice(0, cursorLocation)
      + text
      + this.textarea.value.slice(this.textarea.selectionEnd);

    this.textarea.selectionStart = cursorLocation + text.length;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  currentLanguage(language) {
    Array.from(this.keyboard.querySelectorAll('.btn')).forEach((el) => {
      const e = el;

      e.textContent = keysPattern[e.id][language];
    });
  }

  changeLettersKeys(upperKey) {
    const upperCase = (this.capsLock && !upperKey) || (!this.capsLock && upperKey);
    const switchCase = upperCase ? 'toUpperCase' : 'toLowerCase';

    Array.from(this.keyboard.querySelectorAll('.btn')).forEach((el) => {
      const e = el;

      if (!keysPattern[el.id].isFunctional) {
        if (el.id === 'Backquote' && this.language === 'en') {
          e.textContent = upperKey ? '~' : '`';
        } else {
          e.textContent = el.textContent[switchCase]();
        }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
