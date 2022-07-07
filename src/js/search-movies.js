// сделать проверки на корректность введенных данных, стделать трим лишних пробелов.
// после сабмита делается запрос с помощью функции getMoviesByKey передав в нее query.
// то что вернет функция отправляем в функцию в файле render-gallery.
import { getMoviesByKey } from '../js/api-service/get-movies-by-key';
import { refs } from './refs/refs';
import { renderMovies } from './render/render-gallery';
import { showLoader } from './loader/loader';
import { hideLoader } from './loader/loader';
const { moviesDiv } = refs().galleryRef;
const { searchForm } = refs().searchRef;
const { modalError } = refs().modalErrorRef;
const { modalErrorText } = refs().modalErrorRef;

const delay = 3000;
let searchNameFilm = '';
let timeoutID = null;

searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  searchNameFilm = e.target.elements.searchQuery.value.trim();
  console.log(searchNameFilm);

  if (searchNameFilm === '') {
    const text = 'Enter the name of the movie, for a correct search!';
    return showError(text);
  }

  showLoader();
  resetPage();
  clearContainerGallery();
  getMoviesByKey(searchNameFilm)
    .then(res => {
      if (!res) {
        alert('плохой запрос');
        return;
      }
      renderMovies(res);
    })
    .finally(hideLoader);
}

function resetPage() {
  page = 1;
}
function clearContainerGallery() {
  moviesDiv.innerHTML = '';
}

modalError.addEventListener('click', onAttentionClick);

function onAttentionClick() {
  hideError();
  clearInterval(timeoutID);
}

function showError(text) {
  modalError.classList.remove('is-hidden');

  attentionText(text);

  timeoutID = setTimeout(() => {
    hideError();
  }, delay);
}

function hideError() {
  modalError.classList.add('is-hidden');
}

function attentionText(text) {
  modalErrorText.innerHTML = `${text}`;
}
