import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../utils/browserHistory';
import {
  ConfirmEmailPage,
  ContentsBox,
  Filter,
  SlothVideo,
  Btn,
} from './style';

import { confirmEmail } from '../../container/users';

interface typingEffectProps {
  check: boolean;
  callback: () => void;
}
const TypingEffect = ({ check, callback }: typingEffectProps) => {
  const time = useRef(0);
  const ref = useRef({} as HTMLHeadingElement);
  const handleRef = useRef({} as NodeJS.Timeout);

  // console.log('TypingEffect : ', check);

  useEffect(() => {
    const texts = ['...확인..', '되셨습니다..'];
    const between = '.';
    const speed = 800;

    clearTimeout(handleRef.current);

    const typeWriter = () => {
      // console.log(`time: ${time.current}, check: ${check}`);

      let step = -1;
      if (texts[0].length > time.current) step = 0;
      else if (!check) step = 1;
      else step = 2;

      let char = '';
      switch (step) {
        case 0:
          char = texts[0].charAt(time.current);
          time.current += 1;
          break;
        case 1:
          char = between;
          break;
        case 2:
          char = texts[1].charAt(time.current - texts[0].length);
          time.current += 1;
          break;
        default:
      }

      // console.log(`step: ${step}, char: ${char}`);

      ref.current.innerHTML += char;
      if (time.current <= texts[0].length + texts[1].length)
        handleRef.current = setTimeout(typeWriter, speed);
      else callback();
    };
    typeWriter();
  }, [check, callback]);

  return (
    <h1 ref={ref} style={{ fontSize: 100, color: '#FFFFFF' }}>
      {/* TypingEffect Text */}
    </h1>
  );
};

const BackgroundGif = () => (
  <SlothVideo loop autoPlay muted>
    <source
      src="https://thumbs.gfycat.com/AdventurousPointlessGull-mobile.webm"
      type="video/webm"
    />
    <source
      src="https://thumbs.gfycat.com/AdventurousPointlessGull-mobile.mp4"
      type="video/mp4"
    />
  </SlothVideo>
);

const ConfirmEmail = () => {
  const [btnVisible, setBtnVisible] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const { key } = useParams<{ key: string }>();

  const init = useMemo(
    () =>
      async function () {
        const res = await confirmEmail(key);
        setEmailVerified(res?.result === 1);
      },
    [key],
  );

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <ConfirmEmailPage>
        <ContentsBox>
          <TypingEffect
            check={emailVerified}
            callback={() => {
              setBtnVisible(true);
            }}
          />
          {btnVisible ? (
            <Btn onClick={() => history.replace('/')}>로그인하러 가기</Btn>
          ) : (
            <></>
          )}
        </ContentsBox>

        <BackgroundGif />

        <Filter opacity={btnVisible ? 0.8 : 0.7} />
      </ConfirmEmailPage>
    </>
  );
};

export default ConfirmEmail;
