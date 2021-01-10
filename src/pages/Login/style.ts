import styled, { keyframes } from 'styled-components';

import Page from '../pageStyle';

export const LoginPage = styled.div`
  ${Page}

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;


export const DuoTitle = styled.div`
  position: absolute;
  top: 7vh;
  margin-left: 2vw;

  color: black;
  font-size: 10vw;
`;



const lineAnimation = (from: string, to: string) => keyframes`
  from { width: ${from}; }
  to { width: ${to}; }
`;

const lineToBoxAnimation = (from: string, to: string) => keyframes`
  from { height: ${from}; }
  to { height: ${to}; }
`;

type introLineProps = {
  lineDuration: number;
  boxDuration: number;
  width?: string;
  height?: string;
  color?: string;
};
export const IntroLineToBox = styled.div<introLineProps>`
  position: absolute;

  height: 0px;
  
  animation: ${
    p => lineAnimation("0", p.width || "100%")} ${p => p.lineDuration
  }s, ${
    p => lineToBoxAnimation("0", p.height || "100%")} ${p => p.boxDuration}s ${p => p.lineDuration
  }s;
  animation-fill-mode: forwards;

  ${(props) => `
    border: 1px solid ${props.color || 'black'};
  `};
  
`;


const fadeinAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`
export const Fadein = styled.div`
  animation: ${fadeinAnimation} 2s;
  animation-fill-mode: forwards;
`