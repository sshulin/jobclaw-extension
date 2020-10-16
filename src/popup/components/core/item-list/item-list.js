/*global chrome*/

import React from 'react';
import { connect } from 'react-redux';

import { itemDeleted } from '../../../actions';

const ItemList = ({items, itemDeleted}) => {

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
                { item.title } { item.hhid ? (<span className="itemlist__hhlink" onClick={openHhLinkWrapper}>(hh.ru)</span>) : null }
              </div>
              <div className="itemlist__salary">
                { item.salary.from ? (<span>{ item.salary.from }</span>) : null }
                { item.salary.from && item.salary.to ? (<span> - </span>) : null }
                { item.salary.to ? (<span>{ item.salary.to }</span>) : null }
              </div>
              <div className="itemlist__company">
                { item.company }
              </div>
              <div className="itemlist__actions">
                <button onClick={itemDeleteWrapper} className="itemlist__button">
                  Delete
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = ({ items }) => {
  return {
    items
  }
}

const mapDispatchToProps = {
  itemDeleted
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
