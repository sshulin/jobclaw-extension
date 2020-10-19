const updateBlacklist = (state, action) => {

  if(state === undefined) {
    return {
      loaded: false,
      data: []
    }
  }

  switch (action.type) {
    case 'BLACKLIST_LOADED': {
      return {
        ...state.blacklist,
        data: action.payload,
        loaded: true
      }
    }

    default: {
      return state.blacklist;
    }
  }
}

export default updateBlacklist;
