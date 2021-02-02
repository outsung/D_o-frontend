import React from 'react';
import { Route } from 'react-router-dom';

import callCookie from '../../utils/cookie';

import history from '../../utils/browserHistory';

interface authRouteProps {
  component: () => JSX.Element;
  path: string | [string];
  exact?: boolean;
}

const AuthRoute = ({ component, path, exact }: authRouteProps) => {
  const isLogin = Boolean(callCookie.get('jwt'));

  if (!isLogin) history.push('/login');

  return <Route path={path} exact={exact} component={component} />;
};

AuthRoute.defaultProps = { exact: false };

export default AuthRoute;
