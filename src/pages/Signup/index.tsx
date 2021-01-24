import React, { useState, useRef } from 'react';

import callApi from '../../utils/api';
import history from '../../utils/browserHistory';

import Box from '../../components/Box';

import { SignupPage, DuoTitle } from './style';

type signupReq = {
  id: string;
  password: string;
  nickname: string;
};
type signupRes = {
  result: 1 | -1;
  message: string;
};

function Signup() {
  const [signupField, setSignupField] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  const signupBtn = useRef({} as HTMLButtonElement);

  const { email, password, nickname } = signupField;

  const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupField({
      ...signupField,
      [name]: value,
    });
  };

  const signup = async function () {
    signupBtn.current.disabled = true;

    const res = await callApi.post<signupReq, signupRes>('users/signup', {
      id: email,
      password,
      nickname,
    });

    // console.log(res);

    if (res?.result === -1) {
      setSignupField({
        email: '',
        password: '',
        nickname: '',
      });

      alert('이미 있는 이메일입니다.');
      signupBtn.current.disabled = false;
      return;
    }

    setSignupField({
      email: '',
      password: '',
      nickname: '',
    });

    alert('회원가입이 되었습니다.');

    history.push('/login');
  };

  return (
    <SignupPage>
      <DuoTitle>D?o</DuoTitle>
      <Box width="420px" height="240px">
        <div>email</div>
        <input
          name="email"
          placeholder="email"
          value={email}
          onChange={changeState}
        />

        <div>nickname</div>
        <input
          name="nickname"
          placeholder="nickname"
          value={nickname}
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
        <button ref={signupBtn} type="button" onClick={signup}>
          회원가입하기
        </button>
      </Box>
    </SignupPage>
  );
}

export default Signup;
