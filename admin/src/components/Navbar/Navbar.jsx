import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // dark mode state

  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        <img src={assets.logo} alt="Rabbit Logo" className="logo" />
        <h2 className="app-name">Rabbit Admin</h2>
      </div>
      <div className="navbar-right">
        <img src={assets.profile_image} alt="Profile" className="profile-img" />
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;


