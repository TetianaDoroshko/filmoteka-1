// Сделать открытие и закрытие модалки детальной инфы фильма,
// должна закрывать по esc и по клику в бекдроп

import { refs } from './refs/refs';
import { modalButtonsHandler } from './modal-details/watched';
import { onFilmClick } from './modal-details';
const { filmDetailsRef } = refs();

/* временная кнопка */

// const btn = document.querySelector('.js-btn-queue');
// btn.addEventListener('click', onFilmClick); /*  */

filmDetailsRef.filmDetailsModalClose.addEventListener('click', onCloseModal);
filmDetailsRef.modalBackdrop.addEventListener('click', onBackdropClick);
filmDetailsRef.filmDetailsModalContainer.addEventListener('click', onFilmClick);

export function onOpenModal() {
  window.addEventListener('keydown', onCloseModalByEscape);
  document.body.classList.add('show-modal');
  filmDetailsRef.filmDetailsModal.classList.remove('is-hidden');
  modalButtonsHandler(); /* Это Танина функция - запуск кнопок при открытии модалки */
}

export function onCloseModal() {
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
