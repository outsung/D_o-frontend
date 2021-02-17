import React, { Suspense, useEffect, useState, useRef } from 'react';
// import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { softShadows } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import socketio from 'socket.io-client';

import callCookie from '../../utils/cookie';

import { PhyPlane, PhyString } from '../../components/Phy';
import { PhyBoxInfo } from './PhyBoxInfo';
import CameraAnimation from './CameraAnimation';
import { Mypage, PhyBoxMypage, useMypage } from './Mypage';
import useFavorites from './Favorites';
import { Room, RoomPage, useRoom } from './Room';

// import Controls from '../../utils/Controls';
import Loader from '../../components/Loader';
import history from '../../utils/browserHistory';

import UserProfile from '../../components/UserProfile';

import {
  StudioPage,
  AccountMenuBox,
  AccountMenuImage,
  AccountMenuDivider,
  AccountMenuItem,
  WaitingBnt,
  OptionBtn,
  OptionLabel,
  UserInfoBox,
} from './style';

import { allget, allgetRes, updateLolInfo } from '../../container/users';

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

softShadows({});

const serverUrl =
  'https://duo-serverrr.herokuapp.com' || 'http://localhost:5000';

function Studio() {
  const [mypageClicked, setMypageClicked] = useState(false);
  const [optionClicked, setOptionClicked] = useState(false);
  const [clicked, setClicked] = useState<string>();
  const [users, setUsers] = useState<allgetRes[]>();
  const [onlineUsersIdx, setOnlineUsersIdx] = useState<string[]>();
  const clickedUserRef = useRef<allgetRes>();

  const { favorites, addFavorites, removeFavorites } = useFavorites();
  const { me, newMe, changeNewMe, onSaveNewMe, onCancelNewMe } = useMypage();
  const { roomClicked, focusRoom, onFocusRoom, onBlurRoom } = useRoom();

  const init = async function () {
    setUsers(await allget());
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const socket = socketio.connect(
      `${serverUrl}?auth=${callCookie.get('jwt')}`,
    );
    socket.emit('login');
    socket.on('online', (onlineString: string[]) => {
      setOnlineUsersIdx(onlineString);
    });

    return function () {
      socket.disconnect();
    };
  }, []);

  const clickUpdateBtn = async (_id: string) => {
    if (!users) return;
    const newUser = await updateLolInfo(_id);
    if (!newUser) return;
    setUsers(users.map((u) => (u._id === _id ? newUser : u)));
  };

  if (clicked) clickedUserRef.current = users?.find((u) => u._id === clicked);

  return (
    <StudioPage>
      <AccountMenuBox className={mypageClicked ? 'mypage' : ''}>
        <AccountMenuImage onClick={() => alert(JSON.stringify(me))} />
        <AccountMenuDivider id="divider" />
        <AccountMenuItem id="logout" onClick={() => history.push('/login')}>
          로그아웃
        </AccountMenuItem>
        <AccountMenuItem
          id="mypage"
          onClick={() => setMypageClicked(!mypageClicked)}
        >
          마이페이지
        </AccountMenuItem>
      </AccountMenuBox>
      <WaitingBnt
        className={`${optionClicked ? 'left' : ''} ${
          clicked || mypageClicked || roomClicked ? 'down' : ''
        }`}
      >
        매칭 시작
        <OptionBtn
          className={optionClicked ? 'on' : ''}
          onClick={() => setOptionClicked(!optionClicked)}
        >
          ⛶<OptionLabel>매칭 설정</OptionLabel>
        </OptionBtn>
      </WaitingBnt>
      <UserInfoBox className={clicked && !mypageClicked ? 'on' : ''}>
        {clickedUserRef.current ? (
          <>
            <div>{clickedUserRef.current.id}</div>
            <div>{clickedUserRef.current.nickname}</div>
            <div>{clickedUserRef.current.lolChampion}</div>
            <div>{clickedUserRef.current.lolLane}</div>
            <div>{clickedUserRef.current.lolLevel}</div>
            <div>{clickedUserRef.current.lolTear}</div>
          </>
        ) : (
          <div>...</div>
        )}
      </UserInfoBox>
      <Mypage
        newMe={newMe}
        changeNewMe={changeNewMe}
        mypageClicked={mypageClicked}
      />
      <Room
        isMain={
          !(roomClicked || mypageClicked || optionClicked || Boolean(clicked))
        }
        favorites={favorites}
        onFocusRoom={onFocusRoom}
      />
      <RoomPage
        roomClicked={roomClicked}
        focusRoom={focusRoom}
        onBlurRoom={onBlurRoom}
      />

      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 3, 6], fov: 60 }}
      >
        <fog attach="fog" args={['white', 0, 40]} />

        {/* 카메라 */}
        <CameraAnimation
          roomClicked={roomClicked}
          mypageClicked={mypageClicked}
          optionClicked={optionClicked}
          boxClicked={clicked}
        />

        {/* 조명 */}
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} color="#A6586D" intensity={2.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <Suspense fallback={<Loader />}>
          {/* cannon */}
          <Physics gravity={[0, -10, 0]}>
            <PhyPlane
              position={[0, -0.1, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              meshProps={{ visible: false }}
            />
            <PhyPlane position={[0, 0, -5]} meshProps={{ visible: false }} />
            <PhyPlane
              position={[8, 0, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              meshProps={{ visible: false }}
            />

            {users ? (
              users.map((user, i) => (
                <PhyBoxInfo
                  key={i}
                  clicked={
                    clicked === undefined || clicked === user._id ? clicked : ''
                  }
                  setClicked={setClicked}
                  isFavorites={favorites.includes(user._id)}
                  color={onlineUsersIdx?.includes(user._id) ? 'red' : '#575757'}
                  rotation={[
                    getRandomArbitrary(0, Math.PI),
                    getRandomArbitrary(0, Math.PI),
                    getRandomArbitrary(0, Math.PI),
                  ]}
                  position={[
                    getRandomArbitrary(-3, 3),
                    4,
                    getRandomArbitrary(1, 2),
                  ]}
                  args={[0.5, 0.5, 0.5]}
                  meshProps={{
                    scale: [0.5, 0.5, 0.5],
                    castShadow: true,
                    receiveShadow: true,
                  }}
                >
                  <UserProfile
                    _id={user._id}
                    id={user.id}
                    age={user.age}
                    gender={user.gender}
                    nickname={user.nickname}
                    tear={user.lolTear}
                    lane={user.lolLane}
                    refreshTime={user.lolRefreshTime}
                    clickUpdateBtn={clickUpdateBtn}
                    isFavorites={favorites.includes(user._id)}
                    addFavorites={addFavorites}
                    removeFavorites={removeFavorites}
                  />
                </PhyBoxInfo>
              ))
            ) : (
              <></>
            )}

            <PhyString
              color="#F28B66"
              position={[0, 1.35, 0]}
              string="D?o"
              size={3}
              height={0.5}
              wordSpacing={-1}
              type="Static"
              meshProps={{ receiveShadow: true, castShadow: true }}
            />

            {/* 마이페이지 */}
            <PhyBoxMypage
              position={[-5, -5, 0]}
              mypageClicked={mypageClicked}
              maxSize={2.5}
              center={[617, 165]}
              type="save"
              onReset={onSaveNewMe}
            />
            <PhyBoxMypage
              position={[3, -3, 3]}
              mypageClicked={mypageClicked}
              maxSize={1.5}
              center={[-465, -215]}
              type="cancel"
              onReset={onCancelNewMe}
            />
          </Physics>

          {/* plane */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.1, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" transparent opacity={0.4} />
          </mesh>
        </Suspense>

        {/* <Controls /> */}
        <gridHelper />
      </Canvas>
    </StudioPage>
  );
}

export default Studio;
