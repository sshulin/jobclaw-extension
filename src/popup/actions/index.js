import api from '../../shared/utils/api';

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

const requestBlacklistDelete = (itemUuid) => (dispatch, getState) => {
  api.deleteBlacklistItem(itemUuid)
    .then(() => dispatch(fetchBlacklist()))
    .catch(() => dispatch(fetchBlacklist()))
}

const fetchBlacklist = () => (dispatch) => {
  dispatch(blacklistRequested());

  api.getBlacklist().then(
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

const requestFavoriteDelete = (itemUuid) => (dispatch, getState) => {
  api.deleteFavoriteItem(itemUuid)
    .then(() => dispatch(fetchFavorite()))
    .catch(() => dispatch(fetchFavorite()))
}

const fetchFavorite = () => (dispatch) => {

  dispatch(favoriteRequested());

  api.getFavoriteList().then(
    (items) => dispatch(favoriteLoaded(items)),
    (error) => dispatch(favoriteLoaded([]))
  );
}

const smartFetchFavorite = () => (dispatch, getState) => {
  const { favorite: { loaded } } = getState();

  if(!loaded) dispatch(fetchFavorite());
}

const currentVacancyLoaded = (newValue) => {
  return {
    type: 'CURRENT_VACANCY_LOADED',
    payload: newValue
  }
}

const currentVacancyRequested = (payload) => {
  return {
    type: 'CURRENT_VACANCY_REQUESTED',
    payload: payload
  }
}

const fetchCurrentVacancy = (uuid) => (dispatch, getState) => {

  dispatch(currentVacancyRequested());

  api.getVacancyItem(uuid).then(
    (vacancy) => dispatch(currentVacancyLoaded(vacancy)),
    (error) => dispatch(currentVacancyLoaded(null))
  )
}

export {
  favoriteLoaded,

  fetchFavorite,
  smartFetchFavorite,

  requestFavoriteDelete,

  blacklistLoaded,

  fetchBlacklist,
  smartFetchBlacklist,

  requestBlacklistDelete,

  currentVacancyLoaded,
  fetchCurrentVacancy,
};
