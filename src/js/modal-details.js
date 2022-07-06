// Для подстановки динамических данных нужно сделать запрос getDetails() передать id
// и использовать функцию из файла render-details для их отрисовки
//
// нужно при открытии вызывать функцию реализованую в файлах queue или watched которая проверяет
// есть ли фильм в хранилище и подсвечивает кнопки.

// import { refs } from './refs/refs';
import { getDetails } from './api-service/get-details';
import { onOpenModal } from './open-close-modal-details';
import { renderModalDetails } from './render/render-details';

// const { filmDetailsRef } = refs();

export async function onFilmClick(event) {
  event.preventDefault();
  // console.log(event.target);

  if (!event.target.classList.contains('gallery-card')) {
    return;
  } /* стиль лишки, на нем и id */

  let movieId = event.target.dataset.id;
  getDetails(movieId);
  // getDetails('496450');
  await renderModalDetails(movieId);
  onOpenModal();
}
