import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import './AvailableRooms.css';

// --- FIREBASE IMPORTS ---
import { db } from '../firebase'; 
import { collection, getDocs } from "firebase/firestore"; 

const AvailableRooms = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH FROM FIREBASE ---
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const roomsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id 
        }));
        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Logic to show only rooms that aren't booked
  const availableList = rooms.filter(room => room.isBooked === false);

  const handleBookRoom = (room) => {
    navigate('/contact', { 
      state: { 
        selectedRoom: room.name,
        roomId: room.id 
      } 
    });
  };

  if (loading) {
    return <div className="loading">Loading our luxury rooms...</div>;
  }

  return (
    <div className={`available-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="available-header">
        <h1>Current Availability</h1>
        <p>Book your perfect stay from our available vacancies.</p>
      </div>

      <div className="available-grid">
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
    </div>
  );
};

export default AvailableRooms;