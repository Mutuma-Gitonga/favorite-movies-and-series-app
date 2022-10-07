import React, {useEffect, useState} from 'react';
import Movie from './Movie';

function MoviesList() {
  // State variable to store fetched movies
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [favoriteButtonState, setFavoriteButtonState] = useState(false);
  const [areFavoriteMoviesAvailable, setAreFavoriteMoviesAvailable] = useState(true);
  const [movieRemovedFromFavorites, setMovieRemovedFromFavorites] = useState(false);

  // Fetch movies list when user clicks on Movies
  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))

    // setFavoriteButtonState((favoriteButtonState) => favoriteButtonState = false);
  },[]);

  console.log(fetchedMovies);

  function handleClick() {
    setFavoriteButtonState((favoriteButtonState) => !favoriteButtonState);
  }

  useEffect(() => {
    // Filtering movies to display
    if(favoriteButtonState){
      const filteredMovies = fetchedMovies.filter((fetchedMovie) => {
        return fetchedMovie.favorite === true;
      });
      
      filteredMovies.length !== 0 ? setAreFavoriteMoviesAvailable(areFavoriteMoviesAvailable => areFavoriteMoviesAvailable = true) : setAreFavoriteMoviesAvailable(areFavoriteMoviesAvailable => areFavoriteMoviesAvailable = false);

      setFetchedMovies(() => filteredMovies);
      setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites = false)
    } else {
      fetch('http://localhost:3000/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))
    }
  },[favoriteButtonState,movieRemovedFromFavorites]);

  // Callback function to update fetchedMovies frontend state following PATCH operation
  function handleMovieFavorite(patchedMovieId, favState) {
    console.log(patchedMovieId,favState);
    
    const updatedMoviesAfterPatch = fetchedMovies.map((movie) => {
      if(movie.id === patchedMovieId){
        return {...movie, favorite: favState};
      } else {
        return movie;
      }
    });
    setFetchedMovies(() => updatedMoviesAfterPatch);

    favState ? setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites) : setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites = true);
    
  }

  return (
    <div>
      <button id="favoriteListButton" style={{margin: "auto", display: "block"}} onClick={handleClick}>{favoriteButtonState? "View All Movies" : "View Favorite Movies"}</button>
      
      { areFavoriteMoviesAvailable || !favoriteButtonState ?
          fetchedMovies.map(fetchedMovie => {
            return <Movie key={fetchedMovie.id} fetchedMovie={fetchedMovie} onMovieFavorite={handleMovieFavorite} favoriteButtonState={favoriteButtonState} />
          }) :
            <p style={{textAlign: "center", color: "red", fontSize: "2em" }}>No favorite movies at the moment. <br/> Please click on "View all Movies" to add your favorite ones.</p>
      }
    </div>
  )
}

export default MoviesList;