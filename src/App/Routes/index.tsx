import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import history from '../../utils/browserHistory';

// Route
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
import ConfirmEmail from '../../pages/ConfirmEmail';

// AuthRoute
import Studio from '../../pages/Studio';
import Users from '../../pages/Users';

// default
import Empty from '../../pages/Enpty';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/confirmEmail/:key" component={ConfirmEmail} />

      <AuthRoute exact path="/main" component={Studio} />

      <AuthRoute exact path="/users/:_id" component={Users} />

      <Route component={Empty} />
    </Switch>
  </Router>
);

export default Routes;
