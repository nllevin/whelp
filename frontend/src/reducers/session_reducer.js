import { 
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT
} from '../actions/session_actions';

import { RECEIVE_BUSINESSES_SEARCH } from '../actions/business_actions';

const initialState = {
  isAuthenticated: false,
  currentUserId: null,
  searchResultIds: []
};

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        currentUserId: action.currentUser.id
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        currentUserId: null
      };
    case RECEIVE_BUSINESSES_SEARCH:
      return Object.assign({}, initialState, { searchResultIds: action.searchResultIds });
    default:
      return state;
  }
};

export default sessionReducer;