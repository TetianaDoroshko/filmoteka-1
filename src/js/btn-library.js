// сделать что бы при нажатии на кнопку происходил поиск фильмов пользователя в локальом хранилище
// функция getStorage в нее передать ключ.
//
// Если ничего нету в хранилище, отобразить текст например вы еще ничего не добавили.
//если в хранилище есть данные, то делать запросы на каждый ид и с помощью функции в render-gallery
// отрисовать карточки.
import { refs } from './refs/refs';
// import { getStorage } from './storage/storage';
import storageConfig from './constants/storage-config';
import { getDetails } from './api-service/get-details';

const btnWatched = refs().libraryButtonsRef.btnWatched;
const btnQueue = refs().libraryButtonsRef.btnQueue;

// ------temp-----
//-----временный контейнер для галереи-----------
const pag = document.querySelector('.pagination');
const gallery = document.createElement('div');
pag.insertAdjacentElement('beforebegin', gallery);
console.log(gallery);

//----временная функция  getStorage--------------
function getStorage(key) {
  return ['453395', '982987', '667739', '616037'];
}
//----временная функция создания карточки фильма--
function makeCard(movie) {
  return `
        <article class="movie-card" id="${movie.id}">
        <div class="thumb">
        <img class="movie-card__img" src="https://image.tmdb.org/t/p/w1280/${
          movie.poster_path
        }" sizes="100%" alt="${movie.title}"/>
        </div>
        <div class="movie-card__description">
            <p class="movie-card__name">${movie.title}</p>
            <p class="movie-card__info">Genres | ${Number.parseInt(
              movie.release_date
            )}</p>
        </div>
        </article>`;
}
//------------

libraryHandler(); // нужно вызвыть при переключении на страницу Library

function libraryHandler() {
  addListenersBtnLib();
  showWatchedMovies();
  btnWatched.classList.add('active');
}
function addListenersBtnLib() {
  btnWatched.addEventListener('click', showWatchedMovies);
  btnQueue.addEventListener('click', showQueueOfMovies);
}

function showWatchedMovies() {
  btnQueue.classList.remove('active');
  btnWatched.classList.add('active');

  const movieSetId = getStorage(storageConfig.KEY_WATCHED);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "You don't have any movies you've watched. Add the first one.";
  } else {
    renderMovies(movieSetId);
    console.log(movieSetId);
  }
}
function showQueueOfMovies() {
  btnQueue.classList.add('active');
  btnWatched.classList.remove('active');

  const movieSetId = getStorage(storageConfig.KEY_QUEUE);
  if (!movieSetId || movieSetId.length === 0) {
    gallery.innerHTML =
      "You don't have any movies in the queue. Add the first one.";
  } else {
    renderMovies(movieSetId);
  }
}

async function renderMovies(movieSetId) {
  let markup = [];
  for (movieID of movieSetId) {
    const movieDetails = await getDetails(movieID);
    console.log(movieDetails);
    if (movieDetails) {
      const markupCard = makeCard(movieDetails);
      markup.push(markupCard);
    } else {
      continue;
    }
  }
  markup = markup.join('');
  gallery.innerHTML = markup;
}
