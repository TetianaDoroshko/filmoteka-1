async function getTrailer(filmID) {
  let data;
  try {
    const response = await fetch(
      // `https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&language=en-US`
      `https://api.themoviedb.org/3/movie/${filmID}/videos?api_key=${API_KEY}&language=en-US`
    );

    const responseData = await response.json();

    data = responseData;
  } catch (error) {
    console.log(error);
  }
  return data;
}
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
