import fragment from './keyboardRows.js';

export default function createDOM() {
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const description = document.createElement('p');
  const language = document.createElement('p');

  title.innerText = 'RSS Виртуальная клавиатура';
  description.innerText = 'Клавиатура создана в операционной системе MacOS';
  language.innerText = 'Для переключения языка: левыe ctrl + alt (Windows), левые control + option (MacOS)';

  textarea.autofocus = true;
  title.classList.add('title');
  textarea.classList.add('textarea');
  keyboard.classList.add('keyboard');
  description.classList.add('description');
  language.classList.add('description');

  document.body.append(title);
  document.body.append(textarea);
  document.body.append(keyboard);
  keyboard.append(fragment);
  document.body.append(description);
  document.body.append(language);
}
