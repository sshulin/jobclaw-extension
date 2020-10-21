import chromeStorage from './chromeStorage';
import currencyApi from './currencyApi';

import { v4 as uuidv4 } from 'uuid';

const api = {

  initDefaultVacancy: (defaultList) => {
    api.getVacancyList().then((list) => {
      if(!list) {
        api.updateVacancyList(defaultList).then();
      }
    }).catch(() => {
      api.updateVacancyList(defaultList).then();
    });
  },

  getVacancyList: () => {
    return new Promise((resolve, reject) => {
      chromeStorage.getVacancyList((data) => {
        if(data) {
          resolve(data);
        } else {
          reject([])
        }
      })
    });
  },

  getVacancyItem: (uuid) => {
    return new Promise((resolve, reject) => {
      chromeStorage.getVacancyList((list) => {
        const item = list.filter((innerItem) => innerItem.uuid === uuid)[0];

        if(item) {
          resolve(item);
        } else {
          reject(false);
        }
      })
    })
  },

  updateVacancyList: (params) => {
    return new Promise((resolve, reject) => {
      chromeStorage.updateVacancyList(params);

      resolve(true);
    });
  },

  createVacancyItem: (data) => {
    return new Promise((resolve, reject) => {
      api.getVacancyList().then((oldList) => {
        const newList = [...oldList, {
          ...data,
          uuid: uuidv4()
        }];

        api.updateVacancyList(newList).then((finalResult) => {
          if(resolve) resolve();
        });
      });
    });
  },

  deleteVacancyItemByAttr: (attr, value) => {
    return new Promise((resolve, reject) => {
      api.getVacancyList().then((oldList) => {
        const newList = oldList.filter((item) => item[attr] !== value);
        api.updateVacancyList(newList)
          .then(() => {
            resolve()
          })
          .catch(reject);
      })
    });
  },

  deleteVacancyItem: (uuid) => {
    return api.deleteVacancyItemByAttr('uuid', uuid);
  },

  getFavoriteList: () => {
    return new Promise((resolve, reject) => {
      api.getVacancyList()
        .then((list) => {
          resolve(list.filter((item) => item.favorite))
        })
        .catch(reject)
    });
  },

  createFavoriteItem: (data) => {
    return api.createVacancyItem({
      ...data,
      favorite: true
    })
  },

  deleteFavoriteItemByAttr: (attr, value) => {
    return api.deleteVacancyItemByAttr(attr, value);
  },

  deleteFavoriteItem: (uuid) => {
    return api.deleteFavoriteItemByAttr('uuid', uuid);
  },

  getBlacklist: () => {
    return new Promise((resolve, reject) => {
      api.getVacancyList()
        .then((list) => {
          resolve(list.filter((item) => item.blacklist))
        })
        .catch(reject)
    });
  },

  createBlacklistItem: (data) => {
    return api.createVacancyItem({
      ...data,
      blacklist: true
    })
  },

  deleteBlacklistItemByAttr: (attr, value) => {
    return api.deleteVacancyItemByAttr(attr, value);
  },

  deleteBlacklistItem: (uuid) => {
    return api.deleteBlacklistItemByAttr('uuid', uuid);
  },

  initRates: () => {
    api.getRates().then((list) => {
      if(!list) {
        currencyApi.getRates((data) => {
          chromeStorage.updateRates(data.rates);
        });
      }
    }).catch(() => {
      currencyApi.getRates((data) => {
        chromeStorage.updateRates(data.rates);
      });
    });
  },

  getRates: () => {
    return new Promise((resolve, reject) => {
      chromeStorage.getRates((data) => {
        if(data) {
          resolve(data);
        } else {
          reject(false)
        }
      })
    });
  },

}

export default api;
