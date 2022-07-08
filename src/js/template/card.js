// возвращает разметку одной карточки
import apiConfig from '../constants/api-config';
import defaultImg1x from '../../images/img-default@1x.jpg';
import defaultImg2x from '../../images/img-default@2x.jpg';

const { IMAGE_BASE_URL_1X, IMAGE_BASE_URL_2X } = apiConfig;

export function createSingleMovieMarkup(movie, listOfGenres, movieYear) {
  const movieName =
    movie.title || movie.name || movie.original_name || movie.original_title;

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

  return `<li class="gallery-card" data-id ="${movie.id}">
<a href="#" class="gallery-card__link">
            <img srcset="${imgSrcset}"
  src="${imgSrc}" alt="${movie.original_title}"  class="gallery-card__image" >
  <div class="gallery-card__info">
<p class="gallery-card__name">${movieName}</p>
<p class="gallery-card__genre">${listOfGenres} | ${movieYear}</p>
</div>
</a>
	    </li>`;
}
