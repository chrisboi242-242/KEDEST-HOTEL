import React from 'react';
import { useDarkMode } from '../context/DarkModeContext'; // Import the hook
import './About.css';

const About = () => {
  // Use the global theme instead of a local useState
  const { darkMode } = useDarkMode();

  return (
    /* We still keep the class for specific styling, but the body class 
       handled by the context does most of the work now */
    <div className={`about-hotel ${darkMode ? 'dark-mode' : ''}`}>
      
      {/* We removed the top-bar button because the Navbar button handles it now */}
      
      <h1>About KEDEST-Hotel</h1>

      <section className="mission-statement">
        <h2>Mission Statement</h2>
        <p>
          To provide guests with a secure, comfortable, and luxurious stay 
          featuring modern amenities and personalized service.
        </p>
      </section>

      <section className="unique-features">
        <h2>Unique Features</h2>
        <ul>
          <li>Reception Office & Bar</li>
          <li>Swimming Pool</li>
          <li>23 Rooms (2 VIP rooms)</li>
          <li>Security House</li>
          <li>Smart card access to unlock doors</li>
          <li>Solar energy for electricity</li>
          <li>24/7 Light availability</li>
          <li>Surrounded by houses and scenic views</li>
        </ul>
      </section>

      <section className="photo-building">
        <h2>Photo of the Building</h2>
        <div className="image-container">
          <img src="/images/SMART HOTEL.jpg" alt="KEDEST Hotel Building" />
        </div>
      </section>
    </div>
  );
};

export default About;