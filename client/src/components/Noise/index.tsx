import styled, { keyframes } from 'styled-components';

import background from './background.png';

const noiseAnimationGenerator = (x: number, y: number) =>
  `-webkit-transform: translate(${x}%,${y}%); transform: translate(${x}%,${y}%);`;

const noiseAnimation = keyframes`
  0% {${noiseAnimationGenerator(0, 0)}}
  10% {${noiseAnimationGenerator(-5, -5)}}
  20% {${noiseAnimationGenerator(-10, 5)}}
  30% {${noiseAnimationGenerator(5, -10)}}
  40% {${noiseAnimationGenerator(-5, 15)}}
  50% {${noiseAnimationGenerator(-10, 5)}}
  60% {${noiseAnimationGenerator(15, 0)}}
  70% {${noiseAnimationGenerator(0, 10)}}
  80% {${noiseAnimationGenerator(-15, 0)}}
  90% {${noiseAnimationGenerator(10, 5)}}
  100% {${noiseAnimationGenerator(5, 0)}}
`;

const Noise = styled.div`
  position: fixed;

  /*
  width: 100%;
  height: 180%;
  */

  width: 180%;
  height: 180%;
  left: -40%;
  top: -40%;

  background: #f7f3ea;
  background-image: url(${background});

  z-index: -1;

  -webkit-animation: ${noiseAnimation} 1s steps(4) infinite;
  animation: ${noiseAnimation} 1s steps(4) infinite;
`;

export default Noise;
