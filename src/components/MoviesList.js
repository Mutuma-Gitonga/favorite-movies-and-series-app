import React, {useEffect, useState} from 'react';
import Movie from './Movie';

function MoviesList() {
  // State variable to store fetched movies
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [favoriteButtonState, setFavoriteButtonState] = useState(false);

  // Fetch movies list when user clicks on Movies
  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))
  },[]);

  function handleClick() {
    setFavoriteButtonState((favoriteButtonState) => !favoriteButtonState);
  }

  useEffect(() => {
    // Filtering movies to display
    if(favoriteButtonState){
      const filteredMovies = fetchedMovies.filter((fetchedMovie) => {
        return fetchedMovie.favorite === true;
      });
      console.log(filteredMovies);
      setFetchedMovies(() => filteredMovies);
    } else {
      fetch('http://localhost:3000/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))
    }
  },[favoriteButtonState]);

  return (
    <div>
      <button id="favoriteListButton" style={{margin: "auto", display: "block"}} onClick={handleClick}>{favoriteButtonState? "View All Movies" : "View Favorite Movies"}</button>
      {
        fetchedMovies.map(fetchedMovie => {
          return <Movie key={fetchedMovie.id} fetchedMovie={fetchedMovie} />
        })
      }
    </div>
  )
}

export default MoviesList;