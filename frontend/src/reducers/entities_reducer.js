import { combineReducers } from 'redux';
import users from './users_reducer';
import businesses from './businesses_reducer';
import reviews from './reviews_reducer';

const entitiesReducer = combineReducers({
  users,
  businesses,
  reviews
});

export default entitiesReducer;