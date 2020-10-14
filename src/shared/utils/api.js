import chromeStorage from './chromeStorage';

export const getItemsApi = () => {
  return new Promise((resolve, reject) => {
    chromeStorage.getFavoriteList((data) => {
      if(data) {
        resolve(data);
      } else {
        reject(false)
      }
    })
  });
}

export const saveItemsApi = (params) => {
  return new Promise((resolve, reject) => {
    chromeStorage.updateFavoriteList({'favorite': params});

    resolve(true);
  });
}
