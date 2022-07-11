import { refs } from '../refs/refs';
import apiConfig from '../constants/api-config';
import { getDetails } from '../api-service/get-details';
import defaultImg1x from '../../images/img-default@1x.jpg';
import defaultImg2x from '../../images/img-default@2x.jpg';
import backdropDefault from '../../images/backdropDefault.jpg';

const { filmDetailsRef } = refs();

// // Получить ссылки на эл.
// // принимает data одного фильма и подставляет в соответсвующие елементы значения.

export async function renderModalDetails(data) {
  // const data = await getDetails(movieId);
  const { IMAGE_BASE_URL_1X, IMAGE_BASE_URL_2X } = apiConfig;

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
  filmDetailsRef.originTitle.textContent = data.original_title;

  // let genre = data.genres.map(genre => genre.name);
  // const genreList = genre.slice(0, 2);

  // if (genre.length > 2) {
  //   genreList.push('Others');
  // }
  // genre = genreList.join(', ');

  filmDetailsRef.genres.textContent = data.genres
    .map(genre => genre.name)
    .join(', ');
  filmDetailsRef.about.textContent = data.overview;
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
