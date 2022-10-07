import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return ( 
    <div className="navbar">
        <NavLink to="/">Home</NavLink><br/>
        <NavLink to="/movies">Movies</NavLink><br/>
        <NavLink to="/newMovie">Add a Favorite Movie</NavLink>
    </div>
  );
}

export default NavBar;
