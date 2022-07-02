import apiConfig from '../constants/api-config';

const { API_KEY, API_BASE_URL, SEARCH_PATH_PARAMS } = apiConfig;

export async function getMoviesByKey(query, page = 1) {
  const url = new URL(API_BASE_URL + SEARCH_PATH_PARAMS);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('page', page);
  url.searchParams.set('query', query);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const respJson = await response.json();
      throw new Error(respJson.status_message);
    }
    const data = await response.json();
    const collection = data.results;
    if (collection.length) {
      return collection;
    } else {
      //   refs.searchInfo.textContent =
      //     'Search result not successful. Enter the correct movie name and try again.';
      //   refs.galleryContainer.innerHTML = '';
      throw new Error('Nothing is found. Wrong query.');
    }
  } catch (error) {
    console.log(error);
  }
}
// console.log('getMoviesByKey', getMoviesByKey('game'));
