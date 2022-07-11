import { refs } from './refs/refs';
import { notify } from './notify';
import { getTrailer } from './api-service/get-trailer';
import { showLoader, hideLoader } from './loader/loader';

const { modalTrailerRef } = refs();

modalTrailerRef.modalTrailer.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onCloseModalByEscape);
  modalTrailerRef.modalTrailer.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseModalByEscape);
  modalTrailerRef.modalTrailer.classList.add('is-hidden');

  modalTrailerRef.modalTrailer.innerHTML = '';
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

export async function createIframe(idMovie) {
  showLoader();
  const dataTrailer = await getTrailer(idMovie);

  const trailerKey = dataTrailer.results.find(el => el.key);
  console.log(trailerKey);

  if (!trailerKey) {
    notify('Sorry, trailer not fount');
    hideLoader();
    return;
  }
  console.log('yaya');

  const markup = `
  <iframe width="800" height="420" src="https://www.youtube.com/embed/${trailerKey.key}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>`;

  modalTrailerRef.modalTrailer.innerHTML = markup;

  hideLoader();
  onOpenModal();
}
