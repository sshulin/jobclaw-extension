import { saveBlacklistApi } from '../../shared/utils/api';

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

    case 'BLACKLIST_DELETED': {
      const data = state.blacklist.data.filter((item) => item.uuid !== action.payload);
      saveBlacklistApi(data).then();

      return {
        ...state.blacklist,
        data
      }
    }

    default: {
      return state.blacklist;
    }
  }
}

export default updateBlacklist;
