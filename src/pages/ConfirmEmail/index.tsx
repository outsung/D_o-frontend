import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { confirmEmail } from '../../container/users';

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
      {emailVerified ? (
        <>
          <div>확인 되었습니다.</div>
          <br />
          <Link to="/">로그인하러가기</Link>
        </>
      ) : (
        <div>확인 중 입니다.</div>
      )}
    </>
  );
};

export default ConfirmEmail;
