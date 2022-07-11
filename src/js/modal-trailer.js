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
  const arrLangs = ['en-US', 'uk-UA', 'ru-RU'];
  const currentLang = arrLangs.find(el => el.includes(languageSelect.value));
  const withoutCurrent = arrLangs.filter(el => el !== currentLang);
  const langs = [currentLang, ...withoutCurrent];

  let dataTrailer;

  for (let i = 0; i < 3; i += 1) {
    dataTrailer = await getTrailer(idMovie, langs[i]);

    // console.log(dataTrailer.results);

    if (dataTrailer.results.length > 0) {
      break;
    }
  }

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

    return isIquel;
  });

  const teaserName = dataTrailer.results.find(trailer => {
    const nameNormalized = trailer.name.toLowerCase();
    const findArr = ['teaser', 'тизер'];

    const isIquel = findArr.some(el => nameNormalized.includes(el));

    return isIquel;
  });

  const trailerType = dataTrailer.results.find(trailer => {
    const nameNormalized = trailer.type.toLowerCase();
    const find = 'trailer';

    return nameNormalized === find;
  });

  const teaserType = dataTrailer.results.find(trailer => {
    const nameNormalized = trailer.type.toLowerCase();
    const find = 'teaser';

    return nameNormalized === find;
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
  <iframe width="854" height="480" src="https://www.youtube.com/embed/${trailer.key}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>`;

  modalTrailerRef.modalTrailer.innerHTML = markup;

  hideLoader();
  onOpenModal();
}
