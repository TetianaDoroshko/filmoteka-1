import { refs } from '../refs/refs';
import apiConfig from '../constants/api-config';
import { getDetails } from '../api-service/get-details';

const { filmDetailsRef } = refs();

// // Получить ссылки на эл.
// // принимает data одного фильма и подставляет в соответсвующие елементы значения.

export async function renderModalDetails(data) {
  // const data = await getDetails(movieId);
  const { IMAGE_BASE_URL_1X, IMAGE_BASE_URL_2X } = apiConfig;

  if (!data.poster_path) {
    filmDetailsRef.image.src = '../images/modal-img.jpg';
    filmDetailsRef.image.alt = 'Movie photo';
  }

  filmDetailsRef.image.srcset = `${IMAGE_BASE_URL_1X}${data.poster_path} 1x, ${IMAGE_BASE_URL_2X}${data.poster_path} 2x`;
  filmDetailsRef.image.src = `${IMAGE_BASE_URL_1X}${data.poster_path}`;
  filmDetailsRef.image.alt = data.title;
  filmDetailsRef.title.textContent = data.title;
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
}
