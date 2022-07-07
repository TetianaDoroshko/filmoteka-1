// возвращает разметку одной карточки
import apiConfig from '../constants/api-config';

const { IMAGE_BASE_URL } = apiConfig;

export function createSingleMovieMarkup(movie, listOfGenres, movieYear) {
  const movieName = movie.name || movie.original_title;

  return `<li class="gallery-card" data-id ="${movie.id}">
<a href="#" class="gallery-card__link">
            <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${
    movie.original_title
  }"  class="gallery-card__image" >
  <div class="gallery-card__info">
<p class="gallery-card__name">${movieName}</p>
<p class="gallery-card__genre">${listOfGenres} | ${movieYear}</p>
</div>
</a>
	    </li>`;
}
