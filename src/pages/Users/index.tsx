import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

// / import { getByIdx, getByIdxRes } from '../../container/users';
import { updateLolInfo, updateLolInfoRes } from '../../container/riot';

// import UserProfile from '../../components/UserProfile';

function Users() {
  // const [user, setUser] = useState<getByIdxRes>();
  const [user, setUser] = useState<updateLolInfoRes>();
  const { idx } = useParams<{ idx: string }>();

  const init = useMemo(
    () => async () => {
      // setUser(await getByIdx(_id));
      setUser(await updateLolInfo(idx));
    },
    [idx],
  );

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      {user ? (
        <>
          <div>idx: {user.idx}</div>
          <div>id: {user.id}</div>
          <div>nickname: {user.nickname}</div>
          <div>profileImageUrl: {user.profileImageUrl}</div>
          <div> lolTear: {user.lolTear}</div>
          <div>lolLevel: {user.lolLevel}</div>
          <div> lolLane: {user.lolLane}</div>
          <div> lolChampion: {user.lolChampion}</div>
        </>
      ) : (
        <div>{idx} : 유저 페이지 입니다.</div>
      )}
    </>
  );
}

export default Users;
