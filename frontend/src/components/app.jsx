import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from './session/login_container';
import SignupForm from './session/signup_container';
import Splash from './splash/splash';
import BusinessShow from './business_show/business_show_container';
import CreateReviewForm  from './review_form/create_review_form_container';
import EditReviewForm from './review_form/edit_review_form_container';
import BusinessIndexContainer from './business_index/business_index_container';
import Footer from './footer/footer';

const App = () => (
  <div>
    <Switch>
      <AuthRoute path='/login' component={LoginForm} />
      <AuthRoute path='/signup' component={SignupForm} />
      <Route path='/businesses/search' component={BusinessIndexContainer} />
      <ProtectedRoute path='/businesses/:businessId/review/edit' component={EditReviewForm} />
      <ProtectedRoute path='/businesses/:businessId/review/:selectedRating' component={CreateReviewForm} />
      <Route path='/businesses/:businessId' component={BusinessShow} />
      <Route path='/splash' component={Splash} />
      <Redirect path='/' to='/splash' />
    </Switch>
    <Footer />
  </div>
);

export default App;