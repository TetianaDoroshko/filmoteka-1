import apiConfig from '../constants/api-config';

const { IMAGE_BASE_URL } = apiConfig;

export function createSingleMovieMarkup(movie) {
  let genres = movie.genres.map(el => el.name);
  if (genres.length > 3) {
    genres = [genres[0], genres[1], 'Other'].join(', ');
  }

  return `
  <li class="gallery-card" data-id ="${movie.id}">
    <a href="#" class="gallery-card__item">
      <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${
    movie.title
  }"  class="gallery-card__image" >
      <div class="gallery-card__info">
        <p class="gallery-card__name">${movie.title}</p>
        <p class="gallery-card__genre">${genres} | ${Number.parseInt(
    movie.release_date
  )}
        </p>
      </div>
    </a>        
	</li>`;
}
