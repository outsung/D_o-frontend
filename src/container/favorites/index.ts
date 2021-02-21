import callApi from '../../utils/api';

export type getFavoritesRes = {
  result: 1 | -1;
  favorites: string[];
};
export const getFavorites = function () {
  return callApi.get<{}, getFavoritesRes>(`users/favorites`);
};

export type patchFavoritesReq = {
  favorites: string[];
};
export type patchFavoritesRes = {
  result: 1 | -1;
  favorites: string[];
};
export const patchFavorites = function (req: patchFavoritesReq) {
  return callApi.patch<patchFavoritesReq, patchFavoritesRes>(
    `users/favorites`,
    req,
  );
};
