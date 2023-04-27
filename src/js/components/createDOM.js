import fragment from './keyboardRows.js';

export default function createDOM() {
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');

  title.innerText = 'RSS Виртуальная клавиатура';

  textarea.autofocus = true;
  title.classList.add('title');
  textarea.classList.add('textarea');
  keyboard.classList.add('keyboard');

  document.body.append(title);
  document.body.append(textarea);
  document.body.append(keyboard);
  keyboard.append(fragment);
}
