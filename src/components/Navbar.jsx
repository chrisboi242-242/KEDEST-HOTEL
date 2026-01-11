import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import './Navbar.css';

function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="navbar">
      <div className="logo">KEDEST-HOTEL</div>
      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-hotel">About Hotel</Link></li>
        <li><Link to="/explore-rooms">Explore Rooms</Link></li>
        <li><Link to="/available-rooms">Check Available Rooms</Link></li>
        <li><Link to="/explore-area">Explore Environment</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <button 
        className="mode-toggle" 
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
      >
        {/* Swaps icon based on state */}
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Navbar;