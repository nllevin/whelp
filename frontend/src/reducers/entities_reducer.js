import { combineReducers } from 'redux';
import users from './users_reducer';
import reviews from './reviews_reducer';

const entitiesReducer = combineReducers({
  users,
  reviews
});

export default entitiesReducer;