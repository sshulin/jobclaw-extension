import { getFavoriteApi, getBlacklistApi } from '../../shared/utils/api';

const blacklistLoaded = (newItems) => {
  return {
    type: 'BLACKLIST_LOADED',
    payload: newItems
  }
}

const blacklistRequested = (payload) => {
  return {
    type: 'BLACKLIST_REQUESTED',
    payload: payload
  }
}

const blacklistDeleted = (itemUuid) => {
  return {
    type: 'BLACKLIST_DELETED',
    payload: itemUuid
  }
}

const fetchBlacklist = () => (dispatch) => {
  dispatch(blacklistRequested());

  getBlacklistApi().then(
    (items) => dispatch(blacklistLoaded(items)),
    (error) => dispatch(blacklistLoaded([]))
  );
}

const smartFetchBlacklist = () => (dispatch, getState) => {
  const { blacklist: { loaded } } = getState();

  if(!loaded) dispatch(fetchBlacklist());
}

const favoriteLoaded = (newItems) => {
	return {
		type: 'FAVORITE_LOADED',
		payload: newItems
	}
}

const favoriteRequested = (payload) => {
	return {
		type: 'FAVORITE_REQUESTED',
		payload: payload
	}
}

const favoriteDeleted = (itemUuid) => {
	return {
		type: 'FAVORITE_DELETED',
		payload: itemUuid
	}
}

const fetchFavorite = () => (dispatch) => {
	dispatch(favoriteRequested());

	getFavoriteApi().then(
		(items) => dispatch(favoriteLoaded(items)),
		(error) => dispatch(favoriteLoaded([]))
	);
}

const smartFetchFavorite = () => (dispatch, getState) => {
	const { favorite: { loaded } } = getState();

	if(!loaded) dispatch(fetchFavorite());
}

export {
	favoriteLoaded,

	favoriteDeleted,

	fetchFavorite,
	smartFetchFavorite,


  blacklistLoaded,

  blacklistDeleted,

  fetchBlacklist,
  smartFetchBlacklist
};
