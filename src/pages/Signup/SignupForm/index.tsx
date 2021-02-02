import React, { useState } from 'react';
import {
  Container,
  Input,
  LinkContainer,
  LoginLink,
  FindLink,
  SignupBtn,
} from './style';

import { signup } from '../../../container/users';
import { signupVerify } from '../../../container/users/verify';

import history from '../../../utils/browserHistory';

function SignupForm() {
  const [signupField, setSignupField] = useState({
    email: '',
    password: '',
    rPassword: '',
    nickname: '',
  });

  const { email, password, rPassword, nickname } = signupField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupField({
      ...signupField,
      [name]: value,
    });
  };

  const onClickSignupBtn = async function (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const target = e.currentTarget;
    target.disabled = true;
    target.classList.add('on');

    const verify = signupVerify({
      id: email,
      password,
      rPassword,
      nickname,
    });
    if (verify.result === -1) {
      alert(verify.message);
      target.disabled = false;
      target.classList.remove('on');
      return;
    }

    const res = await signup({
      id: email,
      password,
      nickname,
    });

    setSignupField({
      email: '',
      password: '',
      rPassword: '',
      nickname: '',
    });
    target.disabled = false;
    target.classList.remove('on');

    if (res?.result === -1) {
      alert('이미 있는 이메일입니다.');
      return;
    }

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
        <LoginLink onClick={() => history.push('/login')}>로그인</LoginLink>
        <FindLink onClick={() => history.push('/find')}>
          아이디 / 비밀번호 찾기
        </FindLink>
      </LinkContainer>
      <SignupBtn type="button" onClick={onClickSignupBtn}>
        Signup !
      </SignupBtn>
    </>
  );
}

export default SignupForm;
