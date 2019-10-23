import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import LoginForm from './session/login_container';
import SignupForm from './session/signup_container';
import HeaderNav from './header_nav/header_nav';

const App = () => (
  <Switch>
    <AuthRoute path='/login' component={LoginForm} />
    <AuthRoute path='/signup' component={SignupForm} />
    <Route path='/' component={HeaderNav} />
  </Switch>
);

export default App;