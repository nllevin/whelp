import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import LoginForm from './session/login_container';
import SignupForm from './session/signup_container';

const App = () => (
  <Switch>
    <AuthRoute path='/login' component={LoginForm} />
    <AuthRoute path='/signup' component={SignupForm} />
  </Switch>
);

export default App;