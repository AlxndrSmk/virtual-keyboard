const githubLink = document.createElement('a');
githubLink.setAttribute('href', 'https://github.com/AlxndrSmk');

const linkedinLink = document.createElement('a');
linkedinLink.setAttribute('href', 'https://www.linkedin.com/in/alexander-samak-0141a6235/');

const rsschoolLink = document.createElement('a');
rsschoolLink.setAttribute('href', 'https://rs.school/js/');

const github = document.createElement('img');
github.setAttribute('src', './assets/images/svg/github.svg');
github.setAttribute('alt', 'github-logo');

const linkedin = document.createElement('img');
linkedin.setAttribute('src', './assets/images/svg/linkedin.svg');
linkedin.setAttribute('alt', 'linkedin-logo');

const rsschool = document.createElement('img');
rsschool.setAttribute('src', './assets/images/svg/rsschool.svg');
rsschool.setAttribute('alt', 'srrchool-logo');

const imgArr = [github, linkedin, rsschool];
const linksArr = [githubLink, linkedinLink, rsschoolLink];

function setAttribute(el, attribute, attributeName) {
  el.setAttribute(`${attribute}`, `${attributeName}`);
}

imgArr.forEach((el) => {
  setAttribute(el, 'class', 'link-logo');
});

linksArr.forEach((el) => {
  setAttribute(el, 'target', '_blank');
  setAttribute(el, 'class', 'link-href');
});

export {
  github, linkedin, rsschool, githubLink, linkedinLink, rsschoolLink,
};
