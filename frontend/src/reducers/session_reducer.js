import { 
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT
} from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  currentUserID: null
};

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        currentUserID: action.currentUser.id
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        currentUserID: null
      };
    default:
      return state;
  }
};

export default sessionReducer;