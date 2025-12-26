import { useState, useEffect } from 'react';

export interface Property {
  id: string;
  title: string;
  price: number;
  image: string;
  area: number;
  rooms: number;
  floor: number;
  address: string;
  type: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addToFavorites = (property: Property) => {
    const updated = [...favorites, property];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFromFavorites = (id: string) => {
    const updated = favorites.filter(p => p.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id: string) => {
    return favorites.some(p => p.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return { favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites };
};
