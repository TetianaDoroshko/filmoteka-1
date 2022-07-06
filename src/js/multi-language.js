import langs from './language/language-map';

changeLanguage();

function changeLanguage() {
  const keys = Object.keys(langs);

  for (let key of keys) {
    const element = document.querySelector(`.lang-${key}`);
    const language = langs[key]['uk'];
    if (element && language) {
      element.innerHTML = language;
    }
  }
}
