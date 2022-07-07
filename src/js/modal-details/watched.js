//При нажатии на кнопку должна вызываться функция setStorage
// и передавать в нее ключ(есть в константах) и ID фильма для записи в хранилище.
//
//Если ID фильма есть в хранилище, то подсвечивать кнопку и менять текст на удалить из...
// Нужно сделать что бы фильм был либо в очереди, либо в просмотренных, и там и там не может быть.
// реализовать функцию которая будет вызываться при открытии модалки и проверять
// есть ли данный фильм в хранилище, и подсвечивать ее.
//Если ID фильма есть в хранилище, то подсвечивать кнопку и менять текст на удалить из...
// Нужно сделать что бы фильм был либо в очереди, либо в просмотренных, и там и там не может быть.
// реализовать функцию которая будет вызываться при открытии модалки и проверять
// есть ли данный фильм в хранилище, и подсвечивать ее.

import storageConfig from '../constants/storage-config';
import { refs } from '../refs/refs';
import { getStorage, setStorage, deleteStorage } from '../storage/storage';
import { showWatchedMovies, showQueueOfMovies } from '../btn-library';
import storageConfig from '../constants/storage-config';
import { getSessionStorage } from '../storage/session-storage';

const keyWatched = storageConfig.KEY_WATCHED;
const keyQueue = storageConfig.KEY_QUEUE;

const { btnWatched: headerBtnWatched, btnQueue: headerBtnQueue } =
  refs().libraryButtonsRef;
const btnWatched = refs().filmDetailsRef.btnWatched;
const btnQueue = refs().filmDetailsRef.btnQueue;

//-----временные функции storage-----
// function getStorage(key) {
//   return JSON.parse(localStorage.getItem(key)) ?? [];
// }
// function setStorage(key, id) {
//   const storage = getStorage(key);
//   console.log(storage);
//   storage.push(id);
//   localStorage.setItem(key, JSON.stringify(storage));
// }
// function deleteStorage(key, id) {
//   const storage = getStorage(key);
//   const index = storage.indexOf(id);
//   console.log(index);
//   storage.splice(index, 1);
//   localStorage.setItem(key, JSON.stringify(storage));
// }

//--------------------------------------

// modalButtonsHandler('921987'); //функционал кнопок запускается при открытии модального окна

export function modalButtonsHandler(movieId) {
  checkInStorageWatched(movieId);
  checkInStorageQueue(movieId);
  btnWatched.setAttribute('id', movieId);
  btnWatched.addEventListener('click', onWatchedBtnClick);
  btnQueue.setAttribute('id', movieId);
  btnQueue.addEventListener('click', onQueueBtnClick);
}

function checkInStorageWatched(id) {
  const watchedMovieSet = getStorage(keyWatched);
  if (watchedMovieSet.includes(id)) {
    btnWatched.setAttribute('actions', 'added');
    btnWatched.classList.add('active');
    btnWatched.textContent = 'Remove from Watched';
  } else {
    btnWatched.setAttribute('actions', 'not-added');
    btnWatched.classList.remove('active');
    btnWatched.textContent = 'Add to Watched';
  }
}

function checkInStorageQueue(id) {
  const queueMovieSet = getStorage(keyQueue);
  if (queueMovieSet.includes(id)) {
    btnQueue.setAttribute('actions', 'added');
    btnQueue.classList.add('active');
    btnQueue.textContent = 'Remove from Queue';
  } else {
    btnQueue.setAttribute('actions', 'not-added');
    btnQueue.classList.remove('active');
    btnQueue.textContent = 'Add to Queue';
  }
}

function onWatchedBtnClick(event) {
  const id = event.currentTarget.getAttribute('id');
  // console.log(btnWatched.getAttribute('actions'));
  if (btnWatched.getAttribute('actions') === 'added') {
    // console.log('delete');
    deleteStorage(keyWatched, id);
  } else {
    setStorage(keyWatched, id);
    deleteStorage(keyQueue, id);
  }
  checkInStorageWatched(id);
  checkInStorageQueue(id);

  if (getSessionStorage()[storageConfig.LIBRARY]) {
    if (headerBtnWatched.classList.contains('active')) {
      // console.log(getSessionStorage().page);
      showWatchedMovies(getSessionStorage().page);
    } else {
      showQueueOfMovies(getSessionStorage().page);
    }
  }
}

function onQueueBtnClick(event) {
  const id = event.currentTarget.getAttribute('id');
  if (btnQueue.getAttribute('actions') === 'added') {
    deleteStorage(keyQueue, id);
  } else {
    setStorage(keyQueue, id);
    deleteStorage(keyWatched, id);
  }
  checkInStorageWatched(id);
  checkInStorageQueue(id);

  if (getSessionStorage()[storageConfig.LIBRARY]) {
    if (headerBtnWatched.classList.contains('active')) {
      // console.log(getSessionStorage().page);
      showWatchedMovies(getSessionStorage().page);
    } else {
      showQueueOfMovies(getSessionStorage().page);
    }
  }
}
