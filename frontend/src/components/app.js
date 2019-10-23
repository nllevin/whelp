import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import HeaderNav from './header_nav/header_nav';

const App = () => (
  <Switch>
    <HeaderNav />

  </Switch>
);

export default App;