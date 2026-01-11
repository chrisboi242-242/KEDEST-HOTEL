import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-hero">
      <div className="hero-text">
        <h1>Welcome to KEDEST-HOTEL</h1>
        <p>Enjoy luxury and comfort with us.</p>
        <Link to="/explore-rooms">
          <button className="explore-btn">Explore Rooms</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
