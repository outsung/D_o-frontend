import React, { Suspense, useEffect, useState } from 'react';
// import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { softShadows } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import socketio from 'socket.io-client';

import callCookie from '../../utils/cookie';

import { PhyPlane, PhyBoxInfo, PhyString } from '../../components/Phy';

// import Controls from '../../utils/Controls';
import Loader from '../../components/Loader';

import UserProfile from '../../components/UserProfile';

import { StudioPage, WaitingBnt } from './style';

// @api
import { allget, allgetRes } from '../../container/users';

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min; // 최댓값은 제외, 최솟값은 포함
// }

// const BOX_COLOR = ['#A6586D', '#394873', '#F27272', '#F2A663', '#F28B66'];

softShadows({});

const serverUrl =
  'https://duo-serverrr.herokuapp.com' || 'http://localhost:5000';

const Studio = () => {
  const [users, setUsers] = useState<[allgetRes]>();
  const [onlineUsersIdx, setOnlineUsersIdx] = useState<string[]>();

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

  return (
    <StudioPage>
      <WaitingBnt>Next +4</WaitingBnt>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 3, 6], fov: 60 }}
      >
        <fog attach="fog" args={['white', 0, 40]} />

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
              users.map((user) => (
                <PhyBoxInfo
                  key={`k${user.id}`}
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
};

export default Studio;
