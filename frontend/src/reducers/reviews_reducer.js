import {
  RECEIVE_REVIEW,
  REMOVE_REVIEW
} from '../actions/review_actions';
import { 
  RECEIVE_BUSINESSES_SEARCH,
  RECEIVE_BUSINESS_AND_REVIEWS 
} from '../actions/business_actions';

const reviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REVIEW:
      return Object.assign({}, state, {[action.review._id]: action.review});
    case REMOVE_REVIEW:
      let newState = Object.assign({}, state);
      delete newState[action.reviewId];
      return newState;
    case RECEIVE_BUSINESSES_SEARCH:
      return Object.assign({}, state, action.reviews);
    case RECEIVE_BUSINESS_AND_REVIEWS:
      return Object.assign({}, state, action.reviews);
    default:
      return state;
  }
}

export default reviewsReducer;