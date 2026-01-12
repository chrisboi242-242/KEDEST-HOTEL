import React, { useState } from 'react';
import './ExploreArea.css';
import { 
  FaSolarPanel, 
  FaSwimmingPool, 
  FaShieldAlt, 
  FaGlassMartiniAlt, 
  FaMapMarkedAlt, 
  FaLeaf, 
  FaWalking, 
  FaLightbulb 
} from 'react-icons/fa';

const ExploreArea = () => {
  // State to manage the Lightbox (Pop-up)
  const [selectedImg, setSelectedImg] = useState(null);

  // Data for the feature grid based on your description
  const features = [
    {
      id: 1,
      icon: <FaLeaf />,
      title: "Peaceful Environment",
      desc: "Located inside a quiet and secure street, away from the main road. Perfect for relaxation and a homely feel."
    },
    {
      id: 2,
      icon: <FaSolarPanel />,
      title: "Constant Power",
      desc: "Reliable lister generator and solar energy system ensure constant electricity throughout your stay."
    },
    {
      id: 3,
      icon: <FaSwimmingPool />,
      title: "Swimming Pool",
      desc: "A clean and spacious pool is available for all our guests to enjoy and unwind."
    },
    {
      id: 4,
      icon: <FaGlassMartiniAlt />,
      title: "Bar & Reception",
      desc: "A comfortable bar area and reception offer a chill environment and a variety of drinks."
    },
    {
      id: 5,
      icon: <FaShieldAlt />,
      title: "24/7 Security",
      desc: "Our dedicated security house and round-the-clock personnel keep the premises safe and secure."
    },
    {
      id: 6,
      icon: <FaLightbulb />,
      title: "Well-Lit Corridors",
      desc: "The compound is wide and neat, with bright corridors for easy and safe movement at night."
    }
  ];

  // Data for the Gallery (Replace these paths with your real photo filenames)
  // Data for the Gallery - Updated to 6 images to match your 6 features
  const galleryImages = [
    { src: "/images/Hotel night view.jpg", title: "Quiet Street Entrance", class: "large" },
    { src: "/images/download (8).jpg", title: "Swimming Pool", class: "" },
    { src: "/images/Take me to the nearest bar.jpg", title: "Bar & Reception", class: "" },
    { src: "/images/BBP NRG.jpg", title: "Solar & Generator", class: "" },
    { src: "/images/download (9).jpg", title: "24/7 Security House", class: "" },
    { src: "/images/download (10).jpg", title: "Well-Lit Corridors", class: "wide" }
  ];

  return (
    <div className="explore-container">
      {/* 1. Header Section */}
      <header className="explore-header">
        <h1>Explore Our Environment</h1>
        <div className="underline"></div>
        <p>Discover the peaceful atmosphere and world-class facilities at KEDEST-HOTEL</p>
      </header>

      {/* 2. Features Grid */}
      <section className="explore-grid">
        {features.map((item) => (
          <div key={item.id} className="feature-card">
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 3. Image Gallery Section */}
      <section className="gallery-section">
        <div className="section-title">
          <h2>Visual Tour</h2>
          <p>Click any image to view in full screen</p>
        </div>
        
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <div 
              key={index} 
              className={`gallery-item ${img.class}`}
              onClick={() => setSelectedImg(img.src)}
            >
              <img src={img.src} alt={img.title} />
              <div className="img-overlay">
                <span>View {img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lightbox Modal (Conditional Rendering) */}
      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <span className="close-lightbox">&times;</span>
          <img src={selectedImg} alt="Enlarged" className="lightbox-img" />
        </div>
      )}

      {/* 5. Map Section */}
      <section className="map-section">
        <div className="section-title">
          <h2>Our Location</h2>
          <p><FaWalking /> Just a short distance from the main road in a secure neighborhood</p>
        </div>
        <div className="map-wrapper">
          <iframe 
            title="Hotel Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0182!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1633000000000!5m2!1sen!2sus"
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </section>
    </div>
  );
};

export default ExploreArea;