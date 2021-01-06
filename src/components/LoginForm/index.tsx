import React, { useState } from 'react';

import Box from '../Box';

import callCookie from '../../utils/cookie';
import callApi from '../../utils/api';
import history from '../../utils/browserHistory';

type loginFormProps = {
  width: string;
  height: string;
};

type loginReq = {
  id: string;
  password: String;
};
type loginRes = {
  result: 1 | -1;
  idx: string;
  id: string;
  accessToken: string;
  tokenType: string;
};

const LoginForm = ({ width, height }: loginFormProps) => {
  const [loginField, setLoginField] = useState({
    phoneNumber: '',
    password: '',
  });

  const { phoneNumber, password } = loginField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginField({
      ...loginField,
      [name]: value,
    });
  };

  const login = async () => {
    callCookie.delete('jwt');

    const res = await callApi.post<loginReq, loginRes>('users/login', {
      id: phoneNumber,
      password,
    });

    if (res?.result === -1) return; // alert('회원이 아닌 핸드폰 번호이거나, 비밀번호가 틀렸습니다.');

    const token = `${res?.tokenType} ${res?.accessToken}`;
    callCookie.set('jwt', token, 2);

    setLoginField({
      phoneNumber: '',
      password: '',
    });

    history.push('/main');
  };

  return (
    <Box width={width} height={height}>
      <div>phoneNumber</div>
      <input
        name="phoneNumber"
        placeholder="phoneNumber"
        value={phoneNumber}
        onChange={changeState}
      />

      <div>password</div>
      <input
        name="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={changeState}
      />
      <button type="button" onClick={login}>
        자자 들가자~
      </button>
    </Box>
  );
};

export default LoginForm;
