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

          chromeStorage.createFavorite({
            title: response.name,
            salary: response.salary,
            company: response.employer.name,
            hhid: request.payload.id
          });
        })
      }
    }

    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});
