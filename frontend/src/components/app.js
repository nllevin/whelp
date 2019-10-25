import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import LoginForm from './session/login_container';
import SignupForm from './session/signup_container';
import Splash from './splash/splash';
import BusinessIndexContainer from './business_index/business_index_container';

const App = () => (
  <Switch>
    <AuthRoute path='/login' component={LoginForm} />
    <AuthRoute path='/signup' component={SignupForm} />
    <Route path='/splash' component={Splash} />
    <Route path='/' component={BusinessIndexContainer} />
  </Switch>
);

export default App;