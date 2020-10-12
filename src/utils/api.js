/*global chrome*/

// import { getLocalStorage, setLocalStorage } from './localStorage';

export const getItemsApi = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('hhItems', (data) => {
      if(data && data.hhItems) {
        resolve(data.hhItems);
      } else {
        reject(false)
      }
    })
  });
}

export const saveItemsApi = (params) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({'hhItems': params});

    resolve(true);
  });
}
