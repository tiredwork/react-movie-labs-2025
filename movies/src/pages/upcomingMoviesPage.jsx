import React, { useContext } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from "../components/cardIcons/playlistAdd";
import { MoviesContext } from "../contexts/moviesContext";


const HomePage = (props) => {
  const { addToPlaylist } = useContext(MoviesContext);

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover', { type: 'upcoming' }],
    queryFn: getUpcomingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  const handleAddToPlaylist = (movie) => {
    if (typeof addToPlaylist === 'function') {
      addToPlaylist(movie);
    }
  };

   return (
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} onAddToPlaylist={() => handleAddToPlaylist(movie)} />
        }}
      />
  );
}

export default HomePage;
