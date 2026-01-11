import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaFacebook, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Icons
import emailjs from '@emailjs/browser';
import './ContactUs.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = 'service_0bwwz7L'; 
    const TEMPLATE_ID = 'template_h15mum9';
    const PUBLIC_KEY = 'RmhDli4fUITgmXU2S';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      room_name: preSelectedRoomName,
      message: formData.message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
        alert(`Thank you, ${formData.name}! Your request has been sent.`);
        navigate('/available-rooms'); 
      })
      .catch((error) => {
        console.error('Email Error:', error);
        alert("The request failed. Please check your network.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className={`contact-page-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <div className="contact-container">
        
        {/* TOP SECTION: MAP & FORM */}
        <div className="main-content-split">
            <div className="map-section">
            <iframe 
                title="Hotel Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345059173!2d144.95373531531615!3d-37.81732767975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1611822453629!5m2!1sen!2sau" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
            </iframe>
            </div>

            <div className="form-section">
            <h1>Reservation Details</h1>
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

        {/* BOTTOM SECTION: THE FOOTER */}
        <footer className="contact-footer">
          <div className="footer-info">
            <div className="footer-item">
              <FaEnvelope /> <span>chrisboi3@outlook.com</span>
            </div>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            </div>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} Luxury Hotel. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
};

export default ContactUs;