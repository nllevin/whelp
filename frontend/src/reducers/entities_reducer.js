import { combineReducers } from 'redux';
import users from './users_reducer';
import businesses from './businesses_reducer';

const entitiesReducer = combineReducers({
  users,
  businesses
});

export default entitiesReducer;