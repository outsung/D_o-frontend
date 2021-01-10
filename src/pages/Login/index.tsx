import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';

import Loader from '../../components/Loader';
import Model from '../Hand/Model';
import Controls from '../../utils/Controls';

import { LoginPage, DuoTitle, IntroLineToBox, Fadein } from './style';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  const a = 10;

  return (
    <LoginPage>
      <Canvas style={{ backgroundColor: '#FFF' }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
        </Suspense>
        <Controls />
        <gridHelper />
      </Canvas>
    </LoginPage>
  );
};
export default Login;
