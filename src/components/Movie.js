import React from "react";

function Movie({fetchedMovie}) {
  return (
    <div>
      <ul style={{listStyleType: "none"}}>
        <li>
          <img src={fetchedMovie.Poster} alt={fetchedMovie.Title} style={{margin: "auto", display: "block"}} />
          
          <p style={{textAlign:"center", color: "blue"}}>{fetchedMovie.Title}</p>
          
          {/* Adding to favorites === PATCH operation */}
          <button style={{margin: "auto", display: "block"}}>Add to Favorites &hearts;</button>
          <hr/>
        </li>
      </ul> 
    </div>
  );
}

export default Movie;
