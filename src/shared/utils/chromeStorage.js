/*global chrome*/

import { v4 as uuidv4 } from 'uuid';

const chromeStorage = {
  getFavoriteList: (callback) => {
    chrome.storage.sync.get('favorite', (data) => {
      if(data && data.favorite) {
        if(callback) callback(data.favorite);
      } else {
        return false
      }
    })
  },
  updateFavoriteList: (data, callback) => {
    chrome.storage.sync.set({'favorite': data});
    if(callback) callback();
  },
  createFavorite: (data, callback) => {
    chromeStorage.getFavoriteList((favoriteList) => {
      const newList = [...favoriteList, {
        ...data,
        uuid: uuidv4()
      }];

      chromeStorage.updateFavoriteList(newList)
    })
  },
  subscribe: (callback) => {
    chrome.storage.onChanged.addListener(() => {
      if(callback) callback();
    });
  }
}

export default chromeStorage;
