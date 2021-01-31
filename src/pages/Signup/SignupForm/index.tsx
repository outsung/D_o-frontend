import React, { useState, useRef } from 'react';
import {
  Container,
  Input,
  LinkContainer,
  LoginLink,
  FindLink,
  SignupBtn,
} from './style';

import callApi from '../../../utils/api';
import history from '../../../utils/browserHistory';

type signupReq = {
  id: string;
  password: string;
  nickname: string;
};
type signupRes = {
  result: 1 | -1;
  message: string;
};

function SignupForm() {
  const [signupField, setSignupField] = useState({
    email: '',
    password: '',
    rPassword: '',
    nickname: '',
  });

  const signupBtn = useRef({} as HTMLButtonElement);

  const { email, password, rPassword, nickname } = signupField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupField({
      ...signupField,
      [name]: value,
    });
  };

  const signup = async function () {
    signupBtn.current.disabled = true;
    signupBtn.current.classList.add('on');
    // console.log(res);

    if (!(email && password && nickname && rPassword)) {
      alert('필드가 비어있습니다.');
      signupBtn.current.disabled = false;
      signupBtn.current.classList.remove('on');
      return;
    }
    if (password !== rPassword) {
      alert('비밀번호가 다릅니다.');
      signupBtn.current.disabled = false;
      signupBtn.current.classList.remove('on');
      return;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      alert('이메일 형식이 아닙니다.');
      signupBtn.current.disabled = false;
      signupBtn.current.classList.remove('on');
    }

    const res = await callApi.post<signupReq, signupRes>('users/signup', {
      id: email,
      password,
      nickname,
    });

    if (res?.result === -1) {
      setSignupField({
        email: '',
        password: '',
        rPassword: '',
        nickname: '',
      });

      alert('이미 있는 이메일입니다.');

      signupBtn.current.disabled = false;
      signupBtn.current.classList.remove('on');

      return;
    }

    setSignupField({
      email: '',
      password: '',
      rPassword: '',
      nickname: '',
    });

    alert('회원가입이 되었습니다.');

    history.push('/login');
  };

  return (
    <>
      <Container>
        <Input
          autoComplete="off"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={changeState}
        />

        <Input
          autoComplete="off"
          name="nickname"
          placeholder="Nickname"
          value={nickname}
          onChange={changeState}
        />

        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={changeState}
        />
        <Input
          name="rPassword"
          placeholder="Reenter password"
          type="password"
          value={rPassword}
          onChange={changeState}
        />
      </Container>
      <LinkContainer>
        <LoginLink to="/login">로그인</LoginLink>
        <FindLink to="/find">아이디 / 비밀번호 찾기</FindLink>
      </LinkContainer>
      <SignupBtn ref={signupBtn} type="button" onClick={signup}>
        Signup !
      </SignupBtn>
    </>
  );
}

export default SignupForm;
