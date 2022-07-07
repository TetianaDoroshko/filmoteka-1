// Сделать открытие и закрытие модалки детальной инфы фильма,
// должна закрывать по esc и по клику в бекдроп

import { refs } from './refs/refs';
import { clearImgSrc } from './render/render-details';
import { onFilmClick } from './modal-details';
const { filmDetailsRef } = refs();

filmDetailsRef.filmDetailsModalClose.addEventListener('click', onCloseModal);
filmDetailsRef.modalBackdrop.addEventListener('click', onBackdropClick);
filmDetailsRef.filmDetailsModalContainer.addEventListener('click', onFilmClick);
console.log(filmDetailsRef.modalBackdrop);

export function onOpenModal() {
  window.addEventListener('keydown', onCloseModalByEscape);
  document.body.classList.add('show-modal');
  filmDetailsRef.filmDetailsModal.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseModalByEscape);
  document.body.classList.remove('show-modal');
  filmDetailsRef.filmDetailsModal.classList.add('is-hidden');
  document.body.style.overflow = '';
  clearImgSrc();
}

function onBackdropClick(event) {
  console.log(event.target);
  console.log('Клик по бекдропу');
  onCloseModal();
}

function onCloseModalByEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
