/*global chrome*/

import hhApi from '../shared/utils/hhApi';
import chromeStorage from '../shared/utils/chromeStorage';

chromeStorage.getFavoriteList((favorite) => {
  if(!favorite) {
    chromeStorage.updateFavoriteList([]);
  }
})
chromeStorage.getBlacklist((blacklist) => {
  if(!blacklist) {
    chromeStorage.updateBlacklist([]);
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(sender.tab) {
      if(request.eventName === 'hhVacancyFavoriteClicked') {
        hhApi.getVacancy(request.payload.id, (response) => {

          chromeStorage.getFavoriteList((favoriteList) => {

            const favoriteIndex = favoriteList.map((favorite) => favorite.hhid).indexOf(request.payload.id)

            if(favoriteIndex === -1) {
              chromeStorage.createFavorite({
                title: response.name,
                salary: response.salary,
                company: response.employer.name,
                hhid: request.payload.id
              });
            } else {
              const newFavoriteList = favoriteList.filter((item) => item.hhid !== request.payload.id);

              chromeStorage.updateFavoriteList(newFavoriteList);
            }
          })
        })
      } else if(request.eventName === 'hhVacancyBlacklistClicked') {
        hhApi.getVacancy(request.payload.id, (response) => {

          chromeStorage.getBlacklist((blacklist) => {

            const blacklistIndex = blacklist.map((blacklistItem) => blacklistItem.hhid).indexOf(request.payload.id)

            if(blacklistIndex === -1) {
              chromeStorage.createBlacklistItem({
                title: response.name,
                salary: response.salary,
                company: response.employer.name,
                hhid: request.payload.id
              });
            } else {
              const newBlacklist = blacklist.filter((item) => item.hhid !== request.payload.id);

              chromeStorage.updateBlacklist(newBlacklist);
            }
          })
        })
      }
    }

    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});
