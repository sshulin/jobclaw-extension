import chromeStorage from './chromeStorage';

import { v4 as uuidv4 } from 'uuid';

const api = {

  getFavoriteList: () => {
    return new Promise((resolve, reject) => {
      chromeStorage.getFavoriteList((data) => {
        if(data) {
          resolve(data);
        } else {
          reject([])
        }
      })
    });
  },

  updateFavoriteList: (params) => {
    return new Promise((resolve, reject) => {
      chromeStorage.updateFavoriteList(params);

      resolve(true);
    });
  },

  createFavoriteItem: (data) => {
    return new Promise((resolve, reject) => {
      api.getFavoriteList().then((oldList) => {
        const newList = [...oldList, {
          ...data,
          uuid: uuidv4()
        }];

        api.updateFavoriteList(newList).then((finalResult) => {
          if(resolve) resolve();
        });
      });
    });
  },

  getBlacklist: () => {
    return new Promise((resolve, reject) => {
      chromeStorage.getBlacklist((data) => {
        if(data) {
          resolve(data);
        } else {
          reject([])
        }
      })
    });
  },

  updateBlacklist: (params) => {
    return new Promise((resolve, reject) => {
      chromeStorage.updateBlacklist(params);

      resolve(true);
    });
  },
  createBlacklistItem: (data) => {
    return new Promise((resolve, reject) => {
      api.getBlacklist().then((oldList) => {
        const newList = [...oldList, {
          ...data,
          uuid: uuidv4()
        }];

        api.updateBlacklist(newList).then((finalResult) => {
          if(resolve) resolve();
        });
      })
    })
  },

}

export default api;
