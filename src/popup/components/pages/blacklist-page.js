import React, { useEffect } from 'react';
import ItemList from '../core/item-list';

import { smartFetchBlacklist, requestBlacklistDelete } from '../../actions';

import { connect } from 'react-redux';

const BlacklistPage = ({ blacklist, smartFetchBlacklist, requestBlacklistDelete }) => {

  const itemDeletedWrapper = (uuid) => {
    requestBlacklistDelete(uuid);
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
  requestBlacklistDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(BlacklistPage);
