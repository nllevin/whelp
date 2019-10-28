import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import LoginForm from './session/login_container';
import SignupForm from './session/signup_container';
import Splash from './splash/splash';
import BusinessShow from './business_show/business_show_container';
import ReviewForm  from './review_form/review_form_container';

const App = () => (
  <Switch>
    <AuthRoute path='/login' component={LoginForm} />
    <AuthRoute path='/signup' component={SignupForm} />
    <Route path='/splash' component={Splash} />
    <Route path='/businesses/:businessId/review' component={ReviewForm} />
    <Route path='/businesses/:businessId' component={BusinessShow} />
  </Switch>
);

export default App;