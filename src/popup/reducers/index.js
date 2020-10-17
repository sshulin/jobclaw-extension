import updateFavorite from './favorite';
import updateBlacklist from './blacklist';

const reducer = (state, action) => {
  return {
    favorite: updateFavorite(state, action),
    blacklist: updateBlacklist(state, action),
  }
};

export default reducer;
