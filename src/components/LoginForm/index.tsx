import React, { useEffect, useRef, useState } from 'react';

import { Input, InputName, LoginBtn, SignupLink } from './style';
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
    email: '',
    password: '',
  });
  const loginBtnRef = useRef({} as HTMLButtonElement);

  const { email, password } = loginField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginField({
      ...loginField,
      [name]: value,
    });
  };

  const login = async function () {
    loginBtnRef.current.disabled = true;

    const res = await callApi.post<loginReq, loginRes>('users/login', {
      id: email,
      password,
    });

    if (res?.result === -1) {
      setLoginField({
        email: '',
        password: '',
      });

      alert('회원이 아닌 핸드폰 번호이거나, 비밀번호가 틀렸습니다.');
      loginBtnRef.current.disabled = false;
      return;
    }

    const token = `${res?.tokenType} ${res?.accessToken}`;
    callCookie.set('jwt', token, 2);

    setLoginField({
      email: '',
      password: '',
    });

    history.push('/main');
  };

  useEffect(() => {
    callCookie.delete('jwt');
  }, []);

  return (
    <Box width={width} height={height}>
      <InputName>email</InputName>
      <Input
        name="email"
        placeholder="email"
        value={email}
        onChange={changeState}
      />

      <InputName>password</InputName>
      <Input
        name="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={changeState}
      />

      <LoginBtn ref={loginBtnRef} type="button" onClick={login}>
        로그인하기
      </LoginBtn>
      <SignupLink to="/signup">회원가입</SignupLink>
    </Box>
  );
};

export default LoginForm;
