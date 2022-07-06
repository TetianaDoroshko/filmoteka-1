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

export function setSessionStorage(key, value = true) {
  const storageValue = {
    [key]: value,
  };

  try {
    const strData = JSON.stringify(storageValue);
    sessionStorage.setItem(CURRENT_QUERY, strData);
  } catch (error) {
    console.log(error);
  }
}

// export default { getSessionStorage, setSessionStorage };
