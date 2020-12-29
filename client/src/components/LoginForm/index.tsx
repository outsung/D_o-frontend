import React, { useState } from 'react';

import callCookie from '../../utils/cookie';
import callApi from '../../utils/api';

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

const Login = () => {
  const [loginField, setLoginField] = useState({
    phoneNumber: '',
    password: '',
  });
  const [jwt, setJwt] = useState(callCookie.get('jwt'));

  const { phoneNumber, password } = loginField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginField({
      ...loginField,
      [name]: value,
    });
  };

  const login = async () => {
    console.log(`login!! phoneNumber: ${phoneNumber} password: ${password}`);

    const { tokenType, accessToken } = await callApi.post<loginReq, loginRes>(
      'users/login',
      {
        id: phoneNumber,
        password,
      },
    );

    const token = `${tokenType} ${accessToken}`;
    callCookie.set('jwt', token, 2);
    setJwt(token);

    setLoginField({
      phoneNumber: '',
      password: '',
    });
  };
  const logout = () => {
    callCookie.delete('jwt');
    setJwt('');
  };
  const getUser = async () => {
    const res = await callApi.get('users');

    alert(res);
  };

  return (
    <div>
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
      <button type="button" onClick={getUser}>
        내 정보 얻어오기
      </button>
      <button type="button" onClick={logout}>
        자자 나가자~
      </button>
    </div>
  );
};

export default Login;
