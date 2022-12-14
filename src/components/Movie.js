import React, {useState, useRef} from "react";

function Movie({fetchedMovie, onMovieFavorite, favoriteButtonState, onMovieDelete}) {
  const favoriteRef = useRef(true);
  const [imageLoadErr, setImageLoadErr] = useState(false);
  
  const fallbackImage = `https://dummyimage.com/182x268/000/fff&text=Movie+title`;

  function handleFavoriteClick() {
    console.log("favoriteButtonState in favorite",favoriteButtonState)
    if(favoriteButtonState) {
      favoriteRef.current = false;
    } else {
      favoriteRef.current = true;
    }
    console.log("favoriteRef", favoriteRef.current)

    // Persist true favorite boolean status in the db.json file when "add to favorites button's clicked"
    fetch(`https://favorite-movies-and-series-app.herokuapp.com/movies/${fetchedMovie.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({favorite: favoriteRef.current})
      })
      .then(res => res.json())
        // Update the item favorite status in state using callback (inverse data flow)
        // Ensures the newly favorited items appear on the frontend
        .then(movie => onMovieFavorite(movie.id, favoriteRef.current))

    // console.log("Removed movie ID",fetchedMovie.id);
  }

  function handleDeleteClick() {
    fetch(`https://favorite-movies-and-series-app.herokuapp.com/movies/${fetchedMovie.id}`, {
      method: "DELETE"
    });

    onMovieDelete(fetchedMovie.id);
  }
 
  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <li>
          <img src={imageLoadErr ? fallbackImage : fetchedMovie.Poster} alt={fetchedMovie.Title} style={{margin: "auto", display: "block"}} onError={() => setImageLoadErr(true)} />
          
          <p style={{textAlign:"center", color: "blue"}}>{fetchedMovie.Title}</p>
          
          {/* Adding to favorites/Removing from favorites === PATCH operation */}
          <button style={{margin: "auto", display: "block"}} onClick={handleFavoriteClick}>{favoriteButtonState ? "Remove from Favorites": "Add to Favorites"}</button>
          <br/>

          {/* Delete movie === DELETE operation */}
          <button style={{margin: "auto", display: "block"}} onClick={handleDeleteClick}>Delete Movie</button>
          <hr/>
        </li>
      </ul> 
    </div>
  );
}

export default Movie;
