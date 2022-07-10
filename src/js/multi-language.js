// import langs from './language/language-map';
// import { refs } from './refs/refs';
// import {
//   getStorageSetting,
//   setStorageSetting,
// } from './storage/storage-settings';

// const { languageSelect } = refs().panel;
// const allLang = ['en', 'ru', 'uk'];

// languageSelect.addEventListener('change', changeURLLanguage);

// function changeURLLanguage(e) {
//   let lang = e.currentTarget.value;
//   location.href = `${window.location.pathname}#${lang}`;
//   setStorageSetting('lang', lang);
//   location.reload();
//   // changeLanguage();
// }

// changeLanguage();

// function changeLanguage() {
//   const saveLang = getStorageSetting();

//   if (saveLang.lang) {
//     location.href = `${window.location.pathname}#${saveLang.lang}`;
//   }

//   let hash = window.location.hash.substring(1);

//   if (!allLang.includes(hash)) {
//     location.href = `${window.location.pathname}#en`;
//     location.reload();
//   }

//   languageSelect.value = hash;
//   setStorageSetting('lang', hash);

//   const keys = Object.keys(langs);

//   for (let key of keys) {
//     const element = document.querySelector(`.lang-${key}`);
//     const language = langs[key][hash];
//     if (element && language) {
//       element.innerHTML = language;
//     }
//   }
// }
