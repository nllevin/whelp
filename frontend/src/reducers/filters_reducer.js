// import { UPDATE_FILTER } from '../actions/filter_actions';
import { RECEIVE_BUSINESSES_SEARCH } from '../actions/business_actions';

const defaultState = {
  searchBounds: {},
  searchResults: []
};

const filtersReducer = (state = defaultState, action) => {
  switch (action.type) {
    // case UPDATE_FILTER:
    //   return Object.assign({}, state, { [action.filter]: action.value });
    case RECEIVE_BUSINESSES_SEARCH:
      const newState = Object.assign({}, state);
      newState.searchResults = action.searchResults;
      return newState;
    default:
      return state;
  }
};

export default filtersReducer;