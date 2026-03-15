import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FaPhone } from 'react-icons/fa'; // Added for the gatekeeper button

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const handleBooking = () => {
    navigate('/book-now', { state: { selectedRoom: room.name, roomId: room.id } });
  };

  return (
    <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden rounded-sm">
      <div className="relative h-72 overflow-hidden cursor-pointer" onClick={handleBooking}>
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-hotelNavy/40 group-hover:bg-hotelNavy/10 transition-all duration-500"></div>
        <span className="absolute top-6 left-6 bg-hotelNavy text-hotelGold px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase border border-hotelGold/30">
          {room.type}
        </span>
      </div>

      <div className="p-8 space-y-5">
        <div className="flex justify-between items-start">
          <h3 className="font-luxury text-2xl text-hotelNavy italic leading-tight">{room.name}</h3>
          <div className="text-hotelGold font-bold text-xl font-sans">
            ₦{room.price}<span className="text-gray-400 text-xs font-light tracking-normal">/night</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-hotelGold/40 to-transparent"></div>

        <ul className="grid grid-cols-2 gap-y-2">
          {room.features && room.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="text-gray-500 text-[11px] flex items-center gap-2 uppercase tracking-wider">
              <span className="w-1 h-1 bg-hotelGold rotate-45"></span>
              {feature}
            </li>
          ))}
        </ul>

        <button 
          onClick={handleBooking}
          className="w-full text-center bg-hotelNavy text-hotelGold py-4 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-hotelGold hover:text-hotelNavy transition-all duration-500 shadow-xl border border-hotelGold/20"
        >
          Reserve This Suite
        </button>
      </div>
    </div>
  );
};

const Suites = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "rooms"), where("isBooked", "==", false));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      setRooms(roomsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-hotelSoftWhite min-h-screen pb-24 font-sans text-hotelNavy">
      {/* 1. HERO HEADER */}
      <section className="bg-hotelNavy py-28 px-6 text-center border-b border-hotelGold/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none text-white font-luxury italic text-[20vw] select-none">
          KEDEST
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-hotelGold text-xs tracking-[0.6em] uppercase font-bold">Incomparable Luxury</span>
          <h1 className="font-luxury text-white text-5xl md:text-8xl mt-6 mb-8 italic leading-none">
            Our Private <br /> <span className="text-hotelGold">Residences</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto italic opacity-80">
            Each suite at Kedest is a masterclass in elegance. From our 24/7 solar-powered climate control 
            to the bespoke smart-card security, we offer a sanctuary where the pulse of Aba fades into 
            total tranquility. Choose your haven.
          </p>
        </div>
      </section>

      {/* 2. THE CURATED GRID / GATEKEEPER SECTION */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {loading ? (
          <div className="text-center py-32 bg-white shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-hotelGold mx-auto"></div>
            <p className="text-hotelNavy mt-6 font-luxury text-xl italic tracking-widest uppercase">Checking Availability...</p>
          </div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {rooms.map((room) => (
              <RoomCard key={room.docId} room={room} />
            ))}
          </div>
        ) : (
          /* THE RUTHLESS FULLNESS GATEKEEPER */
          <div className="text-center py-20 bg-hotelNavy text-white border-t-8 border-hotelGold shadow-2xl relative overflow-hidden px-6">
            <div className="relative z-10 max-w-2xl mx-auto py-10">
              <h2 className="font-luxury text-4xl md:text-6xl italic mb-6">A Moment of Fullness.</h2>
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 italic">
                All our premier residences are currently occupied. However, excellence is never out of reach.
              </p>

              <div className="bg-white/5 backdrop-blur-sm p-8 border border-hotelGold/20 rounded-sm">
                <p className="text-hotelGold uppercase tracking-[0.4em] text-xs font-bold mb-4 font-sans">Waitlist & Special Inquiries</p>
                <p className="text-sm text-gray-300 mb-8 leading-relaxed font-sans">
                  Call our private concierge line. We may have last-minute availability or cancellations not yet reflected in the system.
                </p>
                
                <a 
                  href="tel:+2348067073060" 
                  className="inline-flex items-center gap-4 bg-hotelGold text-hotelNavy px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-500 shadow-xl"
                >
                  <FaPhone className="animate-pulse" /> Call Concierge Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. FOOTER PROMISE */}
      {!loading && rooms.length > 0 && (
        <div className="mt-24 text-center px-6">
           <div className="h-[1px] w-24 bg-hotelGold mx-auto mb-8"></div>
           <p className="text-hotelNavy font-luxury italic text-xl">The Gold Standard of Hospitality.</p>
           <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase mt-2">Aba • Nigeria • Solar Powered</p>
        </div>
      )}
    </div>
  );
};

export default Suites;