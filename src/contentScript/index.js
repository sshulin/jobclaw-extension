/*global window*/

import './hhru/hh.scss';

import hhruHandler from './hhru/index';

const { href }  = window.location;

const domainHandlers = {
  'hh.ru': () => {
    hhruHandler();
  }
}

Object.keys(domainHandlers).forEach((domainKey) => {
  if(href.indexOf(domainKey) !== -1) {
    domainHandlers[domainKey]();
  }
});
