import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <h1>Northcoders News</h1>
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