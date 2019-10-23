import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

// FOR TESTING ONLY
import { signup, login } from "./actions/session_actions";
/////////////////

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      entities: {
        users: {
          [decodedUser.id]: decodedUser
        }
      },
      session: { isAuthenticated: true, currentUserId: decodedUser.id }
    };
    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore();
  }

  //FOR TESTING
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  /////////////

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});