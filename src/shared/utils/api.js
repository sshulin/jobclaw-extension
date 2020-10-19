import chromeStorage from './chromeStorage';

import { v4 as uuidv4 } from 'uuid';

const api = {

  initDefaultFavorite: (defaultList) => {
    api.getFavoriteList().then((list) => {
      if(!list) {
        api.updateFavoriteList(defaultList).then();
      }
    }).catch(() => {
      api.updateFavoriteList(defaultList).then();
    });
  },

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

  deleteFavoriteItemByAttr: (attr, value) => {
    return new Promise((resolve, reject) => {
      api.getFavoriteList().then((oldList) => {
        const newList = oldList.filter((item) => item[attr] !== value);
        api.updateFavoriteList(newList)
          .then(() => {
            resolve()
          })
          .catch(reject);
      })
    });
  },

  deleteFavoriteItem: (uuid) => {
    return api.deleteFavoriteItemByAttr('uuid', uuid);
  },

  initDefaultBlacklist: (defaultList) => {
    api.getBlacklist().then((list) => {
      if(!list) {
        api.updateBlacklist(defaultList).then();
      }
    }).catch(() => {
      api.updateBlacklist(defaultList).then();
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

  deleteBlacklistItemByAttr: (attr, value) => {
    return new Promise((resolve, reject) => {
      api.getBlacklist().then((oldList) => {
        const newList = oldList.filter((item) => item[attr] !== value);
        api.updateBlacklist(newList)
          .then(resolve)
          .catch(reject);
      })
    });
  },

  deleteBlacklistItem: (uuid) => {
    return api.deleteBlacklistItemByAttr('uuid', uuid);
  },

}

export default api;
