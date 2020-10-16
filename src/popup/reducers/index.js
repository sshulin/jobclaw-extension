import updateFavorite from './favorite';

const reducer = (state, action) => {
  return {
    favorite: updateFavorite(state, action)
  }
};

export default reducer;
