import apiConfig from '../constants/api-config';
import { refs } from '../refs/refs';

const { languageSelect } = refs().panel;

const { API_KEY, API_BASE_URL, GENRES_PATH_PARAMS } = apiConfig;

let lang;

if (languageSelect.value === 'en') {
  lang = 'en-US';
} else if (languageSelect.value === 'uk') {
  lang = 'uk-UA';
} else if (languageSelect.value === 'ru') {
  lang = 'ru-RU';
}

export async function getGenres() {
  const url = new URL(API_BASE_URL + GENRES_PATH_PARAMS);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', lang);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const respJson = await response.json();
      throw new Error(respJson.status_message);
    }
    const genres = await response.json();
    return genres;
  } catch (error) {
    console.log(error);
  }
}
// console.log('getGenres', getGenres());

// "ru-RU" "uk-UA" "en-US"
