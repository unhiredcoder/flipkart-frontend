import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DashboardApp.css';

function Nav() {
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="nav-container">
      <div className="nav-toggle">
      </div>
      <ul className={`nav-links`}>
        <h2 className='dashboard'>🛒 Dashboard</h2>
        <li>
          <NavLink className='link' to="/dashboard" onClick={handleLinkClick}>Product</NavLink>
        </li>
        <li>
          <NavLink className='link' to="/dashboard/users" onClick={handleLinkClick}>Users</NavLink>
        </li>
        <li>
          <NavLink className='link' to="/dashboard/add" onClick={handleLinkClick}>Add</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
