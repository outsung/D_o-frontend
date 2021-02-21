import styled from 'styled-components';

export const RoomBox = styled.div`
  position: absolute;
  right: 0px;

  width: 60px;
  height: 100vh;

  display: flex;
  align-items: center;

  z-index: 1;

  pointer-events: none;

  transition: all 0.4s;

  &.right {
    right: -60px;
  }
`;

export const RoomBoxUl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 100%;

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const RoomBoxDivider = styled.div`
  margin: 10px 0px;

  width: 80%;
  height: 2px;

  background-color: #000;

  &.off {
    display: none;
  }
`;

export const RoomBoxFavorites = styled.div`
  &.off {
    display: none;
  }
  & > div {
    background-color: #f2e950;
  }
`;
export const RoomBoxLately = styled.div`
  & > div {
    background-color: #50c0f2;
  }
`;

export const RoomBoxItem = styled.div<{ url?: string }>`
  position: relative;

  margin: 7px 0px;
  border-radius: 100px;

  width: 50px;
  height: 50px;

  line-height: 45px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;

  cursor: pointer;
  pointer-events: auto;

  ${(props) =>
    props.url
      ? `background-image: url(${props.url}); background-size: cover;`
      : `background-color: #adadad;`}

  &.on {
    &::after {
      content: '';

      position: absolute;
      top: 0px;
      right: 0px;

      display: block;
      border-radius: 20px;

      width: 10px;
      height: 10px;

      background-color: red;
    }
  }
`;

export const RoomPageBox = styled.div`
  position: absolute;
  left: calc(50vw - 325px);
  top: calc(50vh - 300px);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  z-index: 1;

  width: 750px;
  height: 600px;

  opacity: 0;

  pointer-events: none;

  transition: all 0.4s;

  &.on {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const RoomPageBoxMessageBox = styled.div`
  display: flex;

  padding: 13px 8px;

  &.right {
    justify-content: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }
`;
export const RoomPageBoxMessageBoxContents = styled.div`
  display: inline-block;

  border-radius: 13px;
  padding: 5px 8px;

  color: #fff;
  font-size: 18px;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const RoomPageBoxBackBtn = styled.div`
  padding: 10px;
  border-radius: 10px;

  background-color: #fff;

  cursor: pointer;
`;
