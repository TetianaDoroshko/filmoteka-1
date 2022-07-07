// сделать проверки на корректность введенных данных, стделать трим лишних пробелов.
// после сабмита делается запрос с помощью функции getMoviesByKey передав в нее query.
// то что вернет функция отправляем в функцию в файле render-gallery.
import { getMoviesByKey } from '../js/api-service/get-movies-by-key';
import { refs } from './refs/refs';
import { renderMovies } from './render/render-gallery';
import { showLoader } from './loader/loader';
import { hideLoader } from './loader/loader';
import { notify } from './notify';
import { createPagination, clearContainerPagination } from './pagination';
import { setSessionStorage } from './storage/session-storage';
import storageConfig from './constants/storage-config';
const { moviesDiv } = refs().galleryRef;
const { searchForm } = refs().searchRef;
// const { modalError } = refs().modalErrorRef;
// const { modalErrorText } = refs().modalErrorRef;

// const delay = 3000;
let searchNameFilm = '';
// let timeoutID = null;

searchForm.addEventListener('submit', onSubmit);
// modalError.addEventListener('click', onAttentionClick);

function onSubmit(e) {
  e.preventDefault();
  searchNameFilm = e.target.elements.searchQuery.value.trim();
  // console.log(searchNameFilm);

  if (searchNameFilm === '') {
    const text = 'Enter the name of the movie, for a correct search!';
    return notify(text);
  }

  showLoader();
  // resetPage();
  clearContainerGallery();
  clearContainerPagination();
  getMoviesByKey(searchNameFilm)
    .then(res => {
      if (!res) {
        const text = 'Nothing is found. Wrong query.';
        notify(text);
        return;
      }

      setSessionStorage(storageConfig.BY_KEY, searchNameFilm);
      createPagination(res.total_pages, 1);
      renderMovies(res);
    })
    .finally(hideLoader);
  clearInput();
  // console.log(clearInput);
}

// function resetPage() {
//   page = 1;
// }
function clearContainerGallery() {
  moviesDiv.innerHTML = '';
}

function clearInput() {
  searchForm.elements.searchQuery.value = '';
}

// function onAttentionClick() {
//   hideError();
//   clearInterval(timeoutID);
// }

// function showError(text) {
//   modalError.classList.remove('is-hidden');

//   attentionText(text);
//   clearInput();

//   timeoutID = setTimeout(() => {
//     hideError();
//   }, delay);
// }

// function hideError() {
//   modalError.classList.add('is-hidden');
// }

// function attentionText(text) {
//   modalErrorText.innerHTML = `${text}`;
// }
