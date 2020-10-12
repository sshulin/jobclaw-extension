/*global chrome*/

chrome.storage.sync.get('hhItems', (data) => {

  if(!data || !data.hhItems) {
    chrome.storage.sync.set({'hhItems': []});
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(sender.tab) {
      if(request.eventName === 'hhVacancyClicked') {
        chrome.storage.sync.get('hhItems', (data) => {

          data.hhItems.push(request.payload);

          chrome.storage.sync.set({'hhItems': data.hhItems});
        })
      }
    }

    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});
