import React, {useState, useEffect} from 'react'

function AddAFavoriteMovieForm() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [amongFavorites, setAmongFavorites] = useState(false);
  
  useEffect(() => {
    console.log("After",amongFavorites);
  },[amongFavorites]);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(movieTitle, movieYear, amongFavorites)
  }
  
  // Before implementing an external API, the poster image shall be set as static

  return (
    <div>
      <form style={{margin:"auto", border: "2px solid red", display: "inline-block", padding:"10px"}} onSubmit={handleSubmit}> 
        <label>
          Enter Movie Title:
          <br/>
          <input type="text" name="text" value={movieTitle} placeholder="" onChange={e => setMovieTitle(e.target.value)}/>
        </label>
        <br/>
        <label>
          Enter Movie Year:
          <br/>
          <input type="text" name="text" value={movieYear} placeholder="" onChange={e => setMovieYear(e.target.value)}/>
        </label>
        <br/>
        <label> 
        <input type="checkbox" id="favorite" name="favorite" value={amongFavorites} onChange={() => setAmongFavorites(!amongFavorites)}/>
          Is it among your favorites?
        </label><br></br>

        <input type="submit" name="submit" value="Find Gifs"/>
      </form>
    </div>
  )
}

export default AddAFavoriteMovieForm;