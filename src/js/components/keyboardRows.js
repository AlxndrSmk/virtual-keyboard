import keyboardButtons from './data.js';

const fragment = document.createDocumentFragment();

keyboardButtons.forEach((row) => {
  const keyboardRow = document.createElement('div');
  keyboardRow.classList.add('keyboard__row');

  row.forEach((btn) => {
    const keyboardButton = document.createElement('button');
    keyboardButton.textContent = btn.lang.en;
    keyboardButton.setAttribute('id', btn.name);
    keyboardButton.classList.add('btn');
    keyboardButton.classList.add(`btn_size-${btn.size}`);
    const arrowWrapper = document.createElement('div');
    arrowWrapper.classList.add('arrow-buttons-wrapper');

    if (btn.name === 'ArrowRight') {
      arrowWrapper.innerHTML = `
      <button class="btn btn_size-xs" id="ArrowUp">▴</button>
      <button class="btn btn_size-xs" id="ArrowDown">▾</button>
      `;
      keyboardRow.appendChild(arrowWrapper);
    }

    if (btn.size === 'xs') return;

    keyboardRow.appendChild(keyboardButton);
  });

  fragment.appendChild(keyboardRow);
});

export default fragment;
