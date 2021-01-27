import React, { Suspense, useEffect, useState } from 'react';
// import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { softShadows } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import socketio from 'socket.io-client';

import { PhyPlane, PhyBox } from '../../components/Phy';

// import Controls from '../../utils/Controls';
import Loader from '../../components/Loader';

import { StudioPage, WaitingBnt } from './style';

import TextGeometry from '../../components/TextGeometry';

// @api
import { allget, usersType } from '../../container/user/allGet';

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

const socket = socketio.connect('https://duo-serverrr.herokuapp.com');

const Studio = () => {
  const [users, setUsers] = useState<[usersType]>();

  const init = async function () {
    setUsers(await allget());
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    socket.on('online', (onlineString: string) => {
      const array = JSON.parse(onlineString);
      alert(array);
    });

    return function () {
      socket.close();
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
          intensity={1.5}
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
            <PhyPlane position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <PhyPlane position={[0, 0, -5]} />
            <PhyPlane position={[8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

            {users ? (
              users.map((user) => (
                <PhyBox
                  key={`k${user.id}`}
                  email={user.id}
                  color="#575757"
                  rotation={[
                    getRandomArbitrary(0, Math.PI),
                    getRandomArbitrary(0, Math.PI),
                    getRandomArbitrary(0, Math.PI),
                  ]}
                  position={[
                    getRandomArbitrary(-1, 1),
                    4,
                    getRandomArbitrary(2, 4),
                  ]}
                />
              ))
            ) : (
              <></>
            )}

            <TextGeometry
              receiveShadow
              castShadow
              position={[-3.1, 0, 0]}
              text="D?o"
              size={3}
              height={0.5}
              color="#F28B66"
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
