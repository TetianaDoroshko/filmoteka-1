// import apiConfig from '../constants/api-config';

// const { API_KEY, API_BASE_URL, DETAILS_PATH_PARAMS } = apiConfig;

// export async function getDetails(id) {
//   const url = new URL(API_BASE_URL + DETAILS_PATH_PARAMS + id);
//   url.searchParams.set('api_key', API_KEY);
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       const respJson = await response.json();
//       throw new Error(respJson.status_message);
//     }
//     const movieInfo = await response.json();
//     return movieInfo;
//   } catch (error) {
//     console.log(error);
//     return 1;
//   }
// }

// console.log('getDetails', getDetails('496450'));
