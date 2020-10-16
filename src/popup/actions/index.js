import { getFavoriteApi } from '../../shared/utils/api';

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
	smartFetchFavorite
};
