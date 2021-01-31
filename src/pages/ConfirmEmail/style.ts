import styled from 'styled-components';

export const ConfirmEmailPage = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

export const ContentsBox = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  z-index: 1000;
`;

export const Filter = styled.div<{ opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${(props) => `rgba(0, 0, 0, ${props.opacity})`};

  z-index: 100;
`;

export const SlothVideo = styled.video`
  position: relative;
  top: -18%;

  height: calc(100vh + 36%);
`;

export const Btn = styled.div`
  color: #fff;
  font-size: 20px;
  
  height: 40px;

  transition: all 0.2s;

  cursor: pointer;
  
  &:hover{
    font-size: 22px;
  } 
`;