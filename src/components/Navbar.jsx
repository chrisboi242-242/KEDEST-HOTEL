import React, { useState } from 'react'; // Added useState
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import './Navbar.css';

function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false); // State for the mobile menu

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">KEDEST-HOTEL</div>
      
      {/* Mobile Menu Icon (Hamburger) */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={menuOpen ? "bar open" : "bar"}></div>
        <div className={menuOpen ? "bar open" : "bar"}></div>
        <div className={menuOpen ? "bar open" : "bar"}></div>
      </div>

      {/* Added 'active' class based on menuOpen state */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/about-hotel" onClick={closeMenu}>About Hotel</Link></li>
        <li><Link to="/explore-rooms" onClick={closeMenu}>Explore Rooms</Link></li>
        <li><Link to="/available-rooms" onClick={closeMenu}>Check Available Rooms</Link></li>
        <li><Link to="/explore-area" onClick={closeMenu}>Explore Environment</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
      </ul>

      <button 
        className="mode-toggle" 
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Navbar;