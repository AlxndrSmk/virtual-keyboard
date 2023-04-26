import keyboardButtons from './data.js';

const keyboardRow = document.createElement('div');
keyboardRow.classList.add('keyboard__row');

const fragment = document.createDocumentFragment();
// fragment.classList.add('keyboard__row');

keyboardButtons.forEach((btn) => {
  const keyboardButton = document.createElement('button');
  keyboardButton.classList.add('btn');
  keyboardButton.classList.add(`btn_size-${btn.size}`);
  keyboardButton.textContent = btn.lang.en;

  fragment.appendChild(keyboardButton);
});

keyboardRow.appendChild(fragment);

export default keyboardRow;
