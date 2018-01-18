import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link to="/"><h1>Northcoders News</h1></Link>
      <nav>
        <h3>Navigation</h3>
        <NavLink to="/">Articles</NavLink>
        {"  |  "}
        <NavLink to="/topics">Topics</NavLink>
        {"  |  "}
        <NavLink to="/users">Users</NavLink>
      </nav>
    </div>
  )
}

export default NavBar;