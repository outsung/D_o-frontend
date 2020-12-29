import React, { useState } from 'react';

import { LoginPage, DuoTitle, Line } from './style';
import Box from '../../components/Box';

const Login = () => {
  const [loding, setLoding] = useState(0);

  return (
    <LoginPage>
      <Line percent={`${loding} %`} />
      <DuoTitle>D?o</DuoTitle>
      <Box width="420px" height="240px" />
    </LoginPage>
  );
};
export default Login;
