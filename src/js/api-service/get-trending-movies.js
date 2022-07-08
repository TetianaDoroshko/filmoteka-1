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

const { API_KEY, API_BASE_URL, TRENDING_PATH_PARAMS } = apiConfig;

export async function getTrendingMovies(page = 1) {
  const url = new URL(API_BASE_URL + TRENDING_PATH_PARAMS);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('page', page);
  url.searchParams.set('language', lang);

  try {
    const response = await fetch(url);
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

// console.log('getTrendingMovies', getTrendingMovies());
