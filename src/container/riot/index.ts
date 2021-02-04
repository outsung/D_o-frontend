import callApi from '../../utils/api';

export type updateLolInfoRes = {
  result: 1 | -1;
  idx: string;
  id: string;
  nickname: string;
  profileImageUrl: string;
  lolTear: string;
  lolLevel: string;
  lolLane: string;
  lolChampion: string;
};
export const updateLolInfo = function (idx: string) {
  return callApi.get<{}, updateLolInfoRes>(`users/lolInfo/${idx}`);
};
