import React from 'react';

import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__list">
        <NavLink
          to="/another"
          className="navbar__item"
          activeClassName="navbar__item--active"
          >
          <i className="fa fa-bars"></i>
        </NavLink>
        <NavLink
          to="/home"
          className="navbar__item"
          activeClassName="navbar__item--active"
          >
          <i className="fa fa-briefcase"></i>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar;