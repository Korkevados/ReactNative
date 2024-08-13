/** @format */

import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoriteContextProvider({ children }) {
  const [favoritemealsid, Setfavoritemealsid] = useState([]);

  function addFavorite(id) {
    Setfavoritemealsid((curr) => [...curr, id]);
  }

  function removeFavorite(id) {
    Setfavoritemealsid((curr) => curr.filter((mealid) => mealid !== id));
  }

  const value = {
    ids: favoritemealsid,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoriteContextProvider;
