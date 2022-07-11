// Сделать открытие и закрытие модалки детальной инфы фильма,
// должна закрывать по esc и по клику в бекдроп

import { refs } from './refs/refs';
import { clearImgSrc } from './render/render-details';
import { onFilmClick } from './modal-details';
import { bodyLock, bodyUnlock } from './utils/body-lock';
const { filmDetailsRef } = refs();
const { image } = refs().filmDetailsRef;

filmDetailsRef.filmDetailsModalClose.addEventListener('click', onCloseModal);
filmDetailsRef.modalBackdrop.addEventListener('click', onBackdropClick);
filmDetailsRef.filmDetailsModalContainer.addEventListener('click', onFilmClick);

export function onOpenModal() {
  window.addEventListener('keydown', onCloseModalByEscape);
  filmDetailsRef.filmDetailsModal.classList.remove('is-hidden');
  bodyLock();
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseModalByEscape);
  filmDetailsRef.filmDetailsModal.classList.add('is-hidden');
  clearImgSrc();
  bodyUnlock(250);
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onCloseModalByEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
