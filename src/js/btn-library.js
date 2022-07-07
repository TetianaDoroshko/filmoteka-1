// сделать что бы при нажатии на кнопку происходил поиск фильмов пользователя в локальом хранилище
// функция getStorage в нее передать ключ.
//
// Если ничего нету в хранилище, отобразить текст например вы еще ничего не добавили.
//если в хранилище есть данные, то делать запросы на каждый ид и с помощью функции в render-gallery
// отрисовать карточки.
import { refs } from './refs/refs';
import storageConfig from './constants/storage-config';
import { getDetails } from './api-service/get-details';
import { createSingleMovieMarkup } from './template/card-library';
import { getStorage } from './storage/storage';
import { createPagination, clearContainerPagination } from './pagination';
import {
  setSessionStorage,
  updatePageSessionStorage,
} from './storage/session-storage';
import { hideLoader, showLoader } from './loader/loader';

const btnWatched = refs().libraryButtonsRef.btnWatched;
const btnQueue = refs().libraryButtonsRef.btnQueue;
const gallery = refs().galleryRef.moviesDiv;
let arrayOfPromises;
// ------temp-----
//----временная функция  getStorage--------------
// function getStorage(key) {
//   return [
//     '453395',
//     '921987',
//     '667739',
//     '616037',
//     '507086',
//     '453395',
//     '616037',
//     '120011',
//     '759175',
//     '438148',
//     '745376',
//     '92782',
//     '102903',
//     '76479',
//     '361743',
//     '545611',
//     '63247',
//     '64196',
//     '634649',
//     '204852',
//     '72636',
//     '453395',
//     '921987',
//     '667739',
//     '616037',
//     '507086',
//     '453395',
//     '616037',
//     '120111',
//     '759175',
//     '438148',
//     '745376',
//     '92782',
//     '102903',
//     '76479',
//     '361743',
//     '545611',
//     '63247',
//     '64196',
//     '634649',
//     '204852',
//     '72636',
//     '111277',
//     '667739',
//     '616037',
//     '507086',
//     '453395',
//     '616037',
//     '120011',
//     '759175',
//     '438148',
//     '745376',
//     '92782',
//     '102903',
//     '76479',
//     '361743',
//     '545611',
//     '63247',
//     '64196',
//     '634649',
//     '204852',
//     '72636',
//     '453395',
//     '921987',
//     '667739',
//     '616037',
//     '507086',
//     '453395',
//     '616037',
//     '120111',
//     '759175',
//     '438148',
//     '745376',
//     '92782',
//     '102903',
//     '76479',
//     '361743',
//     '545611',
//     '63247',
//     '64196',
//     '634649',
//     '204852',
//     '72636',
//   ];
// }
//------------

// libraryHandler(); // нужно вызвыть при переключении на страницу Library

export function libraryHandler() {
  addListenersBtnLib();
  showWatchedMovies();
  setSessionStorage(storageConfig.LIBRARY);
  btnWatched.classList.add('active');
}

function addListenersBtnLib() {
  btnWatched.addEventListener('click', showWatchedMovies);
  btnQueue.addEventListener('click', showQueueOfMovies);
}

export async function showWatchedMovies(page) {
  let currentPage;
  if (typeof page === 'number') {
    currentPage = page;
  } else {
    currentPage = 1;
  }

  btnQueue.classList.remove('active');
  btnWatched.classList.add('active');
  clearContainerPagination();
  updatePageSessionStorage(currentPage);

  // gallery.innerHTML = '';

  const movieSetId = getStorage(storageConfig.KEY_WATCHED);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "You don't have any movies you've watched. Add the first one.";
  } else {
    showLoader();

    arrayOfPromises = await Promise.all(createPromises(movieSetId));
    arrayOfPromises = arrayOfPromises.filter(el => el !== undefined);

    const totalPages = Math.ceil(arrayOfPromises.length / 20);

    if (totalPages < currentPage) {
      currentPage -= 1;
    }

    renderMoviesPromises(currentPage);
    createPagination(totalPages, currentPage);
    hideLoader();
  }
}

export async function showQueueOfMovies(page) {
  let currentPage;
  if (typeof page === 'number') {
    currentPage = page;
  } else {
    currentPage = 1;
  }

  btnQueue.classList.add('active');
  btnWatched.classList.remove('active');
  clearContainerPagination();
  updatePageSessionStorage(currentPage);

  // gallery.innerHTML = '';

  const movieSetId = getStorage(storageConfig.KEY_QUEUE);
  // console.log(movieSetId);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "You don't have any movies in the queue. Add the first one.";
  } else {
    showLoader();
    arrayOfPromises = await Promise.all(createPromises(movieSetId));
    arrayOfPromises = arrayOfPromises.filter(el => el !== undefined);

    const totalPages = Math.ceil(arrayOfPromises.length / 20);

    if (totalPages < currentPage) {
      currentPage -= 1;
    }

    renderMoviesPromises(currentPage);
    createPagination(totalPages, currentPage);
    hideLoader();
  }
}

function createPromises(movieSetId) {
  return movieSetId.map(
    movieId =>
      new Promise(resolve => {
        resolve(getDetails(movieId));
        reject(getDetails(movieId));
      })
  );
}

export function renderMoviesPromises(page = 1) {
  arrayForPage = arrayOfPromises.slice(
    0 + 20 * (page - 1),
    20 + 20 * (page - 1)
  );
  const markup = arrayForPage
    .map(element => {
      if (element) {
        return createSingleMovieMarkup(element);
      }
    })
    .join('');
  gallery.innerHTML = `<ul class="gallery-container">${markup}</ul>`;
}
