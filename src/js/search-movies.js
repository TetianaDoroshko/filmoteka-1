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

let searchNameFilm = '';

searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  searchNameFilm = e.target.elements.searchQuery.value.trim();
  console.log(searchNameFilm);

  if (searchNameFilm === '') {
    return alert('Nothing is found. Wrong query.');
  }
  // Пока так, завтра таймер и модалку повешу
 
  showLoader();
  resetPage();
  clearContainerGallery();
  getMoviesByKey(searchNameFilm).then(renderMovies).finally(hideLoader);
    // hideLoader()
  
}

function resetPage() {
  page = 1;
};
function clearContainerGallery() {
  moviesDiv.innerHTML = '';
};
