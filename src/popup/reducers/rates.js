const updateRates = (state, action) => {

  if(state === undefined) {
    return {
      loaded: false,
      data: null
    }
  }

  switch (action.type) {
    case 'RATES_LOADED': {
      return {
        ...state.rates,
        data: action.payload,
        loaded: true
      }
    }

    default: {
      return state.rates;
    }
  }
}

export default updateRates;
