import { refs } from '../refs/refs';
import { getNameGenres } from '../utils/get-name-genres';
import { createSingleMovieMarkup } from '../template/card';
const { moviesDiv } = refs().galleryRef;

// import {функция} from '../template/card'
// Принимает data, и подставляет значения в шаблон карточки.
// для получения списка жанров нужно передать массив IDs в функцию getNameGenres() которая их обработает и вернет строку.

// функция должна запускаться после прорисовки DOM

export function renderMovies(movies) {
  // const movies = await getPopularMovies(); // функция, которая делает запрос на популярные фильмы и возвращает DATA из 20 фильмов
  //   console.log('this is movies=', movies);
  //   console.log('this is movies.result=', movies.results);
  // console.log(movies);

  const itemMovie = movies.results
    .map(movie => renderSingleMovie(movie)) // obrabotka sozdaniya 1 karto4ki
    .join('');

  moviesDiv.innerHTML = `<ul class="gallery-container">${itemMovie}</ul>`;
}

function renderSingleMovie(movie) {
  //   console.log(movie.id);
  // console.log(movie.genre_ids.length);
  // console.log('inside', genresList);
  //   console.log(movie.genre_ids);
  // const genresName = movie.genre_ids.map(el => genresList[el]);

  //   console.log(listOfGenres);
  // let listOfGenres = movie.genre_ids.map(el => `${el}`).join(',');
  // console.log(listOfGenres);
  // console.log(movie.genre_ids);

  const listOfGenres = getNameGenres(movie);

  let movieYear;
  if (movie.release_date) {
    movieYear = Number.parseInt(movie.release_date);
  } else {
    movieYear = Number.parseInt(movie.first_air_date);
  }

  const SingleMovieMarkup = createSingleMovieMarkup(
    movie,
    listOfGenres,
    movieYear
  );

  return SingleMovieMarkup;
}
