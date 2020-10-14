/*global chrome*/

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

chrome.storage.sync.get('hhItems', (data) => {

  if(!data || !data.hhItems) {
    chrome.storage.sync.set({'hhItems': []});
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(sender.tab) {
      if(request.eventName === 'hhVacancyClicked') {
        axios.get('https://api.hh.ru/vacancies/' + request.payload.id).then((response) => {

          chrome.storage.sync.get('hhItems', (data) => {

            data.hhItems.push({
              title: response.data.name,
              salary: response.data.salary,
              company: response.data.employer.name,
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
