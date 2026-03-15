import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, onSnapshot, query } from "firebase/firestore";
import { FaPhone, FaLock, FaExclamationTriangle, FaChartPie } from 'react-icons/fa';

const RoomCard = ({ room, totalAvailable }) => {
  const navigate = useNavigate();
  
  const handleBooking = () => {
    if (room.isBooked) return; 
    navigate('/book-now', { state: { selectedRoom: room.name, roomId: room.docId } });
  };

  return (
    <div className={`group bg-white border border-gray-100 shadow-sm transition-all duration-700 overflow-hidden rounded-sm relative ${room.isBooked ? 'opacity-80 grayscale-[0.5]' : 'hover:shadow-2xl'}`}>
      
      {/* 1. SCARCITY BADGE: Only shows when 1 room is left on the whole site */}
      {!room.isBooked && totalAvailable === 1 && (
        <div className="absolute top-0 right-0 z-30 bg-red-600 text-white px-4 py-2 flex items-center gap-2 shadow-lg animate-pulse">
          <FaExclamationTriangle className="text-[10px]" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Last Suite Available</span>
        </div>
      )}

      {/* IMAGE SECTION */}
      <div className={`relative h-72 overflow-hidden ${room.isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={handleBooking}>
        <img 
          src={room.image} 
          alt={room.name} 
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ${!room.isBooked && 'group-hover:scale-110'}`} 
        />
        
        <div className={`absolute inset-0 transition-all duration-500 ${room.isBooked ? 'bg-hotelNavy/70' : 'bg-hotelNavy/40 group-hover:bg-hotelNavy/10'}`}></div>
        
        {room.isBooked ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-hotelGold">
            <FaLock className="text-3xl mb-2 opacity-80" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Currently Occupied</span>
          </div>
        ) : (
          <span className="absolute top-6 left-6 bg-hotelNavy text-hotelGold px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase border border-hotelGold/30">
            {room.type}
          </span>
        )}
      </div>

      <div className="p-8 space-y-5">
        <div className="flex justify-between items-start">
          <h3 className={`font-luxury text-2xl italic leading-tight ${room.isBooked ? 'text-gray-400' : 'text-hotelNavy'}`}>{room.name}</h3>
          <div className={`${room.isBooked ? 'text-gray-400' : 'text-hotelGold'} font-bold text-xl font-sans`}>
            ₦{Number(room.price).toLocaleString()}<span className="text-gray-400 text-xs font-light tracking-normal">/night</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-hotelGold/40 to-transparent"></div>

        <ul className="grid grid-cols-2 gap-y-2">
          {room.features && room.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="text-gray-400 text-[11px] flex items-center gap-2 uppercase tracking-wider">
              <span className={`w-1 h-1 rotate-45 ${room.isBooked ? 'bg-gray-300' : 'bg-hotelGold'}`}></span>
              {feature}
            </li>
          ))}
        </ul>

        {room.isBooked ? (
          <button disabled className="w-full text-center bg-gray-100 text-gray-400 py-4 font-bold uppercase tracking-[0.4em] text-[10px] border border-gray-200 cursor-not-allowed">
            Reserved By Guest
          </button>
        ) : (
          <button 
            onClick={handleBooking}
            className="w-full text-center bg-hotelNavy text-hotelGold py-4 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-hotelGold hover:text-hotelNavy transition-all duration-500 shadow-xl border border-hotelGold/20"
          >
            Reserve This Suite
          </button>
        )}
      </div>
    </div>
  );
};

const Suites = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "rooms")); 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      setRooms(roomsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // CALCULATE SCARCITY
  const availableRooms = rooms.filter(r => !r.isBooked);
  const totalAvailable = availableRooms.length;
  const occupancyRate = rooms.length > 0 ? Math.round(((rooms.length - totalAvailable) / rooms.length) * 100) : 0;

  return (
    <div className="bg-hotelSoftWhite min-h-screen pb-24 font-sans text-hotelNavy">
      <section className="bg-hotelNavy py-28 px-6 text-center border-b border-hotelGold/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none text-white font-luxury italic text-[20vw] select-none">
          KEDEST
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* PRESTIGE COUNTER */}
          {!loading && occupancyRate > 0 && (
             <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-hotelGold/20 px-4 py-2 mb-8 rounded-full">
                <FaChartPie className="text-hotelGold text-xs animate-pulse" />
                <span className="text-white text-[9px] uppercase font-bold tracking-[0.3em]">{occupancyRate}% Occupied Today</span>
             </div>
          )}
          
          <br />
          <span className="text-hotelGold text-xs tracking-[0.6em] uppercase font-bold">Incomparable Luxury</span>
          <h1 className="font-luxury text-white text-5xl md:text-8xl mt-6 mb-8 italic leading-none">
            Our Private <br /> <span className="text-hotelGold">Residences</span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {loading ? (
          <div className="text-center py-32 bg-white shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-hotelGold mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {rooms.map((room) => (
              <RoomCard 
                key={room.docId} 
                room={room} 
                totalAvailable={totalAvailable} 
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. THE WAITLIST GATEKEEPER: Shows if EVERYTHING is full */}
      {!loading && totalAvailable === 0 && (
         <div className="max-w-4xl mx-auto mt-20 px-6">
            <div className="bg-hotelNavy text-center p-12 border-t-4 border-hotelGold shadow-2xl">
               <h2 className="font-luxury text-3xl italic text-white mb-4">A Moment of Fullness</h2>
               <p className="text-gray-400 text-sm mb-8 italic leading-relaxed">
                 Our residences are currently fully committed. Please contact our concierge for priority waitlisting.
               </p>
               <a href="tel:+2348067073060" className="inline-block bg-hotelGold text-hotelNavy px-10 py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all">
                 Call Concierge
               </a>
            </div>
         </div>
      )}
    </div>
  );
};

export default Suites;