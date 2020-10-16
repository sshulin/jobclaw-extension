import chromeStorage from './chromeStorage';

export const getFavoriteApi = () => {
  return new Promise((resolve, reject) => {
    chromeStorage.getFavoriteList((data) => {
      if(data) {
        resolve(data);
      } else {
        reject([])
      }
    })
  });
}

export const saveFavoriteApi = (params) => {
  return new Promise((resolve, reject) => {
    chromeStorage.updateFavoriteList(params);

    resolve(true);
  });
}
