import storageConfig from '../constants/storage-config';

// const STORAGE_KEY = key;

// Запись, удаление и получение данных из хранилища
// getStorage() принимает ключ и возвращает распаршенный массив.
//
export function getStorage(key) {
  const saveData = localStorage.getItem(key);

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
    if (savedData.includ(value)) {
      return
    }
    newData = [...savedData, value];
  }
  else {
    newData = [value];
  }
  localStorage.setItem(key, JSON.stringify(newData));
}

setStorage('test',123)
setStorage('test',12333)
// setStorage('person', object)
// setStorage(JSON.stringify(person))
// setStorage('test1', 12);
// setStorage('test2', 343);
// deleteStorage() принимает ключ, значение.Ищет данные по ключу,
// если они есть то вытягивает их, удаляет значение из массива и записывает обратно.



deleteStorage('test',123);

export function deleteStorage(key, value) {
  const savedData = getStorage(key);
  let newData = [];

  if (savedData) {
    
    const deleteId = savedData.filter(el => el !== value)
    newData = [...deleteId];
  } 

  localStorage.setItem(key, JSON.stringify(newData));
}
