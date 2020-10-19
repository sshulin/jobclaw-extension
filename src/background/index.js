/*global chrome*/

import hhApi from '../shared/utils/hhApi';
import api from '../shared/utils/api';

import hhToAppVacancy from '../shared/mappers/hhToAppVacancy';

api.initDefaultFavorite([]);
api.initDefaultBlacklist([]);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(sender.tab) {
      if(request.eventName === 'hhVacancyFavoriteClicked') {
        hhApi.getVacancy(request.payload.id, (response) => {

          api.getFavoriteList().then((favoriteList) => {

            const favoriteIndex = favoriteList.map((favorite) => favorite.hhid).indexOf(request.payload.id)

            if(favoriteIndex === -1) {
              api.createFavoriteItem(hhToAppVacancy(response)).then();
            } else {
              const newFavoriteList = favoriteList.filter((item) => item.hhid !== request.payload.id);

              api.updateFavoriteList(newFavoriteList).then();
            }
          })
        })
      } else if(request.eventName === 'hhVacancyBlacklistClicked') {
        hhApi.getVacancy(request.payload.id, (response) => {

          api.getBlacklist().then((blacklist) => {

            const blacklistIndex = blacklist.map((blacklistItem) => blacklistItem.hhid).indexOf(request.payload.id)

            if(blacklistIndex === -1) {
              api.createBlacklistItem(hhToAppVacancy(response)).then();
            } else {
              const newBlacklist = blacklist.filter((item) => item.hhid !== request.payload.id);

              api.updateBlacklist(newBlacklist);
            }
          })
        })
      }
    }

    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});
