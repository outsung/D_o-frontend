import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  border-radius: 12px;

  width: 420px;

  // background-color: #FFF;
`;

export const Input = styled.input`
  margin-bottom: 8px;

  border: solid 1px #dadada;
  border-radius: 6px;

  padding-left: 10px;

  width: 90%;
  height: 45px;

  font-size: 16px;

  background: #fffafa;

  &:focus {
    outline: none;
  }
`;

export const InputName = styled.div`
  display: inline-flex;

  width: 15%;
  margin-right: 3%;

  color: #fffafa;
`;

export const LinkContainer = styled.div`
  display: flex;

  margin-top: 10px;

  padding: 0px 12px;

  width: 420px;

  color: gray;

  box-sizing: border-box;
`;

export const LoginLink = styled.div`
  color: #0c0000;
  opacity: 0.6;

  text-decoration: none;
  cursor: pointer;
`;

export const FindLink = styled.div`
  margin-left: auto;

  color: #0c0000;
  opacity: 0.6;

  text-decoration: none;
  cursor: pointer;
`;

export const SignupBtn = styled.button`
  margin-top: 60px;

  border: none;
  border-radius: 12px;

  width: 420px;
  height: 100px;

  color: #fffafa;
  font-size: 50px;
  font-weight: bold;

  background-color: #f2a663;

  cursor: pointer;

  &.on {
    background-color: #d99559;
    color: #e6e1e1;
  }
`;
