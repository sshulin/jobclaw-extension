import React, { useEffect } from 'react';
import ItemList from '../core/item-list';

import { smartFetchItems, itemDeleted } from '../../actions';

import { connect } from 'react-redux';

const HomePage = ({ items, smartFetchItems, itemDeleted }) => {

  const itemDeletedWrapper = (uuid) => {
    itemDeleted(uuid);
  }

  useEffect(() => {
    smartFetchItems()
  }, [smartFetchItems])

  return (
    <div className="page">
      <div className="page__wrapper">
        <div className="page__title">
          Home page
        </div>
        <div className="page__section page__section--grower">
          <ItemList
            items={items}
            itemDeleted={itemDeletedWrapper}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ items }) => {
  return {
    items
  }
}

const mapDispatchToProps = {
  smartFetchItems,
  itemDeleted
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
