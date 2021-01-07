import React, { Suspense } from 'react';
import { Vector3 } from 'three';
import { Canvas } from 'react-three-fiber';

import Slerp from '../../components/Slerp';
import Loader from '../../components/Loader';
import Controls from '../../utils/Controls';

import Tv from './Tv';

interface afkProps {
  endAfk: () => void;
}

function Afk({ endAfk }: afkProps) {
  return (
    <Canvas
      concurrent
      camera={{
        position: [0, 1, 4],
        fov: 70,
      }}
    >
      <Suspense fallback={<Loader />}>
        {/* <Slerp> */}
        <Tv />
        <spotLight
          intensity={0.4}
          position={[30, 15, 25]}
          lookAt={() => new Vector3(0, 0, 0)}
          penumbra={2}
          castShadow
        />
        <ambientLight intensity={0.1} />

        <Controls />
        <gridHelper />
      </Suspense>
      {/* </Slerp> */}
    </Canvas>
  );
}

export default Afk;
