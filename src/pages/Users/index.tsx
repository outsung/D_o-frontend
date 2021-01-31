import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getByIdx, getByIdxRes } from '../../container/users';
import { getSummoner, getSummonerRes } from '../../container/riot';

import UserProfile from '../../components/UserProfile';

function Users() {
  const [user, setUser] = useState<getByIdxRes>();
  const [riotInfo, setRiotInfo] = useState<getSummonerRes>();
  const { _id } = useParams<{ _id: string }>();

  const init = useMemo(
    () => async () => {
      setUser(await getByIdx(_id));
      setRiotInfo(await getSummoner('피즈야 당근먹자'));
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
      {riotInfo ? (
        <div>
          <div>accountId: {riotInfo.accountId}</div>
          <div>id: {riotInfo.id}</div>
          <div>name: {riotInfo.name}</div>
          <div>profileIconId: {riotInfo.profileIconId}</div>
          <div>puuid: {riotInfo.puuid}</div>
          <div>revisionDate: {riotInfo.revisionDate}</div>
          <div>summonerLevel: {riotInfo.summonerLevel}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Users;
