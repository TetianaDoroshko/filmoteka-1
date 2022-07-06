// Для подстановки динамических данных нужно сделать запрос getDetails() передать id
// и использовать функцию из файла render-details для их отрисовки
//
// нужно при открытии вызывать функцию реализованую в файлах queue или watched которая проверяет
// есть ли фильм в хранилище и подсвечивает кнопки.

import { refs } from './refs/refs';
import api from './api-service/get-details';
import apiConfig from './constants/api-config';
import { getDetails } from './api-service/get-details';

const { filmDetailsRef } = refs();

// const btn = document.querySelector('.modal-btn');

// btn.addEventListener('click', renderModalDetails);

export async function renderModalDetails() {
  const data = await getDetails('496450');
  const imgUrl = apiConfig.IMAGE_BASE_URL;

  if (!data.poster_path) {
    filmDetailsRef.image.src = '../images/modal-img.jpg';
    filmDetailsRef.image.alt = 'Movie photo';
  }

  filmDetailsRef.image.src = `${imgUrl}${data.poster_path}`;
  filmDetailsRef.image.alt = data.title;
  filmDetailsRef.title.textContent = data.title;
  filmDetailsRef.voteAverage.textContent = data.vote_average;
  filmDetailsRef.voteCount.textContent = data.vote_count;
  filmDetailsRef.popularity.textContent = Number(data.popularity.toFixed(1));
  filmDetailsRef.originTitle.textContent = data.original_title;

  let genre = data.genres.map(genre => genre.name);
  const genreList = genre.slice(0, 2);

  if (genre.length > 2) {
    genreList.push('Others');
  }
  genre = genreList.join(', ');

  filmDetailsRef.genres.textContent = genre;
  filmDetailsRef.about.textContent = data.overview;
}
