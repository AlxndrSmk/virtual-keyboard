import fragment from './components/keyboardRows.js';

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

    this.title.innerText = 'RSS Виртуальная клавиатура';
    this.description.innerText = 'Клавиатура создана в операционной системе MacOS';
    this.language.innerText = 'Для переключения языка: левыe ctrl + alt (Windows), левые control + option (MacOS)';

    this.textarea.autofocus = true;
    this.title.classList.add('title');
    this.textarea.classList.add('textarea');
    this.keyboard.classList.add('keyboard');
    this.description.classList.add('description');
    this.language.classList.add('description');

    document.body.append(this.title);
    document.body.append(this.textarea);
    document.body.append(this.keyboard);
    this.keyboard.append(fragment);
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
      const key = document.getElementById(el.code);
      console.log(key);
      key.classList.add('selected');
    });

    document.addEventListener('keyup', (el) => {
      const key = document.getElementById(el.code);

      key.classList.remove('selected');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
