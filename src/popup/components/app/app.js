/*global chrome*/

import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage, AnotherPage, BlacklistPage, VacancyDetailPage } from '../pages';
import Navbar from '../core/navbar';

const App = () => {


  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        // if (request.greeting == "hello")
          // sendResponse({farewell: "goodbye"});
        sendResponse({farewell: 'assss'})
    });
  })

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__navbar">
           <Navbar />
        </div>
      </div>
      <div className="app__body">
        <div className="app__content">
          <Switch>
            <Route
              path='/'
              render={() => {
                return (<Redirect to="/home" />)
              }}
              exact
            />
            <Route
              path='/home'
              component={HomePage}
            />
            <Route
              path='/another'
              component={AnotherPage}
            />
            <Route
              path='/blacklist'
              component={BlacklistPage}
            />
            <Route
              path='/vacancy/detail/:uuid'
              component={VacancyDetailPage}
            />
          </Switch>
        </div>
      </div>
    </div>
  )
};

export default App;
