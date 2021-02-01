import callApi from '../../utils/api';

export type updateLolInfoProps = {
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
  return callApi.get<{}, updateLolInfoProps>(`users/lolInfo/${idx}`);
};
