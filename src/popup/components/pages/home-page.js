import React, { useEffect } from 'react';
import ItemList from '../core/item-list';

import { smartFetchFavorite, requestFavoriteDelete } from '../../actions';

import { connect } from 'react-redux';

const HomePage = ({ favorite, smartFetchFavorite, requestFavoriteDelete }) => {

  const itemDeletedWrapper = (uuid) => {
    requestFavoriteDelete(uuid);
  }

  useEffect(() => {
    smartFetchFavorite()
  }, [smartFetchFavorite])

  return (
    <div className="page">
      <div className="page__wrapper">
        <div className="page__title">
          Home page
        </div>
        <div className="page__section page__section--grower">
          <ItemList
            items={favorite}
            itemDeleted={itemDeletedWrapper}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ favorite }) => {
  return {
    favorite
  }
}

const mapDispatchToProps = {
  smartFetchFavorite,
  requestFavoriteDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
