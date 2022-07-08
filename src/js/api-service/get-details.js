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

const { API_KEY, API_BASE_URL, DETAILS_PATH_PARAMS } = apiConfig;

export async function getDetails(id) {
  const url = new URL(API_BASE_URL + DETAILS_PATH_PARAMS + id);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', lang);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const respJson = await response.json();
      throw new Error(respJson.status_message);
    }
    const movieInfo = await response.json();
    return movieInfo;
  } catch (error) {
    console.log(error);
  }
}

// console.log('getDetails', getDetails('496450'));
