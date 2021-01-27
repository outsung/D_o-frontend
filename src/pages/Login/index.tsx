import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from 'react-three-fiber';
import { Physics } from '@react-three/cannon';
// import { HTML } from '@react-three/drei';

import { LoginPage, ForwardPage, DuoTitle } from './style';
import LoginForm from '../../components/LoginForm';

import {
  PhyPlane,
  PhyChar,
  PhyString,
  phyCharProps,
} from '../../components/Phy';

// import Controls from '../../utils/Controls';

function WelcomeText({ children }: { children: JSX.Element }) {
  return (
    <Canvas
      colorManagement
      shadowMap
      camera={{ position: [-5.5, 5, 8.5], fov: 60 }}
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

      {/* cannon */}
      <Physics gravity={[0, -10, 0]}>
        <PhyPlane
          position={[0, -0.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          meshProps={{ visible: false }}
        />
        <PhyPlane position={[0, 0, -5]} meshProps={{ visible: false }} />
        <PhyPlane
          position={[6, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          meshProps={{ visible: false }}
        />

        {children}

        <PhyString
          color="#DB6251"
          position={[0, 4, 0.01]}
          string="Welcome!"
          size={2}
          height={1.5}
          wordSpacing={-1}
          meshProps={{ receiveShadow: true, castShadow: true }}
        />

        <PhyChar
          color="#F28B66"
          position={[-2, 2, 0]}
          char="D"
          size={3}
          height={0.5}
          meshProps={{ receiveShadow: true, castShadow: true }}
        />
        <PhyChar
          color="#F28B66"
          position={[0, 2, 0]}
          char="?"
          size={3}
          height={0.5}
          meshProps={{ receiveShadow: true, castShadow: true }}
        />
        <PhyChar
          color="#F28B66"
          position={[2, 2, 0]}
          char="o"
          size={3}
          height={0.5}
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
    </Canvas>
  );
}

function JamminText({ jamminChars }: { jamminChars: phyCharProps[] }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(new THREE.Vector3(0, 0.5, 0));
  }, [camera]);

  return (
    <>
      {jamminChars.map((jamminChar) => (
        <PhyChar {...jamminChar} />
      ))}
    </>
  );
}

/*
color="#F28B66"
position={[-2, 0, 2]}
char={char}
size={0.5}
height={0.1}
impulse={10}
meshProps={{ receiveShadow: true, castShadow: true }}
*/

// Option Generator by Name
const OPTION_GENERATOR_BY_NAME = [
  {
    name: 'email',
    option: (char: string) => ({
      color: '#F28B66',
      position: [0.2, 0, 3.2],
      char,
      size: 0.5,
      height: 0.1,
      impulse: 10,
      meshProps: { receiveShadow: true, castShadow: true },
    }),
  },
  {
    name: 'password',
    option: () => ({
      color: '#F28B66',
      position: [-0.6, 0, 4],
      char: '*',
      size: 0.5,
      height: 0.1,
      impulse: 10,
      meshProps: { receiveShadow: true, castShadow: true },
    }),
  },
];
function Login() {
  const [jamminChars, setJamminChars] = useState<phyCharProps[]>([]);

  const addJamminChars = (name: string, char: string) => {
    const optionGenerator = OPTION_GENERATOR_BY_NAME.find(
      (o) => o.name === name,
    );

    if (!optionGenerator)
      throw new Error('Unexpected name in OPTION_GENERATOR_BY_NAME');

    setJamminChars([...jamminChars, optionGenerator.option(char)]);
  };

  return (
    <LoginPage>
      <ForwardPage>
        <WelcomeText>
          <JamminText jamminChars={jamminChars} />
        </WelcomeText>
      </ForwardPage>
      <DuoTitle>D?o</DuoTitle>
      <LoginForm onTyping={addJamminChars} />
    </LoginPage>
  );
}
export default Login;
