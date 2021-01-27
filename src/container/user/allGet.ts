import callApi from '../../utils/api';

export type usersType = { 
  _id: string,
  id: string,
  password: string,
  salt: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
}

export const allget = function(){
  return callApi.get<{}, [usersType]>("users/test");
}
