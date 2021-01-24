import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Input,
  FindLink,
  LinkContainer,
  LoginBtn,
  SignupLink,
} from './style';

import callCookie from '../../utils/cookie';
import callApi from '../../utils/api';
import history from '../../utils/browserHistory';

// type loginFormProps = {
//   width: string;
//   height: string;
// };

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

// const LoginForm = ({ width, height }: loginFormProps) => {
const LoginForm = () => {
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
    <>
      <Container>
        <Input
          name="email"
          placeholder="email"
          value={email}
          onChange={changeState}
        />

        <Input
          name="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={changeState}
        />
      </Container>
      <LinkContainer>
        <SignupLink to="/signup">회원가입</SignupLink>
        <FindLink to="/find">아이디 / 비밀번호 찾기</FindLink>
      </LinkContainer>

      <LoginBtn ref={loginBtnRef} type="button" onClick={login}>
        Login !
      </LoginBtn>
    </>
  );
};

export default LoginForm;
