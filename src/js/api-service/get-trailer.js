import apiConfig from '../constants/api-config';
import { refs } from '../refs/refs';

const { languageSelect } = refs().panel;

let lang;

if (languageSelect.value === 'en') {
  lang = 'en-US';
} else if (languageSelect.value === 'uk') {
  lang = 'uk-UA';
} else if (languageSelect.value === 'ru') {
  lang = 'ru-RU';
}

const { API_KEY, API_BASE_URL } = apiConfig;

export async function getTrailer(filmID) {
  try {
    const response = await fetch(
      // `https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&language=en-US`
      `${API_BASE_URL}/movie/${filmID}/videos?api_key=${API_KEY}&language=${lang}`
    );
    if (!response.ok) {
      const respJson = await response.json();
      throw new Error(respJson.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

console.log(getTrailer(560057));

// this function getTrailer must be called in the function of modal-card rendering
//like
//   async function renderMoviecard(filmID) {
//   const movieInfo = await getCardInfo(filmID);
//
//   const trailer = await getTrailer(filmID);
//with adding next chekings before the rendering card

////!!!!!!!!!!!!!
// let offTrailer;

// if (trailer.success === false) {
//
//   offTrailer = 'n4rhAy3ueVE'; //cats video
// } else {
//   // let offTrailer;
//   const trailerResult = trailer.results.find(trailer => {
//     if (
//       trailer.name.includes('Official') ||
//       trailer.name.includes('Trailer') ||
//       trailer.name.includes('official') ||
//       trailer.name.includes('trailer')
//     ) {
//       return trailer;
//     } else if (
//       trailer.name.includes('teaser') ||
//       trailer.name.includes('Teaser')
//     ) {
//       return trailer;
//     } else if (trailer.type === 'Trailer') {
//       return trailer;
//     }
//   });

//   console.log(trailerResult.key);
//   offTrailer = trailerResult.key;
// }

//and this result must be sent into the card render function as a second option

//  refs.movieCard.innerHTML = renderSingleMovieCard(movieInfo, offTrailer);
