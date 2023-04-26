export default function createDOM() {
  const title = document.createElement('h1');
  title.innerText = 'RSS Виртуальная клавиатура';
  title.classList.add('title');

  document.body.append(title);
}
