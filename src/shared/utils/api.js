import chromeStorage from './chromeStorage';

export const getItemsApi = () => {
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

export const saveItemsApi = (params) => {
  return new Promise((resolve, reject) => {
    chromeStorage.updateFavoriteList(params);

    resolve(true);
  });
}
