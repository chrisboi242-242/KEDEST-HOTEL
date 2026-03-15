import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-hotelNavy text-white pt-20 pb-10 px-6 border-t border-hotelGold/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        
        {/* BRAND COLUMN */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-luxury font-black tracking-tighter text-hotelGold italic flex flex-col">
              <span className="leading-none">KEDEST</span>
              <span className="text-[10px] tracking-[0.5em] text-white font-sans">HOTEL & SUITES</span>
            </div>
          </Link>
          <p className="text-gray-400 font-light max-w-sm leading-relaxed italic">
            Redefining the standard of luxury and reliability in the heart of Aba. 
            Where consistent power meets unparalleled elegance.
          </p>
          <div className="flex gap-4 text-hotelGold text-xl">
             <a href="#" className="hover:text-white transition-colors duration-300"><FaInstagram /></a>
             <a href="https://wa.me/2348067073060" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300"><FaWhatsapp /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-6">
          <h4 className="text-hotelGold uppercase tracking-widest text-xs font-bold font-sans">Navigation</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light uppercase tracking-widest font-sans">
            <li><Link to="/about-hotel" className="hover:text-hotelGold transition-colors">The Legacy</Link></li>
            <li><Link to="/suites" className="hover:text-hotelGold transition-colors">Residences</Link></li>
            <li><Link to="/experience" className="hover:text-hotelGold transition-colors">Experience</Link></li>
            <li><Link to="/book-now" className="hover:text-hotelGold transition-colors">Reservations</Link></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="space-y-6">
          <h4 className="text-hotelGold uppercase tracking-widest text-xs font-bold font-sans">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light font-sans">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-hotelGold mt-1" />
              <span>Aba, Abia State, Nigeria</span>
            </li>
            <li className="flex items-center gap-3 group">
  <FaPhone className="text-hotelGold group-hover:scale-110 transition-transform" />
  <a 
    href="tel:+2348067073060" 
    className="hover:text-hotelGold transition-colors duration-300"
  >
    0806 707 3060
  </a>
</li>
          </ul>
          <div className="pt-4">
             <span className="inline-block border border-hotelGold/30 px-4 py-2 text-[10px] tracking-widest text-hotelGold uppercase font-bold font-sans">
                24/7 Solar Powered
             </span>
          </div>
        </div>
      </div>

     {/* COPYRIGHT & BRANDING SIGNATURE */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-sans">
        
        {/* Main Copyright - More Visible */}
        <p className="text-gray-300">
          &copy; 2026 Kedest Hotel & Suites. All Rights Reserved.
        </p>
        
        {/* Your Branding - Subtle & Dimmed */}
        <div className="flex items-center gap-2 italic text-gray-600">
          <span className="opacity-70">Architected by</span>
          <a 
            href="https://wa.me/2348067073060" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-hotelGold/60 hover:text-hotelGold transition-all duration-300 font-bold border-b border-hotelGold/10 hover:border-hotelGold/40 pb-0.5"
          >
            Chrisboi Excellence
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;