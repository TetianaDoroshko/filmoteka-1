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
import { createPagination, clearContainerPagination } from './pagination';
import {
  setSessionStorage,
  getSessionStorage,
} from './storage/session-storage';
import storageConfig from './constants/storage-config';
import { makingGenresList } from './utils/get-name-genres';
import { getGenres } from './api-service/get-genres';
// import { trendingHandler } from './btn-trending';
import { renderBySearch } from './search-movies';
import { authorizate } from './auth';

// ===================================================
const { btnDay, btnWeek } = refs().trendingBtnsRef;
let isWeekOrDay = 'day';

showLoader();
window.addEventListener('DOMContentLoaded', getPage);

async function getPage() {
  const savedPage = getSessionStorage();
  const page = savedPage?.page || 1;

  const genres = await getGenres();
  makingGenresList(genres);

  if (!savedPage) {
    setSessionStorage(storageConfig.TRENDING);
    switchPageToHome(page);
  } else if (savedPage[storageConfig.TRENDING]) {
    if (savedPage[storageConfig.TRENDING] === 'day') {
      btnDay.checked = true;
      isWeekOrDay = 'day';
    } else if (savedPage[storageConfig.TRENDING] === 'week') {
      isWeekOrDay = 'week';
      btnWeek.checked = true;
    }
    // console.log(isWeekOrDay);

    switchPageToHome(page);
  } else if (savedPage[storageConfig.LIBRARY]) {
    if (savedPage[storageConfig.LIBRARY] === 'watched') {
      // console.log('watched');

      switchPageToLibrary(page, 'watched');
    } else if (savedPage[storageConfig.LIBRARY] === 'queue') {
      // console.log('queue');
      switchPageToLibrary(page, 'queue');
    }
  } else if (savedPage[storageConfig.BY_KEY]) {
    const query = savedPage[storageConfig.BY_KEY];

    btnDay.checked = false;
    btnWeek.checked = false;

    renderBySearch(query, page);
  }
}

async function createPage(currentPage) {
  if (typeof currentPage !== 'number') {
    currentPage = 1;
  }

  showLoader();
  clearContainerPagination();

  if (btnDay.checked) {
    setSessionStorage(storageConfig.TRENDING, 'day');
  } else if (btnWeek.checked) {
    setSessionStorage(storageConfig.TRENDING, 'week');
  }

  // console.log(isWeekOrDay);

  // const page = getPage(currentPage);
  // trendingHandler();
  const data = await getTrendingMovies(currentPage);

  renderMovies(data);

  createPagination(data.total_pages, currentPage);
  hideLoader();

  // refs().libraryRef.homeBtn.setAttribute('style', 'pointer-events:none');
  // refs().libraryRef.libBtn.setAttribute('style', 'pointer-events:visible');
}

// ====================================================
refs().libraryRef.homeBtn.addEventListener('click', switchPageToHome);
refs().libraryRef.libBtn.addEventListener('click', switchPageToLibrary);
refs().headerRef.navLogo.addEventListener('click', switchPageToHome);

// ====================================================

export function switchPageToHome(currentPage) {
  if (typeof currentPage !== 'number') {
    currentPage = 1;
  }
  refs().headerRef.searchInput.value = null;

  refs().headerRef.header.classList.add('header--home');
  refs().headerRef.header.classList.remove('header--library');

  refs().libraryButtonsRef.btnContainer.classList.add('display-none');
  refs().headerRef.searchForm.classList.remove('display-none');

  refs().libraryRef.homeBtn.classList.add('current');
  refs().libraryRef.libBtn.classList.remove('current');

  refs().trendingBtnsRef.trendingButtons.classList.remove('visually-hidden');
  // refs().libraryRef.homeBtn.setAttribute('style', 'pointer-events:none');
  // refs().libraryRef.libBtn.setAttribute('style', 'pointer-events:visible');
  // setStorage(key, value);
  createPage(currentPage);
}

// ====================================================

async function switchPageToLibrary(currentPage, isWatchedOrQueue) {
  if (typeof currentPage !== 'number') {
    currentPage = 1;
  }
  refs().headerRef.header.classList.remove('header--home');
  refs().headerRef.header.classList.add('header--library');

  refs().headerRef.searchForm.classList.add('display-none');
  refs().libraryButtonsRef.btnContainer.classList.remove('display-none');

  refs().libraryRef.libBtn.classList.add('current');
  refs().libraryRef.homeBtn.classList.remove('current');

  refs().trendingBtnsRef.trendingButtons.classList.add('visually-hidden');
  // refs().libraryRef.libBtn.setAttribute('style', 'pointer-events:none');
  // refs().libraryRef.homeBtn.setAttribute('style', 'pointer-events:visible');
  clearContainerPagination();
  libraryHandler(currentPage, isWatchedOrQueue);
}
