/*global chrome*/

import { v4 as uuidv4 } from 'uuid';
import hhApi from '../shared/utils/hhApi';

chrome.storage.sync.get('hhItems', (data) => {

  if(!data || !data.hhItems) {
    chrome.storage.sync.set({'hhItems': []});
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(sender.tab) {
      if(request.eventName === 'hhVacancyClicked') {
        hhApi.getVacancy(request.payload.id, (response) => {

          chrome.storage.sync.get('hhItems', (data) => {

            data.hhItems.push({
              title: response.name,
              salary: response.salary,
              company: response.employer.name,
              hhid: request.payload.id,
              uuid: uuidv4()
            });

            chrome.storage.sync.set({'hhItems': data.hhItems});
          })
        })
      }
    }

    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});
