import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaShieldAlt, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Firebase imports
import { db } from '../firebase'; 
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const BookNow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pulling data passed from the Suites page
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

  // GATING LOGIC: Check if a room was actually selected
  useEffect(() => {
    if (!preSelectedRoomId) {
      // Trigger the "Dumb-Proof" modal if they came here blindly
      setShowSelectionModal(true);
    }
  }, [preSelectedRoomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.name.trim().length < 3) {
      alert("Please enter a valid full name.");
      return;
    }

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
      const roomRef = doc(db, "rooms", preSelectedRoomId.toString());
      await updateDoc(roomRef, {
        isBooked: true,
        bookedAt: serverTimestamp(),
        bookedBy: formData.name, 
        contactPhone: formData.phone,
        name: preSelectedRoomName, 
        id: Number(preSelectedRoomId) 
      });

      await emailjs.send(
        'service_0bwwz7L', 
        'template_h15mum9', 
        templateParams, 
        'RmhDli4fUITgmXU2S'
      );

      setShowSuccess(true); 

    } catch (error) {
      console.error('Process Error:', error);
      alert("System Error: Check connection or Firebase permissions.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-hotelSoftWhite min-h-screen relative">
      
      {/* 1. THE "DUMB-PROOF" SELECTION MODAL */}
      {showSelectionModal && (
        <div className="fixed inset-0 z-[500] bg-hotelNavy flex items-center justify-center p-6 text-center">
          <div className="bg-white max-w-lg w-full p-10 shadow-2xl border-b-8 border-hotelGold animate-fade-in">
            <FaExclamationTriangle className="text-hotelGold text-5xl mx-auto mb-6" />
            <h2 className="font-luxury text-3xl text-hotelNavy italic mb-4 uppercase">Selection Required</h2>
            <p className="text-gray-500 font-light mb-8 leading-relaxed italic">
              At <span className="text-hotelNavy font-bold">Kedest Hotel</span>, reservations are exclusive to specific residences. 
              To proceed, you must first choose your sanctuary from our private collection.
            </p>
            <Link 
              to="/suites" 
              className="flex items-center justify-center gap-3 w-full bg-hotelNavy text-hotelGold py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-hotelGold hover:text-hotelNavy transition-all duration-500 shadow-xl"
            >
              Browse Available Suites <FaArrowRight />
            </Link>
          </div>
        </div>
      )}

      {/* 2. HERO HEADER */}
      <section className="bg-hotelNavy py-20 px-6 text-center border-b border-hotelGold/30">
        <h1 className="font-luxury text-hotelGold text-5xl md:text-7xl italic animate-fade-in uppercase tracking-tighter">
          Reservations
        </h1>
        <p className="text-gray-400 mt-4 uppercase tracking-[0.3em] text-[10px] md:text-sm">
          {preSelectedRoomName ? `Finalizing: ${preSelectedRoomName}` : "Direct Concierge Access"}
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden bg-white border border-gray-100">
          
          <div className="lg:w-5/12 h-[350px] lg:h-auto relative overflow-hidden bg-hotelNavy">
              <div className="p-12 h-full flex flex-col justify-center text-white space-y-8 relative z-10">
                 <div className="border-l-4 border-hotelGold pl-6">
                    <p className="flex items-center gap-2 text-hotelGold font-bold text-xs uppercase tracking-[0.2em] mb-2 font-sans">
                      <FaShieldAlt /> Secure Reservation
                    </p>
                    <h3 className="font-luxury text-3xl italic">Priority Access</h3>
                    <p className="text-gray-400 text-sm font-light mt-4 leading-relaxed font-sans opacity-80">
                      Your selection is being held exclusively. Upon submission, our management in Aba will contact you within minutes to finalize check-in.
                    </p>
                 </div>
              </div>
          </div>

          <div className="lg:w-7/12 p-10 md:p-16">
            <h2 className="font-luxury text-hotelNavy text-3xl mb-2 italic">Guest Inquiry</h2>
            <p className="text-gray-400 text-sm mb-10 font-light font-sans uppercase tracking-widest">Priority Check-In Form</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                    <input 
                      type="text" required 
                      className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none transition-all bg-transparent text-hotelNavy font-medium"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                        <input 
                          type="email" required 
                          className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none transition-all bg-transparent text-hotelNavy font-medium"
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>

                    <div className="relative group">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">WhatsApp Number</label>
                        <input 
                          type="tel" required 
                          placeholder="+234..."
                          className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none transition-all bg-transparent text-hotelNavy font-medium"
                          value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        />
                    </div>
                </div>

                <div className="relative group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message or Special Requests</label>
                    <textarea 
                      rows="2" 
                      className="w-full border-b border-gray-200 py-3 focus:border-hotelGold outline-none transition-all resize-none bg-transparent text-hotelNavy font-medium"
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSending || !preSelectedRoomId}
                  className="w-full bg-hotelNavy text-hotelGold py-5 font-bold uppercase tracking-[0.3em] hover:bg-hotelGold hover:text-hotelNavy transition-all duration-500 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                >
                  {isSending ? "Syncing with Database..." : !preSelectedRoomId ? "Selection Required" : "Confirm Reservation"}
                </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[600] bg-hotelNavy/95 backdrop-blur-lg flex items-center justify-center p-6 text-center">
          <div className="bg-white max-w-md w-full p-12 relative border-t-8 border-hotelGold shadow-2xl">
            <FaCheckCircle className="text-hotelGold text-7xl mx-auto mb-6" />
            <h2 className="font-luxury text-3xl text-hotelNavy italic mb-4">Successfully Reserved</h2>
            <p className="text-gray-600 font-light mb-8 leading-relaxed">
              Hello <span className="font-bold text-hotelNavy">{formData.name}</span>, you have reserved <span className="font-bold text-hotelNavy">{preSelectedRoomName}</span>.
            </p>
            <button 
              onClick={() => navigate('/suites')} 
              className="w-full bg-hotelNavy text-white py-4 font-bold uppercase tracking-widest hover:bg-hotelGold hover:text-hotelNavy transition-all duration-300 shadow-lg"
            >
              Return to Suites
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookNow;