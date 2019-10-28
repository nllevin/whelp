import { 
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';
import { RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS } from '../actions/business_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_BUSINESS_AND_REVIEWS_WITH_AUTHORS:
      return Object.assign({}, state, action.users);
    default:
      return state;
  }
};

export default usersReducer;  