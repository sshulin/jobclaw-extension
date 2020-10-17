import React, { useEffect } from 'react';
import ItemList from '../core/item-list';

import { smartFetchBlacklist, blacklistDeleted } from '../../actions';

import { connect } from 'react-redux';

const BlacklistPage = ({ blacklist, smartFetchBlacklist, blacklistDeleted }) => {

  const itemDeletedWrapper = (uuid) => {
    blacklistDeleted(uuid);
  }

  useEffect(() => {
    smartFetchBlacklist()
  }, [smartFetchBlacklist])

  return (
    <div className="page">
      <div className="page__wrapper">
        <div className="page__title">
          Blacklist page
        </div>
        <div className="page__section page__section--grower">
          <ItemList
            items={blacklist}
            itemDeleted={itemDeletedWrapper}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ blacklist }) => {
  return {
    blacklist
  }
}

const mapDispatchToProps = {
  smartFetchBlacklist,
  blacklistDeleted
}

export default connect(mapStateToProps, mapDispatchToProps)(BlacklistPage);
