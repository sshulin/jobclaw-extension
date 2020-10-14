/*global chrome*/

import { v4 as uuidv4 } from 'uuid';
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

          chromeStorage.getFavoriteList((favorite) => {
            favorite.push({
              title: response.name,
              salary: response.salary,
              company: response.employer.name,
              hhid: request.payload.id,
              uuid: uuidv4()
            });

            chromeStorage.updateFavoriteList(favorite);
          });
        })
      }
    }

    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});
