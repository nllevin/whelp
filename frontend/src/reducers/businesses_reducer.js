import {
  RECEIVE_BUSINESSES_SEARCH,
  RECEIVE_BUSINESS_AND_REVIEWS
} from '../actions/business_actions';

const businessesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_BUSINESSES_SEARCH:
      return Object.assign({}, state, action.businesses);
    case RECEIVE_BUSINESS_AND_REVIEWS:
      return Object.assign({}, state, { [action.business.id]: action.business });
    default:
      return state;
  }
}

export default businessesReducer;