import React, { useEffect } from 'react';
import ItemList from '../core/item-list';

import { smartFetchItems } from '../../actions';

import { connect } from 'react-redux';

const HomePage = ({ items, smartFetchItems }) => {

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
          <ItemList />
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
  smartFetchItems
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);