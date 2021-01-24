import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
  const loginBtn = useRef({} as HTMLButtonElement);

  const { phoneNumber, password } = loginField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginField({
      ...loginField,
      [name]: value,
    });
  };

  const login = async function () {
    loginBtn.current.disabled = true;

    const res = await callApi.post<loginReq, loginRes>('users/login', {
      id: phoneNumber,
      password,
    });

    if (res?.result === -1) {
      setLoginField({
        phoneNumber: '',
        password: '',
      });

      alert('회원이 아닌 핸드폰 번호이거나, 비밀번호가 틀렸습니다.');
      loginBtn.current.disabled = false;
      return;
    }

    const token = `${res?.tokenType} ${res?.accessToken}`;
    callCookie.set('jwt', token, 2);

    setLoginField({
      phoneNumber: '',
      password: '',
    });

    history.push('/main');
  };

  useEffect(() => {
    callCookie.delete('jwt');
  }, []);

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
      <button ref={loginBtn} type="button" onClick={login}>
        로그인하기
      </button>
      <Link to="/signup">회원가입</Link>
    </Box>
  );
};

export default LoginForm;
