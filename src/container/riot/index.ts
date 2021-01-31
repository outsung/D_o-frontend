import callApi from '../../utils/api';

// [bad]

export type getSummonerRes = {
  id: string,
  accountId: string,
  puuid: string,
  name: string,
  profileIconId: number,
  revisionDate: number,
  summonerLevel: number
};
export const getSummoner = function(nickname: string) {
  const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`;
  return callApi.get<{}, getSummonerRes>(url);
};
