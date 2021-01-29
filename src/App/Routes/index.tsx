import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import history from '../../utils/browserHistory';

import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
import Empty from '../../pages/Enpty';

import Studio from '../../pages/Studio';

import Users from '../../pages/Users';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />

      {/* <Route exact path="/main" component={Studio} /> */}
      <AuthRoute exact path="/main" component={Studio} />

      <AuthRoute path="/users/:_id" component={Users} />

      <Route component={Empty} />
    </Switch>
  </Router>
);

export default Routes;
