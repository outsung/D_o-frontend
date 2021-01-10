import styled, { keyframes } from 'styled-components';

import Page from '../pageStyle';

export const EnptyPage = styled.div`
  ${Page}
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;


export const ErrorCodeText = styled.div`
  color: #F2A663;
  font-size: 30px;
`;

export const HmmText = styled.div`
  color: #F2A663;
  font-size: 300px;
  font-weight: bold
`;
