/*global chrome*/

import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FavoritePage, AnotherPage, BlacklistPage, VacancyDetailPage } from '../pages';
import Navbar from '../core/navbar';

import { fetchRates } from '../../actions';

import { connect } from 'react-redux';

const App = ({ fetchRates }) => {


  useEffect(() => {
    fetchRates();
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
                return (<Redirect to="/favorite" />)
              }}
              exact
            />
            <Route
              path='/favorite'
              component={FavoritePage}
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


const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  fetchRates
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
