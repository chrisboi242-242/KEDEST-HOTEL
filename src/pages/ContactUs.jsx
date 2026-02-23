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

    const cleanPhone = formData.phone.replace(/\D/g, ''); 
    
    if (formData.name.trim().length < 3) {
      alert("Please enter a valid full name.");
      return;
    }

    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      alert("Please enter a valid WhatsApp number.");
      return;
    }

    setIsSending(true);

    const templateParams = {
      user_name: formData.name,      
      user_email: formData.email,    
      user_phone: formData.phone, 
      room_name: preSelectedRoomName || "Room Not Specified", 
      message: formData.message,      
    };

    try {
      // 1. Update Firebase
      if (preSelectedRoomId) {
        // We use the ID as the document name (must be string for the path)
        const roomRef = doc(db, "rooms", preSelectedRoomId.toString());
        
        await updateDoc(roomRef, {
          isBooked: true,
          bookedAt: serverTimestamp(),
          bookedBy: formData.name, 
          contactPhone: formData.phone,
          // MATCHING YOUR DATABASE SCREENSHOT:
          name: preSelectedRoomName, 
          id: Number(preSelectedRoomId) 
        });
      }

      // 2. Send Email
      await emailjs.send('service_0bwwz7L', 'template_h15mum9', templateParams, 'RmhDli4fUITgmXU2S');

      // 3. Success
      setShowSuccess(true); 

    } catch (error) {
      console.error('Process Error:', error);
      alert("Database Error: Make sure your Firebase Rules allow 'update' and your document ID exists.");
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.940665306915!2d7.365!3d5.111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDYnMzkuNiJOIDfCsDIxJzU0LjAiRQ!5e0!3m2!1sen!2sng!4v1625612345678" 
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
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                      <label>WhatsApp Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+234 801 234 5678" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      />
                      <span className="phone-hint">Include country code for international contact</span>
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

        {showSuccess && (
          <div className="modal-overlay">
            <div className="luxury-modal">
              <FaCheckCircle className="modal-icon" />
              <h2>Booking Confirmed!</h2>
              <p>Thank you, <strong>{formData.name}</strong>.</p>
              <p>Details sent to <strong>{formData.email}</strong>.</p>
              <div className="policy-box">
                <strong>4-Day Hold Policy:</strong> Room is reserved. Check-in within 4 days or it expires.
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
              <FaEnvelope /> <span>contact@kedesthotel.com</span>
            </div>
          <div className="footer-socials">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="https://wa.me/2348067073060"><FaWhatsapp /></a>
            </div>
          </div>
          <div className="copyright">
            © 2026 KEDEST HOTEL & SUITES. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactUs;