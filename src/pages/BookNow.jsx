import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaShieldAlt, FaExclamationTriangle, FaArrowRight, FaSyncAlt, FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Firebase imports
import { db } from '../firebase'; 
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const BookNow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // RUTHLESS FIX: Ensure we use the document ID correctly from state
  const preSelectedRoomName = location.state?.selectedRoom || "";
  const preSelectedRoomId = location.state?.roomId || null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    message: preSelectedRoomName ? `I am interested in booking the ${preSelectedRoomName}.` : ''
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSelectionModal, setShowSelectionModal] = useState(false);

  useEffect(() => {
    if (!preSelectedRoomId) {
      setShowSelectionModal(true);
    }
  }, [preSelectedRoomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.name.trim().length < 3) return alert("Please enter your full legal name.");
    if (formData.phone.trim().length < 10) return alert("Please enter a valid WhatsApp number.");
    if (!preSelectedRoomId) return;

    setIsSending(true);

    const templateParams = {
      user_name: formData.name,      
      user_email: formData.email,    
      user_phone: formData.phone, 
      room_name: preSelectedRoomName, 
      message: formData.message,      
    };

    try {
      // 1. SYNC WITH DATABASE
      const roomRef = doc(db, "rooms", String(preSelectedRoomId));
      
      await updateDoc(roomRef, {
        isBooked: true,
        bookedAt: serverTimestamp(),
        bookedBy: formData.name, 
        contactPhone: formData.phone,
        lastUpdated: new Date().toISOString()
      });

      // 2. DISPATCH EMAIL
      await emailjs.send(
        'service_0bwwz7L', 
        'template_h15mum9', 
        templateParams, 
        'RmhDli4fUITgmXU2S'
      );

      setShowSuccess(true); 

    } catch (error) {
      console.error('Reservation Error:', error);
      alert("Reservation Failed. Contact concierge via the floating button.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-hotelSoftWhite min-h-screen relative font-sans">
      
      {/* 1. FLOATING CONCIERGE (WhatsApp) */}
      <a 
        href={`https://wa.me/2348067073060?text=${encodeURIComponent("Hello Kedest Concierge, I need help with my booking.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] group flex items-center gap-4"
      >
        <span className="bg-hotelNavy text-hotelGold px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-hotelGold/30 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 pointer-events-none">
          Live Concierge
        </span>
        <div className="bg-hotelGold w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(184,134,11,0.4)] relative">
          <div className="absolute inset-0 rounded-full bg-hotelGold animate-ping opacity-20"></div>
          <FaWhatsapp className="text-hotelNavy text-2xl relative z-10" />
        </div>
      </a>

      {/* 2. SELECTION GUARD MODAL */}
      {showSelectionModal && (
        <div className="fixed inset-0 z-[500] bg-hotelNavy flex items-center justify-center p-6 text-center backdrop-blur-md">
          <div className="bg-white max-w-lg w-full p-10 shadow-2xl border-b-8 border-hotelGold">
            <FaExclamationTriangle className="text-hotelGold text-5xl mx-auto mb-6" />
            <h2 className="font-luxury text-3xl text-hotelNavy italic mb-4 uppercase">Selection Required</h2>
            <p className="text-gray-500 font-light mb-8 leading-relaxed italic text-sm">
              Reservations are exclusive to specific residences. Please select your sanctuary from our curated collection.
            </p>
            <Link 
              to="/suites" 
              className="flex items-center justify-center gap-3 w-full bg-hotelNavy text-hotelGold py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-black transition-all"
            >
              Browse Suites <FaArrowRight />
            </Link>
          </div>
        </div>
      )}

      {/* 3. HERO HEADER */}
      <section className="bg-hotelNavy py-20 px-6 text-center border-b border-hotelGold/30 relative">
        <h1 className="font-luxury text-hotelGold text-5xl md:text-7xl italic uppercase tracking-tighter">
          Reservations
        </h1>
        <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[1px] w-8 bg-hotelGold/40"></span>
            <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] md:text-xs">
              {preSelectedRoomName ? `Exclusively Holding: ${preSelectedRoomName}` : "Direct Concierge Access"}
            </p>
            <span className="h-[1px] w-8 bg-hotelGold/40"></span>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden bg-white border border-gray-100">
          
          <div className="lg:w-5/12 bg-hotelNavy p-12 text-white flex flex-col justify-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-hotelGold/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="border-l-4 border-hotelGold pl-6 relative z-10">
                <p className="flex items-center gap-2 text-hotelGold font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                  <FaShieldAlt /> Priority Reservation
                </p>
                <h3 className="font-luxury text-3xl italic mb-4">The Arrival Protocol</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed font-sans opacity-90">
                  Upon submission, your suite is instantly secured in our private database. Our management team in Aba will reach out via WhatsApp immediately to facilitate your arrival.
                </p>
              </div>
          </div>

          <div className="lg:w-7/12 p-10 md:p-16">
            <h2 className="font-luxury text-hotelNavy text-3xl mb-1 italic">Guest Credentials</h2>
            <p className="text-gray-400 text-[9px] mb-10 font-bold uppercase tracking-[0.4em]">Immediate Response Guaranteed</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 group-focus-within:text-hotelGold transition-colors">Full Name</label>
                    <input 
                      type="text" required 
                      className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none bg-transparent text-hotelNavy font-medium transition-all"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 group-focus-within:text-hotelGold transition-colors">Email Address</label>
                        <input 
                          type="email" required 
                          className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none bg-transparent text-hotelNavy font-medium transition-all"
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>

                    <div className="relative group">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 group-focus-within:text-hotelGold transition-colors">WhatsApp / Phone</label>
                        <input 
                          type="tel" required 
                          placeholder="+234..."
                          className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none bg-transparent text-hotelNavy font-medium transition-all"
                          value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        />
                    </div>
                </div>

                <div className="relative group">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 group-focus-within:text-hotelGold transition-colors">Special Requirements</label>
                    <textarea 
                      rows="2" 
                      className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none bg-transparent text-hotelNavy font-medium resize-none transition-all"
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSending || !preSelectedRoomId}
                  className="w-full bg-hotelNavy text-hotelGold py-5 font-bold uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl disabled:opacity-30 flex items-center justify-center gap-4 text-[10px]"
                >
                  {isSending ? (
                    <><FaSyncAlt className="animate-spin" /> Securing Inventory...</>
                  ) : (
                    "Confirm Private Reservation"
                  )}
                </button>
            </form>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[600] bg-hotelNavy/98 flex items-center justify-center p-6 text-center backdrop-blur-xl">
          <div className="bg-white max-w-md w-full p-12 border-t-8 border-hotelGold shadow-2xl relative animate-fade-in">
            <FaCheckCircle className="text-hotelGold text-7xl mx-auto mb-6 shadow-xl rounded-full" />
            <h2 className="font-luxury text-3xl text-hotelNavy italic mb-4 leading-tight uppercase tracking-tighter">Reservation <br /> Acknowledged</h2>
            <p className="text-gray-500 font-light mb-8 text-sm leading-relaxed italic">
              Welcome, <span className="font-bold text-hotelNavy">{formData.name}</span>. <br />
              <span className="font-bold text-hotelGold">{preSelectedRoomName}</span> has been locked for you. Our management team in Aba has been notified and will contact you via WhatsApp shortly.
            </p>
            <button 
              onClick={() => navigate('/suites')} 
              className="w-full bg-hotelNavy text-white py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-hotelGold hover:text-hotelNavy transition-all duration-300 shadow-lg"
            >
              Return to Residences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookNow;