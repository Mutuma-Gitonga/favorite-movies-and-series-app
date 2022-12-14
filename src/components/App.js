import React from "react";
import {Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import MoviesList from "./MoviesList";
import AddAFavoriteMovieForm from "./AddAFavoriteMovieForm";


function App() {

  function handleAddNewMovie(newMovieObj) {
    fetch("https://favorite-movies-and-series-app.herokuapp.com/movies", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newMovieObj)
  })
  }
  
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/movies"><MoviesList /></Route>
        <Route path="/newMovie"><AddAFavoriteMovieForm onSubmit={handleAddNewMovie} /></Route>
      </Switch>
    </div>
  );
}

export default App;
