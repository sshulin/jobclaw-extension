/*global chrome*/

const chromeStorage = {
  getFavoriteList: (callback) => {
    chrome.storage.sync.get('favorite', (data) => {
      if(data && data.favorite) {
        if(callback) callback(data.favorite);
      } else {
        callback(false)
      }
    })
  },
  updateFavoriteList: (data, callback) => {
    chrome.storage.sync.set({'favorite': data});
    if(callback) callback();
  },


  getBlacklist: (callback) => {
    chrome.storage.sync.get('blacklist', (data) => {
      if(data && data.blacklist) {
        if(callback) callback(data.blacklist);
      } else {
        callback(false)
      }
    })
  },
  updateBlacklist: (data, callback) => {
    chrome.storage.sync.set({'blacklist': data});
    if(callback) callback();
  },

  subscribe: (callback) => {
    chrome.storage.onChanged.addListener(() => {
      if(callback) callback();
    });
  }
}

export default chromeStorage;
