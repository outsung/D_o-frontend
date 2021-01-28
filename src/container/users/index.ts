import callApi from '../../utils/api';
import callCookie from '../../utils/cookie';


export type loginReq = {
  id: string;
  password: String;
};
export type loginRes = {
  result: 1 | -1;
  idx: string;
  id: string;
  accessToken: string;
  tokenType: string;
};
export const login = async function(req :loginReq){
  const res = await callApi.post<loginReq, loginRes>('users/login', req)
  if(res?.result){
    const token = `${res?.tokenType} ${res?.accessToken}`;
    callCookie.set('jwt', token, 2);
  }
  return res;
}


export type signup = {
  
}






export type allgetRes = { 
  _id: string,
  id: string,
  password: string,
  salt: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
}
export const allget = function(){
  return callApi.get<{}, [allgetRes]>("users/test");
}