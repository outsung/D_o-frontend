import { useEffect, useState } from 'react';
import { getFavorites, patchFavorites } from '../../../container/users';

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const init = async () => {
    const res = await getFavorites();
    setFavorites(res && res.result === 1 ? res.favorites : []);
  };

  useEffect(() => {
    init();
  }, []);

  const addFavorites = async (_id: string) => {
    if (!favorites) return;
    const res = await patchFavorites({ favorites: [...favorites, _id] });

    setFavorites(res && res.result === 1 ? res.favorites : []);
  };
  const removeFavorites = async (_id: string) => {
    if (!favorites) return;
    const res = await patchFavorites({
      favorites: favorites.filter((f) => f !== _id),
    });

    setFavorites(res && res.result === 1 ? res.favorites : []);
  };

  return { favorites, addFavorites, removeFavorites };
}
