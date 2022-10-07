import React, {useState} from 'react'

function AddAFavoriteMovieForm({onSubmit}) {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [amongFavorites, setAmongFavorites] = useState(false);
  
  const posterUrl = `https://dummyimage.com/182x268/000/fff&text=Movie+title`;

  function handleSubmit(e) {
    e.preventDefault();

    const newMovieObj =  {
      Title : movieTitle, 
      Year: movieYear, 
      favorite: amongFavorites, 
      Poster: posterUrl
    }
    // console.log("newMovieObj",newMovieObj);
    onSubmit(newMovieObj);

    setMovieTitle("");
    setMovieYear("");
    setAmongFavorites(false);
  }

  return (
    <div>
      <form style={{margin:"auto", marginTop: "20px", display: "inline-block", border: "2px solid blue", padding:"10px"}} onSubmit={handleSubmit}> 
      <h2>Add A New Movie</h2>
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
        <input type="checkbox" id="favorite" name="favorite" checked={amongFavorites} onChange={() => setAmongFavorites(!amongFavorites)}/>
          Is it a favorite?
        </label><br></br>

        <input type="submit" name="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default AddAFavoriteMovieForm;