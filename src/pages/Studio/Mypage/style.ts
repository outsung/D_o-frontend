import styled from 'styled-components';

export const MypageBox = styled.div`
  position: absolute;
  left: calc(50vw - 500px);
  top: calc(50vh - 400px);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 1000px;
  height: 800px;

  opacity: 0;

  transition: all 0.4s;

  &.on {
    opacity: 1;
  }
`;

export const MypageCategory = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 80%;
`;

export const MypageTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

export const MypageFieldBox = styled.div`
  &.main-info {
    display: inline-flex;
    align-items: center;

    border-bottom: 1px solid #000;
    padding: 0px 20px;

    height: 120px;
  }
  &.info {
    text-align: right;
  }
`;

export const MypageFieldImageBox = styled.div`
  border-radius: 100px;

  width: 80px;
  height: 80px;

  overflow: hidden;
`;
export const MypageFieldImage = styled.div<{ url: string }>`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;
export const MypageFieldText = styled.div`
  margin-left: auto;
  margin-right: 40px;

  font-size: 30px;
  font-weight: bold;
`;
export const MypageFieldInput = styled.input`
  display: block;

  margin-left: auto;
  margin-right: 40px;
  border: none;

  width: 80%;

  text-align: right;

  font-size: 30px;
  font-weight: bold;

  background-color: rgba(0, 0, 0, 0);

  &:focus {
    outline: none;
  }
`;

export const MypageFieldItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: 20px 0px;
  padding-right: 50px;
`;

export const MypageFieldItemLabel = styled.div`
  border-radius: 5px;
  margin-right: 15px;

  font-size: 25px;
  font-weight: bold;

  background-color: rgba(246, 212, 75, 0.3);
`;

export const MypageFieldItemInput = styled.input`
  display: inline;

  border: none;

  width: 100px;

  color: #000;

  font-size: 18px;
  font-weight: bold;

  background-color: rgba(0, 0, 0, 0);

  &:focus {
    border-bottom: 1px solid #000;
    outline: none;
  }
`;
export const MypageFieldItemText = styled.div`
  display: inline;

  width: 100px;

  text-align: left;

  color: #000;

  font-size: 18px;
  font-weight: bold;
`;

export const MypageFieldItemSelect = styled.select`
  border: none;

  width: 100px;

  font-size: 18px;
  font-weight: bold;

  background-color: rgba(0, 0, 0, 0);

  &:focus {
    outline: none;
  }
`;
export const MypageFieldItemToggle = styled.div``;

export const MypageFieldItemUndefined = styled.h3`
  margin: 30px 0px;

  text-align: center;
`;
