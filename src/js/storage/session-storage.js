import storageConfig from '../constants/storage-config';

const { CURRENT_QUERY } = storageConfig;

export function getSessionStorage() {
  try {
    const savedData = sessionStorage.getItem(CURRENT_QUERY);
    const parseData = JSON.parse(savedData);

    return parseData;
  } catch (error) {
    console.log(error);
  }
}

export function setSessionStorage(key, value = true, page = 1) {
  const storageValue = {
    [key]: value,
    page: page,
  };

  try {
    const strData = JSON.stringify(storageValue);
    sessionStorage.setItem(CURRENT_QUERY, strData);
  } catch (error) {
    console.log(error);
  }
}

export function updatePageSessionStorage(page) {
  const savedData = getSessionStorage();

  try {
    savedData.page = page;

    const strData = JSON.stringify(savedData);
    sessionStorage.setItem(CURRENT_QUERY, strData);
  } catch (error) {
    console.log(error);
  }
}

// export default { getSessionStorage, setSessionStorage };
