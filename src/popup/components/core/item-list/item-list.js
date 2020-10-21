/*global chrome*/

import React from 'react';

import { NavLink } from 'react-router-dom';

import Salary from '../salary';

import convertSalary from '../../../../shared/mappers/convertSalary';

const ItemList = ({items, itemDeleted, rates}) => {

  const openHhLink = (item) => {
    chrome.tabs.create({url: 'https://hh.ru/vacancy/' + item.hhid});
  }


  return (
    <div className="itemlist">
      {
        items.data.map((item) => {
          const itemDeleteWrapper = () => {
            itemDeleted(item.uuid)
          }
          const openHhLinkWrapper = () => {
            openHhLink(item);
          }

          return (
            <div
              key={item.uuid}
              className="itemlist__item"
              >
              <div className="itemlist__title">
                <NavLink
                  className="itemlist__title-link"
                  to={"/vacancy/detail/" + item.uuid}
                  >
                  { item.title }
                </NavLink>
                { item.hhid ? (<span className="itemlist__hhlink" onClick={openHhLinkWrapper}>(hh.ru)</span>) : null }
              </div>
              { item.salary ? (
                <div className="itemlist__salary">
                  <Salary salary={ item.salary } />
                  { rates && rates[item.salary.currency] && item.salary.currency !== 'RUR' ? (
                   <span>(<Salary salary={ convertSalary(item.salary, rates) } />)</span>
                  ) : null}
                </div>
              ) : (
                <div className="itemlist__salary"></div>
              ) }
              <div className="itemlist__company">
                { item.company }
              </div>
              <div className="itemlist__actions">
                <button onClick={itemDeleteWrapper} className="itemlist__button itemlist__button--delete">
                  <i className="fa fa-remove"></i>
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ItemList;
