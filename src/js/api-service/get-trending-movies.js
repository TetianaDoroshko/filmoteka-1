import apiConfig from '../constants/api-config';

const { API_KEY, API_BASE_URL, TRENDING_PATH_PARAMS } = apiConfig;

export async function getTrendingMovies(page = 1) {
  const url = new URL(API_BASE_URL + TRENDING_PATH_PARAMS);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('page', page);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const respJson = await response.json();
      throw new Error(respJson.status_message);
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log(error);
  }
}

// console.log('getTrendingMovies', getTrendingMovies());
