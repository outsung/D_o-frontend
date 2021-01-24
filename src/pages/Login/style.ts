import styled, { keyframes } from 'styled-components';

import Page from '../pageStyle';

export const LoginPage = styled.div`
  ${Page}

  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const DuoTitle = styled.div`
  margin-bottom: 100px;

  font-size: 30vh;
  font-weight: bold;

  color: #F2A663;
`;


const fadeinAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`
export const Fadein = styled.div`
  width: 100%;
  height: 100%;

  animation: ${fadeinAnimation} 2s;
  animation-fill-mode: forwards;
`