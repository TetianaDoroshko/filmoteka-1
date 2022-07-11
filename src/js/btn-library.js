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

export function libraryHandler(page, isWatchedOrQueue) {
  addListenersBtnLib();
  console.log(isWatchedOrQueue);

  if (isWatchedOrQueue === 'watched') {
    showWatchedMovies(page);
    btnWatched.classList.add('active');
    console.log('1');
  } else if (isWatchedOrQueue === 'queue') {
    showQueueOfMovies(page);
    console.log('2');
  } else {
    showWatchedMovies(page);
    btnWatched.classList.add('active');
    console.log('3');
  }
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
  setSessionStorage(storageConfig.LIBRARY, 'watched');
  updatePageSessionStorage(currentPage);

  // gallery.innerHTML = '';

  const movieSetId = getStorage(storageConfig.KEY_WATCHED);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "<p class='gallery__info'>You don't have any movies you've watched.</p><p class='gallery__info'>Add the first one.</p>";
    hideLoader();
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
  setSessionStorage(storageConfig.LIBRARY, 'queue');
  updatePageSessionStorage(currentPage);

  // gallery.innerHTML = '';

  const movieSetId = getStorage(storageConfig.KEY_QUEUE);
  // console.log(movieSetId);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "<p class='gallery__info'>You don't have any movies in the queue.</p><p class='gallery__info'>Add the first one.</p>";
    hideLoader();
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
  const arrayForPage = arrayOfPromises.slice(
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
