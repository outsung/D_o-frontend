import React, { useEffect, useState } from 'react';

import sessionStorage from '../../utils/sessionStorage';

import { LoginPage, DuoTitle, IntroLineToBox, Fadein } from './style';
import LoginForm from '../../components/LoginForm';

const LINE_DURATION = 10;
const BOX_DURATION = 1.5;

const Login = () => {
  const [isIntro, setIsIntro] = useState<boolean>();
  // const [loding, setLoding] = useState(0);

  const endIntro = (): void => setIsIntro(false);

  useEffect(() => {
    const visitCount = Number(sessionStorage.get('LoginPage'));
    if (visitCount === 0) {
      sessionStorage.set('LoginPage', `${visitCount + 1}`);
      setIsIntro(true);
      setTimeout(endIntro, LINE_DURATION * 1000 + BOX_DURATION * 1000);
    } else {
      endIntro();
    }
  }, []);

  if (isIntro === undefined) return <></>;

  return (
    <LoginPage>
      {isIntro ? (
        <IntroLineToBox
          lineDuration={LINE_DURATION}
          boxDuration={BOX_DURATION}
          width="420px"
          height="240px"
        />
      ) : (
        <>
          <IntroLineToBox
            lineDuration={0}
            boxDuration={0}
            width="420px"
            height="240px"
          />
          <Fadein>
            <DuoTitle>D?o</DuoTitle>
            <LoginForm width="420px" height="240px" />
          </Fadein>
        </>
      )}
    </LoginPage>
  );
};
export default Login;
