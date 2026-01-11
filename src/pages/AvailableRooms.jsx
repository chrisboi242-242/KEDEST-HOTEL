import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import './AvailableRooms.css';

// 1. DATA: Your "Source of Truth"
const initialRooms = [
  { id: 1, name: 'Vip Room 1', type: 'VIP', price: 120, isBooked: false, image: '/images/29 Scandinavian.jpg' },
  { id: 2, name: 'ViP Room 2', type: 'VIP', price: 270, isBooked: false, image: '/images/Hotel Bedroom.jpg' },
  { id: 3, name: 'Standard Room 3', type: 'Standard', price: 90, isBooked: false, image: '/images/my room.jpg' },
  { id: 4, name: 'Standard Room 4', type: 'Standard', price: 125, isBooked: false, image: '/images/4 Star Economic.jpg' },
  { id: 5, name: 'Standard Room 5', type: 'Standard', price: 105, isBooked: false, image: '/images/Treebo Trend.jpg' },
  { id: 6, name: 'Standard Room 6', type: 'Standard', price: 150, isBooked: false, image: '/images/Hotel O SKS.jpg' },
  { id: 7, name: 'Standard Room 7', type: 'Standard', price: 150, isBooked: false, image: '/images/Super Collection.jpg' },
  { id: 8, name: 'Standard Room 8', type: 'Standard', price: 150, isBooked: false, image: '/images/Aura.jpg' },
  { id: 9, name: 'Standard Room 9', type: 'Standard', price: 150, isBooked: false, image: '/images/Hotel PK Residency.jpg' },
  { id: 10, name: 'Standard Room 10', type: 'Standard', price: 150, isBooked: false, image: '/images/Compare Hotels.jpg' },
  { id: 11, name: 'Standard Room 11', type: 'Standard', price: 150, isBooked: false, image: '/images/Jayshree Executive.jpg' },
  { id: 12, name: 'Standard Room 12', type: 'Standard', price: 150, isBooked: false, image: '/images/Bel La Monde Hotel.jpg' },
  { id: 13, name: 'Standard Room 13', type: 'Standard', price: 150, isBooked: false, image: '/images/Banquesta Suites.jpg' },
  { id: 14, name: 'Standard Room 14', type: 'Standard', price: 150, isBooked: false, image: '/images/Hotel Supraja.jpg' },
  { id: 15, name: 'Standard Room 15', type: 'Standard', price: 150, isBooked: false, image: '/images/Oyo 166 Princess.jpg' },
  { id: 16, name: 'Standard Room 16', type: 'Standard', price: 150, isBooked: false, image: '/images/Fabhotel Asian.jpg' },
  { id: 17, name: 'Standard Room 17', type: 'Standard', price: 150, isBooked: false, image: '/images/Best Resort.jpg' },
  { id: 18, name: 'Standard Room 18', type: 'Standard', price: 150, isBooked: false, image: '/images/The Barrel House.jpg' },
  { id: 19, name: 'Standard Room 19', type: 'Standard', price: 150, isBooked: false, image: '/images/Marigold Regency.jpg' },
  { id: 20, name: 'Standard Room 20', type: 'Standard', price: 150, isBooked: false, image: '/images/Fuying Hotel.jpg' },
  { id: 21, name: 'Standard Room 21', type: 'Standard', price: 150, isBooked: false, image: '/images/Kids Water Park Fun.jpg' },
  { id: 22, name: 'Standard Room 22', type: 'Standard', price: 150, isBooked: false, image: '/images/download (6).jpg' },
  { id: 23, name: 'Standard Room 23', type: 'Standard', price: 150, isBooked: false, image: '/images/THE LONDONER HOTEL.jpg' },
];

const AvailableRooms = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  // 2. STATE: We use 'hotel_v3' to bypass any old stuck memory
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('hotel_v3');
    return saved ? JSON.parse(saved) : initialRooms;
  });

  // Keep storage in sync
  useEffect(() => {
    localStorage.setItem('hotel_v3', JSON.stringify(rooms));
  }, [rooms]);

  // 3. LOGIC: This is the specific line you need to check
  // This looks at every room and only allows it through if isBooked is false
  const availableList = rooms.filter(room => room.isBooked === false);

  const handleBookRoom = (room) => {
    navigate('/contact', { 
      state: { 
        selectedRoom: room.name,
        roomId: room.id 
      } 
    });
  };
// 9 where it is changed to handleReset 
  const handleReset = () => {
    if (window.confirm("Admin: Reset all rooms to available?")) {
      setRooms(initialRooms);
      localStorage.setItem('hotel_v3', JSON.stringify(initialRooms));
    }
  };

  return (
    <div className={`available-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="available-header">
        <h1>Current Availability</h1>
        <p>Book your perfect stay from our available vacancies.</p>
      </div>

      <div className="available-grid">
        {/* 4. MAPPING: We map over availableList, NOT rooms */}
        {availableList.length > 0 ? (
          availableList.map((room) => (
            <div key={room.id} className="available-card">
              <div className="image-box">
                <img src={room.image} alt={room.name} />
                <span className="type-tag">{room.type}</span>
              </div>
              <div className="info-box">
                <h3>{room.name}</h3>
                <p className="price-label">${room.price} <span>/ night</span></p>
                <button 
                  className="book-now-btn" 
                  onClick={() => handleBookRoom(room)}
                >
                  Book This Room
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sold-out">
            <h2>No Vacancies</h2>
            <p>We are fully booked at the moment. Please check back later.</p>
          </div>
        )}
      </div>

      <button className="hidden-reset" onClick={handleReset}>Admin Reset</button>
    </div>
  );
};

export default AvailableRooms;