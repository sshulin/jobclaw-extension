/*global chrome*/

const chromeStorage = {

  getVacancyList: (callback) => {
    chrome.storage.local.get('vacancy', (data) => {
      if(data && data.vacancy) {
        if(callback) callback(data.vacancy);
      } else {
        callback(false)
      }
    })
  },
  updateVacancyList: (data, callback) => {
    chrome.storage.local.set({'vacancy': data});
    if(callback) callback();
  },

  subscribe: (callback) => {
    chrome.storage.onChanged.addListener(() => {
      if(callback) callback();
    });
  }
}

export default chromeStorage;
