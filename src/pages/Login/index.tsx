import React from 'react';

import { LoginPage, DuoTitle, IntroLineToBox, Fadein } from './style';
import LoginForm from '../../components/LoginForm';

function Login() {
  return (
    <LoginPage>
      <IntroLineToBox
        lineDuration={0}
        boxDuration={0}
        width="420px"
        height="240px"
      />
      <Fadein>
        <DuoTitle>D?o</DuoTitle>
        <LoginForm width="420px" height="240px" />
      </Fadein>
    </LoginPage>
  );
}
export default Login;
