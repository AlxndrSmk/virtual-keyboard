const keyboardButtons = [
  [
    {
      name: 'Escape',
      lang: { en: 'esc', ru: 'esc' },
      isFunctional: true,
      size: 'fix',
    },
    {
      name: 'Backquote',
      lang: { en: '`', ru: ']' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit1',
      lang: { en: '1', ru: '1' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit2',
      lang: { en: '2', ru: '2' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit3',
      lang: { en: '3', ru: '3' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit4',
      lang: { en: '4', ru: '4' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit5',
      lang: { en: '5', ru: '5' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit6',
      lang: { en: '6', ru: '6' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit7',
      lang: { en: '7', ru: '7' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit8',
      lang: { en: '8', ru: '8' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit9',
      lang: { en: '9', ru: '9' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Digit0',
      lang: { en: '0', ru: '0' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Minus',
      lang: { en: '-', ru: '-' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Equal',
      lang: { en: '=', ru: '=' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Backspace',
      lang: { en: 'delete', ru: 'delete' },
      isFunctional: true,
      size: 'm',
    },
  ],
  [
    {
      name: 'Tab',
      lang: { en: 'tab', ru: 'tab' },
      isFunctional: true,
      size: 'l',
    },
    {
      name: 'KeyQ',
      lang: { en: 'q', ru: 'й' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyW',
      lang: { en: 'w', ru: 'ц' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyE',
      lang: { en: 'e', ru: 'у' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyR',
      lang: { en: 'r', ru: 'к' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyT',
      lang: { en: 't', ru: 'е' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyY',
      lang: { en: 'y', ru: 'н' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyU',
      lang: { en: 'u', ru: 'г' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyI',
      lang: { en: 'i', ru: 'ш' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyO',
      lang: { en: 'o', ru: 'щ' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyP',
      lang: { en: 'p', ru: 'з' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'BracketLeft',
      lang: { en: '[', ru: 'х' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'BracketRight',
      lang: { en: ']', ru: 'ъ' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Backslash',
      lang: { en: '\\', ru: 'ё' },
      isFunctional: false,
      size: 'fix',
    },
  ],
  [
    {
      name: 'CapsLock',
      lang: { en: 'caps lock', ru: 'caps lock' },
      isFunctional: true,
      size: 'm',
    },
    {
      name: 'KeyA',
      lang: { en: 'a', ru: 'ф' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyS',
      lang: { en: 's', ru: 'ы' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyD',
      lang: { en: 'd', ru: 'в' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyF',
      lang: { en: 'f', ru: 'а' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyG',
      lang: { en: 'g', ru: 'п' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyH',
      lang: { en: 'h', ru: 'р' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyJ',
      lang: { en: 'j', ru: 'о' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyK',
      lang: { en: 'k', ru: 'л' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyL',
      lang: { en: 'l', ru: 'д' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Semicolon',
      lang: { en: ';', ru: 'ж' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Quote',
      lang: { en: "'", ru: 'э' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Enter',
      lang: { en: 'return', ru: 'return' },
      isFunctional: true,
      size: 'm',
    },
  ],
  [
    {
      name: 'ShiftLeft',
      lang: { en: 'shift', ru: 'shift' },
      isFunctional: true,
      size: 'm',
    },
    {
      name: 'KeyZ',
      lang: { en: 'z', ru: 'я' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyX',
      lang: { en: 'x', ru: 'ч' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyC',
      lang: { en: 'c', ru: 'с' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyV',
      lang: { en: 'v', ru: 'м' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyB',
      lang: { en: 'b', ru: 'и' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyN',
      lang: { en: 'n', ru: 'т' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'KeyM',
      lang: { en: 'm', ru: 'ь' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Comma',
      lang: { en: ',', ru: 'б' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Period',
      lang: { en: '.', ru: 'ю' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'Slash',
      lang: { en: '/', ru: '.' },
      isFunctional: false,
      size: 'fix',
    },
    {
      name: 'ShiftRight',
      lang: { en: 'shift', ru: 'shift' },
      isFunctional: true,
      size: 'm',
    },
  ],
  [
    {
      name: 'ControlLeft',
      lang: { en: 'control', ru: 'control' },
      isFunctional: true,
      size: 'm',
    },
    {
      name: 'AltLeft',
      lang: { en: 'option', ru: 'option' },
      isFunctional: true,
      size: 'm',
    },
    {
      name: 'MetaLeft',
      lang: { en: 'command', ru: 'command' },
      isFunctional: true,
      size: 'm',
    },
    {
      name: 'Space',
      lang: { en: ' ', ru: ' ' },
      isFunctional: false,
      size: 'xxxl',
    },
    {
      name: 'MetaRight',
      lang: { en: 'command', ru: 'command' },
      isFunctional: true,
      size: 'm',
    },
    {
      name: 'AltRight',
      lang: { en: 'option', ru: 'option' },
      isFunctional: true,
      size: 'm',
    },
    {
      name: 'ArrowLeft',
      lang: { en: '◂', ru: '◂' },
      isFunctional: true,
      size: 's',
    },
    {
      name: 'ArrowUp',
      lang: { en: '▴', ru: '▴' },
      isFunctional: true,
      size: 'xs',
    },
    {
      name: 'ArrowDown',
      lang: { en: '▾', ru: '▾' },
      isFunctional: true,
      size: 'xs',
    },
    {
      name: 'ArrowRight',
      lang: { en: '▸', ru: '▸' },
      isFunctional: true,
      size: 's',
    },
  ],
];

export default keyboardButtons;
