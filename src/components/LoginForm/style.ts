import styled from 'styled-components';
import { Link }from 'react-router-dom'

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  border-radius: 12px;


  width: 420px;

  // background-color: #FFF;
`;

export const Input = styled.input`
  border: solid 1px #dadada;

  margin-bottom: 8px;

  width: 90%;
  height: 29px;
  
  background: #fff;
`;

export const InputName = styled.div`
  display: inline-flex;

  width: 15%;
  margin-right: 3%;

  color: #FFFAFA;
`;


export const LinkContainer = styled.div`
  display: flex;

  margin-top: 10px;

  padding: 0px 12px;

  width: 420px;

  color: gray;

  box-sizing: border-box;
`;

export const SignupLink = styled(Link)`
  color: #0C0000;
  opacity: 0.6;

  text-decoration: none;
`;

export const FindLink = styled(Link)`
  margin-left: auto;

  color: #0C0000;
  opacity: 0.6;
  
  text-decoration: none;
`;


export const LoginBtn = styled.button`
  margin-top: 60px;

  border: none;
  border-radius: 12px;

  width: 420px;
  height: 100px;

  color: #FFFAFA;
  font-size: 50px;
  font-weight: bold;

  background-color: #F2A663;

`;