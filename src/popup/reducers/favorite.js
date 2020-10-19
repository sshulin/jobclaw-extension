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

    default: {
      return state.favorite;
    }
  }
}

export default updateFavorite;
