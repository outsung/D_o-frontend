import React from 'react';

import { LoginPage, DuoTitle } from './style';
import LoginForm from '../../components/LoginForm';

function Login() {
  return (
    <LoginPage>
      <DuoTitle>D?o</DuoTitle>
      <LoginForm width="420px" height="240px" />
    </LoginPage>
  );
}
export default Login;
