import React, {useEffect, useState} from 'react';
import Movie from './Movie';

function MoviesList() {
  // State variable to store fetched movies
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [favoriteButtonState, setFavoriteButtonState] = useState(false);
  const [areFavoriteMoviesAvailable, setAreFavoriteMoviesAvailable] = useState(true);
  const [movieRemovedFromFavorites, setMovieRemovedFromFavorites] = useState(false);
  // const [newMovieButtonState, setNewMovieButtonState] = useState(false);

  // Fetch movies list when user clicks on Movies
  useEffect(() => {
    fetch('https://favorite-movies-and-series-app.herokuapp.com/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))

    // setFavoriteButtonState((favoriteButtonState) => favoriteButtonState = false);
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
      
      filteredMovies.length !== 0 ? setAreFavoriteMoviesAvailable(areFavoriteMoviesAvailable => areFavoriteMoviesAvailable = true) : setAreFavoriteMoviesAvailable(areFavoriteMoviesAvailable => areFavoriteMoviesAvailable = false);

      setFetchedMovies(() => filteredMovies);
      setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites = false)
    } else {
      fetch('https://favorite-movies-and-series-app.herokuapp.com/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))
      
      setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites = false)
    }
  },[favoriteButtonState,movieRemovedFromFavorites]);

  // Callback function to update fetchedMovies frontend state following PATCH operation
  function handleMovieFavorite(patchedMovieId, favState) {
    
    const updatedMoviesAfterPatch = fetchedMovies.map((movie) => {
      if(movie.id === patchedMovieId){
        return {...movie, favorite: favState};
      } else {
        return movie;
      }
    });
    setFetchedMovies(() => updatedMoviesAfterPatch);

    // Update movieRemovedFromFavorites boolean state to true if movie has been deleted to re-render the movie cards
    favState ? setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites) : setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites = true);
    
  }

  function handleMovieDelete(deletedMovieId) {
    const updatedMoviesAfterDelete = fetchedMovies.filter(movie => movie.id !== deletedMovieId);
    setFetchedMovies(() => updatedMoviesAfterDelete);

    // Update to true to trigger useEffect hook to re-render the new movie cards list
    setMovieRemovedFromFavorites(movieRemovedFromFavorites => movieRemovedFromFavorites = true);
  }

  // function handleNewMovieClick() {
  //   setNewMovieButtonState(newMovieButtonState => !newMovieButtonState);
  // }

  // if(newMovieButtonState) return <Redirect to="/newMovie" />;

  // <button style={{float: "left"}} onClick={handleNewMovieClick}>Add a New Movie</button>
        
  return (
    <div>
        
        <button id="favoriteListButton" style={{margin: "auto", display: "block"}} onClick={handleClick}>{favoriteButtonState? "View All Movies" : "View Favorite Movies"}</button>

        { areFavoriteMoviesAvailable || !favoriteButtonState ?
            fetchedMovies.map(fetchedMovie => {
              return <Movie key={fetchedMovie.id} fetchedMovie={fetchedMovie} onMovieFavorite={handleMovieFavorite} favoriteButtonState={favoriteButtonState} onMovieDelete={handleMovieDelete} />
            }) :
              <p style={{textAlign: "center", color: "red", fontSize: "2em" }}>No favorite movies at the moment. <br/> Please click on "View all Movies" to add your favorite ones.</p>
        }
    </div>
  )
}

export default MoviesList;