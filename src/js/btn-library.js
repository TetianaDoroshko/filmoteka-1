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
// import { getStorage, setStorage, deleteStorage } from './storage/storage';

const btnWatched = refs().libraryButtonsRef.btnWatched;
const btnQueue = refs().libraryButtonsRef.btnQueue;
const gallery = refs().galleryRef.moviesDiv;
// ------temp-----
//----временная функция  getStorage--------------
function getStorage(key) {
  return ['453395', '921987', '667739', '616037'];
}
//------------

// libraryHandler(); // нужно вызвыть при переключении на страницу Library

export function libraryHandler() {
  addListenersBtnLib();
  showWatchedMovies();
  btnWatched.classList.add('active');
}

function addListenersBtnLib() {
  btnWatched.addEventListener('click', showWatchedMovies);
  btnQueue.addEventListener('click', showQueueOfMovies);
}

async function showWatchedMovies() {
  btnQueue.classList.remove('active');
  btnWatched.classList.add('active');
  gallery.innerHTML = '';

  const movieSetId = getStorage(storageConfig.KEY_WATCHED);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "You don't have any movies you've watched. Add the first one.";
  } else {
    const arrayOfPromises = await Promise.all(createPromises(movieSetId));
    renderMoviesPromises(arrayOfPromises);
  }
}

async function showQueueOfMovies() {
  btnQueue.classList.add('active');
  btnWatched.classList.remove('active');
  gallery.innerHTML = '';

  const movieSetId = getStorage(storageConfig.KEY_QUEUE);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "You don't have any movies in the queue. Add the first one.";
  } else {
    const arrayOfPromises = await Promise.all(createPromises(movieSetId));
    renderMoviesPromises(arrayOfPromises);
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

function renderMoviesPromises(arrayOfPromises) {
  const markup = arrayOfPromises
    .map(element => {
      if (element) {
        return createSingleMovieMarkup(element);
      }
    })
    .join('');
  gallery.innerHTML = `<ul class="gallery-container">${markup}</ul>`;
}
