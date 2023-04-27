import keyboardButtons from './data.js';

const fragment = document.createDocumentFragment();

keyboardButtons.forEach((row) => {
  const keyboardRow = document.createElement('div');
  keyboardRow.classList.add('keyboard__row');

  row.forEach((btn) => {
    const keyboardButton = document.createElement('button');
    keyboardButton.classList.add('btn');
    keyboardButton.classList.add(`btn_size-${btn.size}`);
    keyboardButton.textContent = btn.lang.en;

    keyboardRow.appendChild(keyboardButton);
  });

  fragment.appendChild(keyboardRow);
});

export default fragment;
