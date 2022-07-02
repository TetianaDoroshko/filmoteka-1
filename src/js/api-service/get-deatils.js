import apiConfig from '../constants/api-config';
//export function getDetails()

const { API_KEY, API_BASE_URL, DETAILS_PATH_PARAMS } = apiConfig;

async function getDetails(id) {
  try {
    const url = new URL(API_BASE_URL + DETAILS_PATH_PARAMS + id);
    url.searchParams.set('api_key', API_KEY);

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

console.log(getDetails('496450'));
