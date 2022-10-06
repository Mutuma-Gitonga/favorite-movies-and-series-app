import React from "react";
import {Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import MoviesList from "./MoviesList";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/movies"><MoviesList /></Route>
      </Switch>
    </div>
  );
}

export default App;
