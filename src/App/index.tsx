import React from 'react';

import Routes from './Routes';
import { Noise, Background } from '../components/Noise';

function App() {
  return (
    <>
      <Background />
      <Noise />
      <Routes />
    </>
  );
}
export default App;
