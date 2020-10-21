import updateFavorite from './favorite';
import updateBlacklist from './blacklist';
import updateCurrentVacancy from './currentVacancy';
import updateRates from './rates';

const reducer = (state, action) => {
  return {
    favorite: updateFavorite(state, action),
    blacklist: updateBlacklist(state, action),
    currentVacancy: updateCurrentVacancy(state, action),
    rates: updateRates(state, action),
  }
};

export default reducer;
