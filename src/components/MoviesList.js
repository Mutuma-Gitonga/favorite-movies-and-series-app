import React, {useEffect, useState} from 'react'

function MoviesList() {
  // State variable to store fetched movies
  const [fetchedMovies, setFetchedMovies] = useState([]);

  // Fetch movies list when user clicks on Movies
  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then(res => res.json())
        .then(moviesDb => setFetchedMovies(moviesDb))
  },[]);

  return (
    <div>
      {
        fetchedMovies.map(fetchedMovie => {
          return <Movie key={fetchedMovie.id} fetchedMovie={fetchedMovie} />
        })
      }
    </div>
  )
}

export default MoviesList;