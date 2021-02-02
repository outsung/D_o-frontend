import React, { Suspense, useEffect, useState, useRef } from 'react';
// import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { useSpring } from '@react-spring/three';
import socketio from 'socket.io-client';

import callCookie from '../../utils/cookie';

import { PhyChar, PhyPlane, PhyString } from '../../components/Phy';
import { PhyBoxInfo } from './PhyBoxInfo';

// import Controls from '../../utils/Controls';
import Loader from '../../components/Loader';

import UserProfile from '../../components/UserProfile';

import { StudioPage, WaitingBnt, UserInfoBox } from './style';

// @api
import { allget, allgetRes } from '../../container/users';

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

softShadows({});

const serverUrl =
  'https://duo-serverrr.herokuapp.com' || 'http://localhost:5000';

function CameraAnimation({ clicked }: { clicked: string | undefined }) {
  const { postionY } = useSpring({
    postionY: clicked ? 12 : 0,
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });
  useFrame((state) => {
    state.camera.position.y = postionY.get() + 3;
  });

  return <></>;
}

function Studio() {
  const [clicked, setClicked] = useState<string>();
  const [users, setUsers] = useState<[allgetRes]>();
  const [onlineUsersIdx, setOnlineUsersIdx] = useState<string[]>();
  const clickedUserRef = useRef<allgetRes>();

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

  if (clicked) clickedUserRef.current = users?.find((u) => u._id === clicked);

  return (
    <StudioPage>
      <WaitingBnt className={clicked ? 'on' : ''}>Next +4</WaitingBnt>
      <UserInfoBox className={clicked ? 'on' : ''}>
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
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 3, 6], fov: 60 }}
      >
        <fog attach="fog" args={['white', 0, 40]} />

        <CameraAnimation clicked={clicked} />

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
                    nickname={user.nickname}
                  />
                </PhyBoxInfo>
              ))
            ) : (
              <></>
            )}

            <PhyChar
              position={[0, 4, 1]}
              char="★"
              size={0.7}
              height={0.35}
              impulse={10}
              color="#fff"
            />

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

        {/* <Controls />
        <gridHelper /> */}
      </Canvas>
    </StudioPage>
  );
}

export default Studio;
