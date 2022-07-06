import storageConfig from '../constants/storage-config';

// const STORAGE_KEY = key;

// Запись, удаление и получение данных из хранилища
// getStorage() принимает ключ и возвращает распаршенный массив.
//
export function getStorage(key) {
  const saveData = localStorage.getItem(key) ?? [];

  try {
    const parsedData = JSON.parse(saveData);
    return parsedData;
  } catch (error) {
    console.log(error);
  }
}
// console.log(getStorage('test'));

// setStorage('test', 12);
// setStorage('test', 122);
// setStorage() принимает ключ, значение. Ищет данные по ключу,
// если они есть то вытягивает их, добавляет новое значение в массив и записывает обратно.
// если нету, то добавляет значение в массив и записывает в хранилище.
//
export function setStorage(key, value) {
  const savedData = getStorage(key);
  let newData = [];

  if (savedData) {
    newData = [...savedData, value];
  } else {
    newData.push(value);
  }
  localStorage.setItem(key, JSON.stringify(newData));
}
// setStorage();
// deleteStorage() принимает ключ, значение.Ищет данные по ключу,
// если они есть то вытягивает их, удаляет значение из массива и записывает обратно.

// deleteStorage('test', 12);

export function deleteStorage(key, value) {
  const deletData = getStorage(key);
  let newData = [];

  if (deletData) {
    localStorage.removeItem(key);
  } else {
    newData.push(value);
  }

  localStorage.setItem(key, JSON.stringify(newData));
}
