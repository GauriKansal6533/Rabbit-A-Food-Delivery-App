import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartItems, token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("menu");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? "navbar-blur" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={assets.logo} alt="Logo" />
        </Link>

        {/* Navbar Menu */}
        <ul className="navbar-menu">
          <li><Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link></li>
          <li><a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a></li>
          <li><a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a></li>
          <li><a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a></li>
        </ul>

        {/* Navbar Right */}
        <div className="navbar-right">
          {/* Search Bar */}
          <div className="navbar-search">
            <img src={assets.search_icon} alt="Search" className="search-icon" />
            <input type="text" placeholder="Search for dishes..." />
          </div>

          {/* Cart */}
          <div className="navbar-cart">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
            {getTotalCartItems() > 0 && (
              <div className="cart-item-count">
                {getTotalCartItems()}
              </div>
            )}
          </div>

          {/* Sign In / Profile */}
          {!token ? (
            <button className="signin-btn" onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <li><hr /></li>
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
