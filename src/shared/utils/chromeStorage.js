/*global chrome*/

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
  subscribe: (callback) => {
    chrome.storage.onChanged.addListener(() => {
      if(callback) callback();
    });
  }
}

export default chromeStorage;
