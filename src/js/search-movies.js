// сделать проверки на корректность введенных данных, стделать трим лишних пробелов.
// после сабмита делается запрос с помощью функции getMoviesByKey передав в нее query.
// то что вернет функция отправляем в функцию в файле render-gallery.
import { getMoviesByKey } from '../js/api-service/get-movies-by-key';
// Нужно перенести в рефсы
const refs = {
  searchInput: document.querySelector('input[name="searchQuery"]'),
  containerGallery: document.querySelector('.gallery-container'),
};

let searchNameFilm = '';

refs.searchInput.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  searchNameFilm = e.currentTarget.elements.query.value.trim();
  // console.log(searchNameFilm);

  if (searchNameFilm === '') {
    return alert('Nothing is found. Wrong query.');
  }
  // Пока так, завтра таймер и модалку повешу
  // showLoader();
  resetPage();
  getMoviesByKey(searchNameFilm).then(collection => {
    clearContainerGallery();
    console.log(collection);
    // hideLoader()
  });
}

function resetPage() {
  page = 1;
}
function clearContainerGallery() {
  refs.containerGallery.innerHTML = '';
}
