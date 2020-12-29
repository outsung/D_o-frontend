import styled from 'styled-components';

import Page from '../pageStyle';

export const LoginPage = styled.div`
  ${Page}

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const DuoTitle = styled.div`
  position: relative;
  top: -1vw;

  color: black;
  font-size: 10vw;
`;

type lineProps = {
  percent?: string
  weight?: string
  color?: string
};

export const Line = styled.div<lineProps>`
  
  ${(props) => `
    width: ${props.percent || '100%'};
    height: ${props.weight || '5px'};
    color: ${props.color || '10vw'};
  `};
`;
