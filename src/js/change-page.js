//При загрузке страницы нужно сделать запрос на популярные фильмы
// с помощью getTrendingMovies() ничего не передавать в нее.
//полученые данные передать в функцию в файле render-gallery. для отрисовки

// при клике на library в шапку нужно рендерить кнопки библиотеки и вызвать функцию которая делает запрос
// на просмотренные фильмы в файле btn-library. и отрисовывает их
//
//должна подсвечиваться текущая страница и убираться с нее кликабельность.
// при переходе обратно на страницу home логотип также должен быть не кликабельным.
// и обратно делать запрос на популярные фильмы.

import { getTrendingMovies } from './api-service/get-trending-movies';
import { hideLoader, showLoader } from './loader/loader';
import { renderMovies } from './render/render-gallery';
import { refs } from './refs/refs';
import { libraryHandler } from './utils/get-name-genres';

// ===================================================
showLoader();
window.addEventListener('DOMContentLoaded', createPage);

async function createPage() {
  const data = await getTrendingMovies();
  renderMovies(data);
  hideLoader();
}

refs().libraryRef.libBtn.addEventListener('click', showButtonsLibrary);
refs().libraryRef.homeBtn.addEventListener('click', showSearchLabel);

// const btnWatch = refs().libraryButtonsRef.btnWatched;
// const btnQue = refs().libraryButtonsRef.btnQueue;
const btnContainer = refs().libraryButtonsRef.btnContainer;

function showButtonsLibrary() {
  //   btnQue.classList.remove('is-hidden');
  //   btnWatch.classList.remove('is-hidden');
}

function showSearchLabel() {
  //   btnQue.classList.add('is-hidden');
  //   btnWatch.classList.add('is-hidden');
}

//.display-none
