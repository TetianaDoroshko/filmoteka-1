export function getStorageSetting() {
  const saveData = localStorage.getItem('user-setting');

  try {
    if (saveData) {
      const parsedData = JSON.parse(saveData);
      return parsedData;
    }

    return {};
  } catch (error) {
    console.log(error);
  }
}

export function setStorageSetting(key, value) {
  const savedData = getStorageSetting();
  let newData = {};

  if (savedData) {
    newData = { ...savedData, [key]: value };
  } else {
    newData = { [key]: value };
  }

  const dataJson = JSON.stringify(newData);

  localStorage.setItem('user-setting', dataJson);
}
