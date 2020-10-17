import { saveFavoriteApi } from '../../shared/utils/api';

const updateFavorite = (state, action) => {

  if(state === undefined) {
    return {
      loaded: false,
      data: []
    }
  }

  switch (action.type) {
    case 'FAVORITE_LOADED': {
      return {
        ...state.favorite,
        data: action.payload,
        loaded: true
      }
    }

    case 'FAVORITE_DELETED': {
      const data = state.favorite.data.filter((item) => item.uuid !== action.payload);
      saveFavoriteApi(data).then();

      return {
        ...state.favorite,
        data
      }
    }

    default: {
      return state.favorite;
    }
  }
}

export default updateFavorite;
