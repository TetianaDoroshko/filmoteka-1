import { refs } from './refs/refs';
import { notify } from './notify';
import { getTrailer } from './api-service/get-trailer';
import { showLoader, hideLoader } from './loader/loader';
import langs from './language/language-map';

const { languageSelect } = refs().panel;

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

  const trailerName = dataTrailer.results.find(trailer => {
    const nameNormalized = trailer.name.toLowerCase();
    const findArr = [
      'official',
      'trailer',
      'трейлер',
      'официальный',
      'офіційний',
    ];

    const isIquel = findArr.some(el => nameNormalized.includes(el));

    if (isIquel) {
      return true;
    } else {
      return false;
    }
  });

  const teaserName = dataTrailer.results.find(trailer => {
    const nameNormalized = trailer.name.toLowerCase();
    const findArr = ['teaser', 'тизер'];

    const isIquel = findArr.some(el => nameNormalized.includes(el));

    if (isIquel) {
      return true;
    } else {
      return false;
    }
  });

  const trailerType = dataTrailer.results.find(trailer => {
    const nameNormalized = trailer.type.toLowerCase();
    const find = 'trailer';

    if (nameNormalized === find) {
      return true;
    } else {
      return false;
    }
  });

  const teaserType = dataTrailer.results.find(trailer => {
    const nameNormalized = trailer.type.toLowerCase();
    const find = 'teaser';

    if (nameNormalized === find) {
      return true;
    } else {
      return false;
    }
  });

  const any = dataTrailer.results.find(el => el.key);

  const trailer = trailerName || teaserName || trailerType || teaserType || any;

  if (!trailer) {
    const text = langs.trailer[languageSelect.value];

    notify(text);
    hideLoader();
    return;
  }

  const markup = `
  <iframe width="800" height="420" src="https://www.youtube.com/embed/${trailer.key}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>`;

  modalTrailerRef.modalTrailer.innerHTML = markup;

  hideLoader();
  onOpenModal();
}
