import callApi from '../../utils/api';

export type getRoomRes = {
  result: 1 | -1;
  room: string[];
};
export const getRoom = function () {
  return callApi.get<{}, getRoomRes>(`users/room`);
};

export type patchRoomReq = {
  room: string[];
};
export type patchRoomRes = {
  result: 1 | -1;
  room: string[];
};
export const patchRoom = function (req: patchRoomReq) {
  return callApi.patch<patchRoomReq, patchRoomRes>(`users/room`, req);
};

export type message = {
  _id: string;
  writer: string;
  contents: string;
  date: Date;
  read: number;
};
export type getRoomByJwtAndIdxRes = {
  result: 1 | -1;
  _id: string;
  users: string[];
  messages: message[];
};
export const getRoomByJwtAndIdx = function (_id: string) {
  return callApi.get<{}, getRoomByJwtAndIdxRes>(`rooms/user/${_id}`);
};

export type addMessageInRoomReq = {
  contents: string;
};
export type addMessageInRoomRes = {
  result: 1 | -1;
  _id: string;
  users: string[];
  messages: message[];
};
export const addMessageInRoom = function (
  _id: string,
  req: addMessageInRoomReq,
) {
  return callApi.post<addMessageInRoomReq, addMessageInRoomRes>(
    `rooms/${_id}`,
    req,
  );
};
