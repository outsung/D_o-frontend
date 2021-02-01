import callApi from '../../utils/api';
import callCookie from '../../utils/cookie';

// login
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
export const login = async function (req: loginReq) {
  const res = await callApi.post<loginReq, loginRes>('users/login', req);
  if (res?.result) {
    const token = `${res?.tokenType} ${res?.accessToken}`;
    callCookie.set('jwt', token, 2);
  }
  return res;
};

// signup
export type signupReq = {
  id: string;
  password: string;
  nickname: string;
};
export type signupRes = {
  result: 1 | -1;
  message: string;
};
export const signup = async function (req: signupReq) {
  const res = await callApi.post<signupReq, signupRes>('users/signup', req);
  return res;
};

// confirmEmail
export type confirmEmailRes = {
  result: 1 | -1;
  message: string;
};
export const confirmEmail = async function (key: string) {
  const res = await callApi.get<{}, confirmEmailRes>(
    `users/confirmEmail/${key}`,
  );
  return res;
};

// allget
export type allgetRes = {
  _id: string;
  id: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
};
export const allget = function () {
  return callApi.get<{}, [allgetRes]>('users/test');
};

// getByIdx
export type getByIdxRes = {
  result: 1 | -1;
  idx: string;
  id: string;
};
export const getByIdx = function (_id: string) {
  return callApi.get<{}, getByIdxRes>(`users/idx/${_id}`);
};
