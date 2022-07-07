import apiConfig from '../constants/api-config';

const { IMAGE_BASE_URL } = apiConfig;

export function createSingleMovieMarkup(movie, listOfGenres, movieYear) {
  return `<li class="gallery-card" data-id ="${movie.id}">
<a class="gallery-card__item">
            <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${
    movie.title
  }"  class="gallery-card__image" >
<p class="gallery-card__name">${movie.title}</p>
<p class="gallery-card__genre">${listOfGenres} | ${movieYear}<span class="gallery-card__span"></span></p>
</a>        
	    </li>`;
}
