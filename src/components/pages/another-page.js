import React from 'react';

import { NavLink } from 'react-router-dom';

const AnotherPage = () => {

  // const chromeAction = () => {
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     console.log(tabs);
  //     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
  //     });
  //   });
  // }

  return (
    <div className="page">
      <div className="page__wrapper">
        <div className="page__title">
          <div>Another page</div>
        </div>
        <div className="page__section">
          <div className="home">
            <div className="home__page-list">
              <div className="home__page-item">
                <NavLink
                  className="home__page-link"
                  to="/"
                >
                  Home
                </NavLink>
              </div>
              <div className="home__page-item">
                <NavLink
                  className="home__page-link"
                  to="/another"
                >
                  Another
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnotherPage;