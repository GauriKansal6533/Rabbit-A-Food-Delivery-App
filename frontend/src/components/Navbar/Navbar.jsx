import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartItems, token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("menu");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  // Close mobile menu when menu item is clicked
  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setIsMobileMenuOpen(false);
    document.body.classList.remove('mobile-menu-open');
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle window resize - close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <div className={`navbar ${scrolled ? "navbar-blur" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => handleMenuClick("home")}>
          <img src={assets.logo} alt="Logo" />
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navbar Menu */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              onClick={() => handleMenuClick("home")} 
              className={menu === "home" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <a 
              href="#explore-menu" 
              onClick={() => handleMenuClick("menu")} 
              className={menu === "menu" ? "active" : ""}
            >
              Menu
            </a>
          </li>
          <li>
            <a 
              href="#app-download" 
              onClick={() => handleMenuClick("mobile-app")} 
              className={menu === "mobile-app" ? "active" : ""}
            >
              Mobile App
            </a>
          </li>
          <li>
            <a 
              href="#footer" 
              onClick={() => handleMenuClick("contact-us")} 
              className={menu === "contact-us" ? "active" : ""}
            >
              Contact Us
            </a>
          </li>
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
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
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
            <button 
              className="signin-btn" 
              onClick={() => {
                setShowLogin(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Sign In
            </button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => {
                  navigate('/myorders');
                  setIsMobileMenuOpen(false);
                }}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <li><hr /></li>
                <li onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}>
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