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

  &:hover {
    &::after {
      content: attr(data-email);

      position: absolute;
      right: 120%;
      top: calc(50% - 12.5px);

      display: inline-block;

      padding: 5px 5px;
      border-radius: 6px;

      line-height: 15px;
      font-size: 15px;
      color: #fff;

      white-space: nowrap;

      z-index: 1;

      background-color: rgba(0, 0, 0, 0.3);
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

export const RoomPageUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
`;
export const RoomPageUserInfoNickname = styled.a`
  font-size: 30px;
  font-weight: bold;

  text-decoration: none;
  color: #000;

  cursor: pointer;
`;
export const RoomPageUserInfoEmail = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export const RoomPageChatting = styled.div`
  border-radius: 15px;

  width: 750px;
  height: 500px;

  background-color: rgba(0, 0, 0, 0.3);

  overflow-y: scroll;

  z-index: 1;
`;

export const RoomPageMessageBox = styled.div`
  display: flex;

  padding: 13px 8px;

  &.right {
    justify-content: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }
`;
export const RoomPageMessageContents = styled.div`
  display: inline-block;

  border-radius: 13px;
  padding: 5px 8px;

  color: #fff;
  font-size: 18px;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const RoomPageBackBtn = styled.div`
  position: absolute;
  top: 15%;
  left: -74px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 6px 8px;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;

  font-size: 17px;
  font-weight: bold;

  background-color: #fff;

  opacity: 0.3;

  transition: all 0.4s;

  cursor: pointer;

  &:hover {
    left: -84px;

    opacity: 1;
  }
`;

export const RoomPageInputBox = styled.div`
  position: relative;

  width: 100%;
`;

export const RoomPageInput = styled.input`
  padding-left: 10px;
  border: solid 1px #dadada;
  border-radius: 6px;

  width: 100%;
  height: 45px;

  font-size: 16px;

  background: #fffafa;

  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
export const RoomPageInputBtn = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 6px;

  width: 60px;
  height: 35px;

  background-color: rgba(166, 88, 109, 0.8);
  opacity: 1;

  cursor: pointer;

  &.off {
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0.5;

    pointer-events: none;
  }
`;
