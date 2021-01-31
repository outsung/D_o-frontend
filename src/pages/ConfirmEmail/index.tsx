import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { confirmEmail } from '../../container/users';

interface typingEffectProps {
  check: boolean;
}
const TypingEffect = ({ check }: typingEffectProps) => {
  const time = useRef(0);
  const ref = useRef({} as HTMLHeadingElement);
  const handleRef = useRef({} as NodeJS.Timeout);

  const texts = ['...확인..', '되셨습니다..'];
  const between = '.';
  const speed = 500;

  console.log('TypingEffect : ', check);

  useEffect(() => {
    clearTimeout(handleRef.current);

    const typeWriter = () => {
      console.log(`time: ${time.current}, check: ${check}`);

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

      console.log(`step: ${step}, char: ${char}`);

      ref.current.innerHTML += char;
      handleRef.current = setTimeout(typeWriter, speed);
    };
    typeWriter();
  }, [check]);

  return (
    <>
      <h1 ref={ref} style={{ fontSize: 100, color: '#FFFFFF' }}>
        {}
      </h1>
    </>
  );
};

const ConfirmEmail = () => {
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
      <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
        <div
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TypingEffect check={emailVerified} />
        </div>
        <video
          style={{
            position: 'relative',
            height: 'calc(100vh + 36%)',
            top: '-18%',
          }}
          loop
          autoPlay
          muted
        >
          <source
            id="webmSource"
            src="https://thumbs.gfycat.com/AdventurousPointlessGull-mobile.webm"
            type="video/webm"
          />
          <source
            id="mp4Source"
            src="https://thumbs.gfycat.com/AdventurousPointlessGull-mobile.mp4"
            type="video/mp4"
          />
        </video>
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: 100,
          }}
        />
      </div>
    </>
  );
};

export default ConfirmEmail;
