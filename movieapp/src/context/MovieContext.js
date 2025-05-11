import { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem("lastSearch") || "");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("lastSearch", searchQuery);
  }, [searchQuery]);

  const toggleFavorite = (movie) => {
    const exists = favorites.some((fav) => fav.id === movie.id);
    const updatedFavorites = exists
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updatedFavorites);
  };

  return (
    <MovieContext.Provider value={{
      movies, setMovies,
      favorites, setFavorites,
      searchQuery, setSearchQuery,
      toggleFavorite
    }}>
      {children}
    </MovieContext.Provider>
  );
};
