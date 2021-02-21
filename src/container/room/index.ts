import callApi from '../../utils/api';

export type getRoomsRes = {
  result: 1 | -1;
  rooms: string[];
  uncheckedRoom: string[];
};
export const getRooms = function () {
  return callApi.get<{}, getRoomsRes>(`users/rooms`);
};

export type patchRoomsReq = {
  rooms: string[];
};
export type patchRoomsRes = {
  result: 1 | -1;
  rooms: string[];
};
export const patchRooms = function (req: patchRoomsReq) {
  return callApi.patch<patchRoomsReq, patchRoomsRes>(`users/rooms`, req);
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
    `rooms/user/${_id}`,
    req,
  );
};
