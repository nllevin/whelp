import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import LoginForm from './session/login_container';
import SignupForm from './session/signup_container';
import Splash from './splash/splash';
import BusinessIndexContainer from './business_index/business_index_container';
import Footer from './footer/footer';

const App = () => (
  <div>
    <Switch>
      <AuthRoute path='/login' component={LoginForm} />
      <AuthRoute path='/signup' component={SignupForm} />
      <Route path='/splash' component={Splash} />
      <Route path='/businesses/search' component={BusinessIndexContainer} />
    </Switch>
    <Footer />
  </div>
);

export default App;