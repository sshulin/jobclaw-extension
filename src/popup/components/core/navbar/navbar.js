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
          to="/favorite"
          className="navbar__item"
          activeClassName="navbar__item--active"
          >
          <i className="fa fa-heart"></i>
        </NavLink>
        <NavLink
          to="/blacklist"
          className="navbar__item"
          activeClassName="navbar__item--active"
          >
          <i className="fa fa-ban"></i>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar;
