import React from 'react';

import { LoginPage, DuoTitle } from './style';
import LoginForm from '../../components/LoginForm';

function Login() {
  return (
    <LoginPage>
      <DuoTitle>D?o</DuoTitle>
      <LoginForm />
    </LoginPage>
  );
}
export default Login;
