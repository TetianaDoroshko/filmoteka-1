// Для подстановки динамических данных нужно сделать запрос getDetails() передать id
// и использовать функцию из файла render-details для их отрисовки
//
// нужно при открытии вызывать функцию реализованую в файлах queue или watched которая проверяет
// есть ли фильм в хранилище и подсвечивает кнопки.

import { getDetails } from './api-service/get-details';
import { modalButtonsHandler } from './modal-details/watched';
import { onOpenModal } from './open-close-modal-details';
import { renderModalDetails } from './render/render-details';

export async function onFilmClick(event) {
  event.preventDefault();
  // console.log(event.target);

  if (!event.target.closest('.gallery-card')) {
    return;
  }

  let movieId = event.target.closest('.gallery-card').dataset.id;
  const data = await getDetails(movieId);

  if (data) {
    renderModalDetails(data);
    modalButtonsHandler(movieId);
    onOpenModal();
  } else {
    window.alert('Oops, movie not found. Please, choose another movie');
  }
}
