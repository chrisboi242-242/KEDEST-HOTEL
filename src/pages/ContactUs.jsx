import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

// Firebase imports
import { db } from '../firebase'; 
import { doc, updateDoc } from "firebase/firestore";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = 'service_0bwwz7L'; 
    const TEMPLATE_ID = 'template_h15mum9';
    const PUBLIC_KEY = 'RmhDli4fUITgmXU2S';

    // --- VARIABLES UPDATED TO MATCH YOUR EMAILJS TEMPLATE ---
    const templateParams = {
      user_name: formData.name,      // Matches {{user_name}}
      user_email: formData.email,    // Matches {{user_email}}
      room_name: preSelectedRoomName || "Room Not Specified", // Matches {{room_name}}
      message: formData.message,      // Matches {{message}}
    };

    try {
      // 1. Send the Email (This triggers BOTH your notification and the Auto-Reply)
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // 2. IF a room was selected, update Firebase status
      if (preSelectedRoomId) {
        const roomRef = doc(db, "rooms", preSelectedRoomId.toString());
        await updateDoc(roomRef, {
          isBooked: true
        });
      }

      // 3. Updated Success Feedback with the 4-day policy reminder
      alert(`Success! Check your email (${formData.email}) for your booking confirmation.`);
      
      navigate('/available-rooms'); 

    } catch (error) {
      console.error('Process Error:', error);
      alert("Something went wrong. Please check your connection and try again.");
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0182!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1633000000000!5m2!1sen!2sus" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
            </iframe>
            </div>

            <div className="form-section">
            <h1>Reservation Details</h1>
            <p style={{marginBottom: '20px', color: 'var(--text-color)'}}>
              {preSelectedRoomName ? `Booking: ${preSelectedRoomName}` : "General Inquiry"}
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>Full Name</label>
                    {/* name="user_name" added for clarity */}
                    <input 
                      type="text" 
                      name="user_name"
                      required 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    {/* name="user_email" added for clarity */}
                    <input 
                      type="email" 
                      name="user_email"
                      required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea 
                      name="message"
                      rows="4" 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>
                <button type="submit" className="booking-submit-btn" disabled={isSending}>
                    {isSending ? "Processing..." : "Confirm Reservation"}
                </button>
            </form>
            </div>
        </div>

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