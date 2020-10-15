/*global chrome*/

import hhApi from '../shared/utils/hhApi';
import chromeStorage from '../shared/utils/chromeStorage';

chromeStorage.getFavoriteList((favorite) => {
  if(!favorite) {
    chromeStorage.updateFavoriteList([]);
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(sender.tab) {
      if(request.eventName === 'hhVacancyClicked') {
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
      }
    }

    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});
