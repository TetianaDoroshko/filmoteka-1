// Сделать открытие и закрытие модалки детальной инфы фильма,
// должна закрывать по esc и по клику в бекдроп

import { refs } from './refs/refs';
import { getDetails } from './api-service/get-details';
import { renderModalDetails } from './modal-details';
import { modalButtonsHandler } from './modal-details/watched';

const { filmDetailsRef } = refs();

const btn = document.querySelector('.js-btn-queue'); /* временная кнопка */

btn.addEventListener('click', onFilmClick); /*  */
filmDetailsRef.filmDetailsModalClose.addEventListener('click', onCloseModal);
filmDetailsRef.modalBackdrop.addEventListener('click', onBackdropClick);

// filmDetailsRef.filmDetailsModalContainer.addEventListener(
//   'click',
//   onFilmClick
// ); /* нужно потом навесить слушателя на контейнер с карточками */

async function onFilmClick(event) {
  event.preventDefault();
  //   console.log(event.target);

  //   if (!event.target.classList.contains('gallery-card')) {
  //     return;
  //   } стиль лишки, на нем и id

  //   let movieId = event.target.dataset.id;
  //   getDetails(movieId);
  getDetails('496450');
  await renderModalDetails();
  onOpenModal();
}

function onOpenModal() {
  window.addEventListener('keydown', onCloseModalByEscape);
  document.body.classList.add('show-modal');
  filmDetailsRef.filmDetailsModal.classList.remove('is-hidden');
  modalButtonsHandler(); /* Это Танина функция - запуск кнопок при открытии модалки */
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseModalByEscape);
  document.body.classList.remove('show-modal');
  filmDetailsRef.filmDetailsModal.classList.add('is-hidden');
}

function onBackdropClick() {
  onCloseModal();
}

function onCloseModalByEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
