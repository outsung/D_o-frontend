import React, { useEffect, useState } from 'react';
import {
  Container,
  Input,
  FindLink,
  LinkContainer,
  LoginBtn,
  SignupLink,
} from './style';

import Illusion from '../../../utils/Illusion';

import { login } from '../../../container/users';
import { loginVerify } from '../../../container/users/verify';

import callCookie from '../../../utils/cookie';
import history from '../../../utils/browserHistory';

interface loginFormProps {
  onTyping: (name: string, char: string) => void;
}

const LoginForm = ({ onTyping }: loginFormProps) => {
  const onKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onTyping(e.currentTarget.name, e.key);
  };

  const [loginField, setLoginField] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginField({
      ...loginField,
      [name]: value,
    });
  };

  const onClickLoginBtn = async function (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const target = e.currentTarget;
    target.disabled = true;
    target.classList.add('on');

    const verify = loginVerify({ id: email, password });
    if (verify.result === -1) {
      alert(verify.message);
      target.disabled = false;
      target.classList.remove('on');
      return;
    }
    const res = await login({ id: email, password });

    setLoginField({
      email: '',
      password: '',
    });
    target.disabled = false;
    target.classList.remove('on');

    if (res?.result === -1) {
      alert('회원이 아닌 이메일이거나, 비밀번호가 틀렸습니다.');
      return;
    }

    history.push('/main');
  };

  useEffect(() => {
    callCookie.delete('jwt');
  }, []);

  return (
    <>
      <Container>
        <Illusion>
          <Input
            autoComplete="off"
            name="email"
            placeholder="E-mail"
            value={email}
            onKeyPress={onKeypress}
            onChange={changeState}
          />
        </Illusion>
        <Illusion>
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onKeyPress={onKeypress}
            onChange={changeState}
          />
        </Illusion>
      </Container>
      <LinkContainer>
        <Illusion>
          <SignupLink onClick={() => history.push('/signup')}>
            회원가입
          </SignupLink>
        </Illusion>
        <Illusion>
          <FindLink onClick={() => history.push('/find')}>
            아이디 / 비밀번호 찾기
          </FindLink>
        </Illusion>
      </LinkContainer>

      <Illusion>
        <LoginBtn type="button" onClick={onClickLoginBtn}>
          Login !
        </LoginBtn>
      </Illusion>
    </>
  );
};

export default LoginForm;
