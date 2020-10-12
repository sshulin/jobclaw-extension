import React from 'react';
import { connect } from 'react-redux';

import { itemDeleted } from '../../../actions';

const ItemList = ({items, itemDeleted}) => {


  return (
    <div className="itemlist">
      {
        items.data.map((item) => {
          const itemDeleteWrapper = () => {
            itemDeleted(item.id)
          }
          return (
            <div
              key={item.id}
              className="itemlist__item"
              >
              { item.title }
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