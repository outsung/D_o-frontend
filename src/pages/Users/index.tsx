import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getByIdx, getByIdxRes } from '../../container/users';

import UserProfile from '../../components/UserProfile';

function Users() {
  const [user, setUser] = useState<getByIdxRes>();
  const { _id } = useParams<{ _id: string }>();

  const init = useMemo(
    () => async () => {
      setUser(await getByIdx(_id));
    },
    [_id],
  );

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      {user ? (
        <UserProfile _id={user.idx} id={user.id} nickname="" />
      ) : (
        <div>{_id} : 유저 페이지 입니다.</div>
      )}
    </>
  );
}

export default Users;
