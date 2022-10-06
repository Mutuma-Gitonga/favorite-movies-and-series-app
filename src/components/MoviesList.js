import React, {useEffect, useState} from 'react';
import Movie from './Movie';

function MoviesList() {
  // State variable to store fetched movies
  const [fetchedMovies, setFetchedMovies] = useState([]);

  // Fetch movies list when user clicks on Movies
  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))
  },[]);

  function handleClick() {
    // Filtering favorite movies
    const favoriteMovies = fetchedMovies.filter((fetchedMovie) => {
      return fetchedMovie.favorite === true;
    });

    setFetchedMovies(favoriteMovies);
    
  }

  return (
    <div>
      <button style={{margin: "auto", display: "block"}} onClick={handleClick}>View Favorites</button>
      {
        fetchedMovies.map(fetchedMovie => {
          return <Movie key={fetchedMovie.id} fetchedMovie={fetchedMovie} />
        })
      }
    </div>
  )
}

export default MoviesList;