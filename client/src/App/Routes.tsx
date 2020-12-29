import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../utils/browserHistory';

import Login from '../pages/Login/index';
import Main from '../pages/Main';
import Empty from '../pages/Empty';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path={['/', '/login']} component={Login} />
      <Route exact path="/main" component={Main} />
      <Route component={Empty} />
    </Switch>
  </Router>
);

export default Routes;
