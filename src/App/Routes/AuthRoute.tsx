import React from 'react';
import { Route } from 'react-router-dom';

// import callApi from '../../utils/api';
import callCookie from '../../utils/cookie';

import history from '../../utils/browserHistory';

interface authRouteProps {
  component: () => JSX.Element;
  path: string | [string];
  exact?: boolean;
}

const AuthRoute = ({ component, path, exact }: authRouteProps) => {
  const isLogin = Boolean(callCookie.get('jwt'));

  // console.log('AuthRoute check : ', callCookie.get('jwt'));
  if (!isLogin) history.push('/login');

  return <Route path={path} exact={exact} component={component} />;

  // <Redirect to={pathname: '/login', state: { from: props.location } } / >
  // <Route exact path={['/', '/login']} component={Login} />;
};

AuthRoute.defaultProps = { exact: false };

export default AuthRoute;
