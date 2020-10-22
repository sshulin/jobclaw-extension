import React, { useEffect } from 'react';
import ItemList from '../core/item-list';

import { smartFetchFavorite, requestFavoriteDelete } from '../../actions';

import { connect } from 'react-redux';

const FavoritePage = ({ favorite, rates, smartFetchFavorite, requestFavoriteDelete }) => {

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
          Favorite page
        </div>
        <div className="page__section page__section--grower">
          <ItemList
            items={favorite}
            itemDeleted={itemDeletedWrapper}
            rates={rates}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ favorite, rates }) => {
  return {
    favorite,
    rates: rates.data
  }
}

const mapDispatchToProps = {
  smartFetchFavorite,
  requestFavoriteDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
