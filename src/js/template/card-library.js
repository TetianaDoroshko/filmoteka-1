import apiConfig from '../constants/api-config';
import defaultImg1x from '../../images/img-default@1x.jpg';
import defaultImg2x from '../../images/img-default@2x.jpg';

const { IMAGE_BASE_URL_1X, IMAGE_BASE_URL_2X } = apiConfig;

export function createSingleMovieMarkup(movie) {
  let genres = movie.genres.map(el => el.name);
  // console.log(genres);

  if (genres.length > 3) {
    genres = [genres[0], genres[1], 'Other'].join(', ');
  } else {
    genres = genres.join(', ');
  }

  let imgSrcset;
  let imgSrc;

  if (movie.poster_path) {
    imgSrcset = `${IMAGE_BASE_URL_1X + movie.poster_path} 1x,${
      IMAGE_BASE_URL_2X + movie.poster_path
    } 2x`;

    imgSrc = `${IMAGE_BASE_URL_1X + movie.poster_path}`;
  } else {
    imgSrcset = `${defaultImg1x} 1x, ${defaultImg2x} 2x`;
    imgSrc = defaultImg1x;
  }

  const movieName =
    movie.title || movie.name || movie.original_name || movie.original_title;

  console.log(movie);
  return `
  <li class="gallery-card" data-id ="${movie.id}">
    <a href="#" class="gallery-card__item">
      <img srcset="${imgSrcset}"
  src="${imgSrc}" alt="${movieName}"  class="gallery-card__image" loading="lazy">
      <div class="gallery-card__info">
        <p class="gallery-card__name">${movieName}</p>
        <p class="gallery-card__genre">${genres} | ${
    Number.parseInt(movie.release_date) || 'N/A'
  }   <span class="film-details__span--accent">${movie.vote_average}</span>
        </p>
      </div>
    </a>        
	</li>`;
}
