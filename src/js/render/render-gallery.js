import { refs } from '../refs/refs';
import apiConfig from '../constants/api-config';

// import {функция} from '../template/card'
// Принимает data, и подставляет значения в шаблон карточки.
// для получения списка жанров нужно передать массив IDs в функцию getNameGenres() которая их обработает и вернет строку.

// функция должна запускаться после прорисовки DOM

async function renderMovies() {
  const movies = await getPopularMovies(); // функция, которая делает запрос на популярные фильмы и возвращает DATA из 20 фильмов
  //   console.log('this is movies=', movies);
  //   console.log('this is movies.result=', movies.results);

  refs.moviesDiv.innerHTML = movies.results
    .map(movie => renderSingleMovie(movie)) // obrabotka sozdaniya 1 karto4ki
    .join('');
}

function renderSingleMovie(movie) {
  //   console.log(movie.id);
  // console.log(movie.genre_ids.length);
  // console.log('inside', genresList);
  //   console.log(movie.genre_ids);
  // const genresName = movie.genre_ids.map(el => genresList[el]);
  const genresName = [];
  movie.genre_ids.forEach(el => {
    if (genresList[el]) {
      genresName.push(genresList[el]); // genresList -объект, созданный при старте кода. находится в get-name-genres
    }
  });

  if (genresName.length === 0) {
    genresName.push('N/A');
  }
  if (genresName.length > 3) {
    genresName.splice(3);
    genresName[2] = 'Other';
  }
  //   console.log(genresName);

  const listOfGenres = genresName.map(el => `${el}`).join(', ');
  //   console.log(listOfGenres);
  // let listOfGenres = movie.genre_ids.map(el => `${el}`).join(',');
  // console.log(listOfGenres);
  // console.log(movie.genre_ids);

  let movieYear;
  if (movie.release_date) {
    movieYear = Number.parseInt(movie.release_date);
  } else {
    movieYear = Number.parseInt(movie.first_air_date);
  }

  if (movie.name) {
    return ` <div class="">
            <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${
      movie.original_title
    }" data-id ="${movie.id}" class="" ><p class="">${
      movie.name
    }</p><p class="">${listOfGenres} | ${movieYear}</p>
        </div>`;
  } else {
    return ` <div class="">
            <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${
      movie.original_title
    }" data-id ="${movie.id}" class="" ><p class="">${movie.original_title}</p>
    <p class="">${listOfGenres} | ${movieYear}</p>
        </div>`;
  }
}