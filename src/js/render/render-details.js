import { refs } from '../refs/refs';
import apiConfig from '../constants/api-config';
import { getDetails } from '../api-service/get-details';
import defaultImg1x from '../../images/img-default@1x.jpg';
import defaultImg2x from '../../images/img-default@2x.jpg';
import backdropDefault from '../../images/backdropDefault.jpg';
import langs from '../language/language-map';

const { languageSelect } = refs().panel;

const { filmDetailsRef } = refs();

// // Получить ссылки на эл.
// // принимает data одного фильма и подставляет в соответсвующие елементы значения.

export async function renderModalDetails(data) {
  // const data = await getDetails(movieId);
  const { IMAGE_BASE_URL_1X, IMAGE_BASE_URL_2X } = apiConfig;
  const textNotFound = langs.detailsNotFound[languageSelect.value];

  const movieName =
    data.title || data.name || data.original_name || data.original_title;

  if (!data.poster_path) {
    filmDetailsRef.image.srcset = `${defaultImg1x} 1x, ${defaultImg2x} 2x`;
    filmDetailsRef.image.src = defaultImg1x;
    filmDetailsRef.image.alt = 'Movie photo';
  } else {
    filmDetailsRef.image.srcset = `${IMAGE_BASE_URL_1X}${data.poster_path} 1x, ${IMAGE_BASE_URL_2X}${data.poster_path} 2x`;
    filmDetailsRef.image.src = `${IMAGE_BASE_URL_1X}${data.poster_path}`;
  }

  filmDetailsRef.image.alt = movieName;
  filmDetailsRef.title.textContent = movieName;
  filmDetailsRef.voteAverage.textContent = data.vote_average;
  filmDetailsRef.voteCount.textContent = data.vote_count;
  filmDetailsRef.popularity.textContent = Number(data.popularity.toFixed(1));

  if (!data.original_title) {
    filmDetailsRef.originTitle.textContent = textNotFound;
  } else {
    filmDetailsRef.originTitle.textContent = data.original_title;
  }

  if (!data.overview) {
    filmDetailsRef.about.textContent = textNotFound;
  } else {
    filmDetailsRef.about.textContent = data.overview;
  }

  const genre = data.genres.map(genre => genre.name);

  if (genre.length === 0) {
    filmDetailsRef.genres.textContent = textNotFound;
  } else {
    filmDetailsRef.genres.textContent = data.genres
      .map(genre => genre.name)
      .join(', ');
  }
}

export function clearImgSrc() {
  filmDetailsRef.image.src = '#';
  filmDetailsRef.image.srcset = '#';
}
export async function renderModalBackdrop(data) {
  const { IMAGE_BASE_URL_2X } = apiConfig;
  if (data.backdrop_path) {
    // filmDetailsRef.modalBackdrop.style.cssText = `background-image: url(${IMAGE_BASE_URL_2X}${data.backdrop_path});
    //   background-position: center;
    //   background-size: cover;`;
    filmDetailsRef.modalBackdrop.style.setProperty(
      '--defaultBackdrop',
      `url(${IMAGE_BASE_URL_2X}${data.backdrop_path})`
    );
  } else {
    // filmDetailsRef.modalBackdrop.style.cssText = `background-image: url(${backdropDefault});
    //   background-position: center;
    //   background-size: cover;`;
    filmDetailsRef.modalBackdrop.style.setProperty(
      '--defaultBackdrop',
      `url(${backdropDefault})`
    );
  }
}

