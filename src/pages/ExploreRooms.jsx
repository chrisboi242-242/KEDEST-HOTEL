import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext'; 
import './ExploreRooms.css';

const rooms = [
  {
    id: 1,
    type: 'VIP',
    name: 'Vip Room 1',
    price: 120,
    features: ['Queen Bed', 'Maximum Living Space', 'Spacious Seating Area', 'Smart Card Access'],
    image: '/images/29 Scandinavian.jpg',
  },
  {
    id: 2,
    type: 'VIP',
    name: 'ViP Room 2',
    price: 270,
    features: ['King Bed', 'Maximum Living Space', 'Spacious Seating Area', 'Smart Card Access'],
    image: '/images/Hotel Bedroom.jpg',
  },
  {
    id: 3,
    type: 'Standard',
    name: 'Standard Room 3',
    price: 90,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/my room.jpg',
  },
  {
    id: 4,
    type: 'Standard',
    name: 'Standard Room 4',
    price: 125,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/4 Star Economic.jpg',
  },
  {
    id: 5,
    type: 'Standard',
    name: 'Standard Room 5',
    price: 105,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Treebo Trend.jpg',
  },
  {
    id: 6,
    type: 'Standard',
    name: 'Standard Room 6',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Hotel O SKS.jpg',
  },
  {
   id: 7,
    type: 'Standard',
    name: 'Standard Room 7',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Super Collection.jpg',
  },
   {
   id: 8,
    type: 'Standard',
    name: 'Standard Room 8',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Aura.jpg',
  },
 {
   id: 9,
    type: 'Standard',
    name: 'Standard Room 9',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Hotel PK Residency.jpg',
  },
   {
   id: 10,
    type: 'Standard',
    name: 'Standard Room 10',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Compare Hotels.jpg',
  },
   {
   id: 11,
    type: 'Standard',
    name: 'Standard Room 11',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Jayshree Executive.jpg',
  },
   {
   id: 12,
    type: 'Standard',
    name: 'Standard Room 12',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Bel La Monde Hotel.jpg',
  },
   {
   id: 13,
    type: 'Standard',
    name: 'Standard Room 13',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Banquesta Suites.jpg',
  },
   {
   id: 14,
    type: 'Standard',
    name: 'Standard Room 14',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Hotel Supraja.jpg',
  },
   {
   id: 15,
    type: 'Standard',
    name: 'Standard Room 15',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Oyo 166 Princess.jpg',
  },
   {
   id: 16,
    type: 'Standard',
    name: 'Standard Room 16',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Fabhotel Asian.jpg',
  },
   {
   id: 17,
    type: 'Standard',
    name: 'Standard Room 17',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Best Resort.jpg',
  },
   {
   id: 18,
    type: 'Standard',
    name: 'Standard Room 18',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/The Barrel House.jpg',
  },
   {
   id: 19,
    type: 'Standard',
    name: 'Standard Room 19',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Marigold Regency.jpg',
  },
   {
   id: 20,
    type: 'Standard',
    name: 'Standard Room 20',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Fuying Hotel.jpg',
  },
   {
   id: 21,
    type: 'Standard',
    name: 'Standard Room 21',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/Kids Water Park Fun.jpg',
  },
   {
   id: 22,
    type: 'Standard',
    name: 'Standard Room 22',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/download (6).jpg',
  },
  {
   id: 23,
    type: 'Standard',
    name: 'Standard Room 23',
    price: 150,
    features: ['Essential Comfort', 'Smart Card Access', 'Secure Design'],
    image: '/images/THE LONDONER HOTEL.jpg',
  },
];

const RoomCard = ({ room }) => (
  <div className="room-card">
    <div className="room-image-wrapper">
      <img src={room.image} alt={room.name} className="room-img" />
      <div className="image-overlay">
        <span>Full View</span>
      </div>
      <span className="room-type-tag">{room.type}</span>
    </div>
    <div className="room-info">
      <h3>{room.name}</h3>
      <div className="price-tag">${room.price} <span>/ night</span></div>
      <ul className="feature-list">
        {room.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Link to="/available-rooms">
        <button className="check-btn">Check Available Rooms</button>
      </Link>
    </div>
  </div>
);

const ExploreRooms = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`explore-rooms ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1>Explore Our Luxurious Rooms</h1>
        <p className="subtitle">Discover comfort and elegance tailored for your stay.</p>
      </div>
      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default ExploreRooms;