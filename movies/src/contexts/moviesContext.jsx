import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };
  
  const [playlist, setPlaylist] = useState( [] )
  const addToPlaylist = (movie) => {
    setPlaylist(prev => {
      const next = [...prev, movie];
      console.log("playlist", next);
      return next;
    });
  };
 
  const [myReviews, setMyReviews] = useState( {} ) 
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);
 
 return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addToPlaylist,
        playlist,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
}
 
export default MoviesContextProvider;
