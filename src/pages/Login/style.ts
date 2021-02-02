import styled, { keyframes } from 'styled-components';

import Page from '../pageStyle';

export const LoginPage = styled.div`
  ${Page}

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ForwardPage = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1;
`;

export const DuoTitle = styled.div`
  margin-bottom: 165px;

  font-size: 15vw;
  font-weight: bold;

  color: #944e61;
`;

const fadeinAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
export const Fadein = styled.div`
  width: 100%;
  height: 100%;

  animation: ${fadeinAnimation} 2s;
  animation-fill-mode: forwards;
`;
