import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" class="navbar-brand" ><h1>Northcoders News</h1></Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <NavLink to="/" class="nav-link" >Articles</NavLink>
          </li>
          <li class="nav-item">
            <NavLink to="/topics" class="nav-link" >Topics</NavLink>
          </li>
          <li class="nav-item">
            <NavLink to="/users" class="nav-link" >Users</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;

{/* <div>
      <Link to="/"><h1>Northcoders News</h1></Link>
      <nav>
        <h3>Navigation</h3>
        <NavLink to="/">Articles</NavLink>
        {"  |  "}
        <NavLink to="/topics">Topics</NavLink>
        {"  |  "}
        <NavLink to="/users">Users</NavLink>
      </nav>
    </div> */}