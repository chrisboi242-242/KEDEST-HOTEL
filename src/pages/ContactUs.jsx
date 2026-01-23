import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

// Firebase imports
import { db } from '../firebase'; 
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const ContactUs = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  const preSelectedRoomName = location.state?.selectedRoom || "";
  const preSelectedRoomId = location.state?.roomId || null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomName: preSelectedRoomName,
    message: preSelectedRoomName ? `I am interested in booking the ${preSelectedRoomName}.` : ''
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = 'service_0bwwz7L'; 
    const TEMPLATE_ID = 'template_h15mum9';
    const PUBLIC_KEY = 'RmhDli4fUITgmXU2S';

    const templateParams = {
      user_name: formData.name,      
      user_email: formData.email,    
      room_name: preSelectedRoomName || "Room Not Specified", 
      message: formData.message,      
    };

    try {
      // 1. Send Email (Triggers Auto-Reply)
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // 2. Update Firebase with 4-day tracking info
      if (preSelectedRoomId) {
        const roomRef = doc(db, "rooms", preSelectedRoomId.toString());
        await updateDoc(roomRef, {
          isBooked: true,
          bookedAt: serverTimestamp(),
          bookedBy: formData.email
        });
      }

      // 3. Trigger Custom Modal
      setShowSuccess(true); 

    } catch (error) {
      console.error('Process Error:', error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`contact-page-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <div className="contact-container">
        
        <div className="main-content-split">
            <div className="map-section">
            <iframe 
                title="Hotel Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.937510136425!2d7.3562308!3d5.1137743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1042995979512233%3A0x6c8ec47411f5881d!2sOsusu%20Rd%2C%20Aba%2C%20Abia!5e0!3m2!1sen!2sng!4v1769155689242!5m2!1sen!2sng" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
            </iframe>
            </div>

            <div className="form-section">
            <h1>Reservation Details</h1>
            <p className="selection-text">
              {preSelectedRoomName ? `Booking: ${preSelectedRoomName}` : "General Inquiry"}
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="booking-submit-btn" disabled={isSending}>
                    {isSending ? "Processing..." : "Confirm Reservation"}
                </button>
            </form>
            </div>
        </div>

        {/* --- CUSTOM SUCCESS MODAL --- */}
        {showSuccess && (
          <div className="modal-overlay">
            <div className="luxury-modal">
              <FaCheckCircle className="modal-icon" />
              <h2>Booking Confirmed!</h2>
              <p>Thank you, <strong>{formData.name}</strong>.</p>
              <p>A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
              
              <div className="policy-box">
                <strong>4-Day Hold Policy:</strong> This room is now hidden from the public. If you do not check-in within 4 days, the room will be set back to "Available".
              </div>

              <button onClick={() => navigate('/available-rooms')} className="modal-close-btn">
                Done
              </button>
            </div>
          </div>
        )}

        <footer className="contact-footer">
          <div className="footer-info">
            <div className="footer-item">
              <FaEnvelope /> <span>chrisboi3@outlook.com</span>
            </div>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://wa.me/2348067073060" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            </div>
          </div>
          <p className="copyright">© {new Date().getFullYear()} KEDEST-HOTEL. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ContactUs;