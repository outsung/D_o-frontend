import styled from 'styled-components';

// 배경 색 : #A6586D, #394873, #F27272
// 글자 색 : #F2A663, #F28B66

export const StudioPage = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

export const WaitingBnt = styled.div`
  position: absolute;

  bottom: 7vh;
  left: 4vw;

  border-radius: 12px;

  width: 400px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  background-color: #394873;

  color: #000;
  font-size: 40px;
  font-weight: bold;

  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
