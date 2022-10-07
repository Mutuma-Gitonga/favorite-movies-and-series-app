import React, {useState, useRef} from "react";

function Movie({fetchedMovie, onMovieFavorite, favoriteButtonState}) {
  // const [removeFavorite, setRemoveFavorite] = useState(false);
  // const [favoriteState, setFavoriteState] = useState();
  const favoriteRef = useRef(true);

  console.log(favoriteButtonState)
  function handleClick() {
    console.log("favoriteButtonState in favorite",favoriteButtonState)
    if(favoriteButtonState) {
      // setFavoriteState(false);
      // console.log("favorite state under favorites",favoriteState);
      favoriteRef.current = false;
    } else {
      // console.log("favorite state",favoriteState);
      // setFavoriteState(true);
      favoriteRef.current = true;
    }
    console.log("favoriteRef", favoriteRef.current)

    // Persist true favorite boolean status in the db.json file when "add to favorites button's clicked"
    fetch(`http://localhost:3000/movies/${fetchedMovie.id}`, {
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
 
  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <li>
          <img src={fetchedMovie.Poster} alt={fetchedMovie.Title} style={{margin: "auto", display: "block"}} />
          
          <p style={{textAlign:"center", color: "blue"}}>{fetchedMovie.Title}</p>
          
          {/* Adding to favorites === PATCH operation */}
          <button style={{margin: "auto", display: "block"}} onClick={handleClick}>{favoriteButtonState ? "Remove from Favorites": "Add to Favorites &hearts;"}</button>
          <hr/>
        </li>
      </ul> 
    </div>
  );
}

export default Movie;
