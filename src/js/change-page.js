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
import { libraryHandler } from './btn-library';
import { createPagination } from './pagination';
// import { libraryHandler } from './utils/get-name-genres';

// ===================================================
showLoader();
window.addEventListener('DOMContentLoaded', createPage);

async function createPage() {
  showLoader();
  const data = await getTrendingMovies();
  console.log(data);

  renderMovies(data);
  createPagination(data.total_pages);
  hideLoader();
}

// ====================================================
refs().libraryRef.homeBtn.addEventListener('click', switchPageToHome);
refs().libraryRef.libBtn.addEventListener('click', switchPageToLibrary);
refs().headerRef.navLogo.addEventListener('click', switchPageToHome);

function switchPageToHome() {
  refs().headerRef.searchInput.value = null;

  refs().headerRef.header.classList.add('header--home');
  refs().headerRef.header.classList.remove('header--library');

  refs().libraryButtonsRef.btnContainer.classList.add('display-none');
  refs().headerRef.searchForm.classList.remove('display-none');

  refs().libraryRef.homeBtn.classList.add('current');
  refs().libraryRef.libBtn.classList.remove('current');

  createPage();
}

function switchPageToLibrary() {
  refs().headerRef.header.classList.remove('header--home');
  refs().headerRef.header.classList.add('header--library');

  refs().headerRef.searchForm.classList.add('display-none');
  refs().libraryButtonsRef.btnContainer.classList.remove('display-none');

  refs().libraryRef.libBtn.classList.add('current');
  refs().libraryRef.homeBtn.classList.remove('current');

  // refs().paginationRef.container.classList.add('display-none');

  libraryHandler();
}
