const updateCurrentVacancy = (state, action) => {

  if(state === undefined) {
    return {
      loaded: false,
      data: null
    }
  }

  switch (action.type) {
    case 'CURRENT_VACANCY_REQUESTED': {
      return {
        ...state.currentVacancy,
        data: null,
        loaded: false
      }
    }

    case 'CURRENT_VACANCY_LOADED': {
      return {
        ...state.currentVacancy,
        data: action.payload,
        loaded: true
      }
    }

    default: {
      return state.currentVacancy;
    }
  }
}

export default updateCurrentVacancy;
