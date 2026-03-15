import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navLinkStyles = ({ isActive }) => 
    isActive 
      ? "text-hotelGold border-b-2 border-hotelGold pb-1 transition-all duration-300" 
      : "hover:text-hotelGold transition-all duration-300";

  return (
    <nav className="bg-hotelNavy text-white sticky top-0 z-[100] shadow-2xl border-b border-hotelGold/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* 1. BRAND LOGO */}
        <Link to="/" onClick={closeMenu} className="group">
          <div className="text-2xl md:text-3xl font-luxury font-black tracking-tighter text-hotelGold italic flex flex-col">
            <span className="leading-none text-hotelGold">KEDEST</span>
            <span className="text-[10px] tracking-[0.5em] text-white group-hover:text-hotelGold transition-colors">HOTEL & SUITES</span>
          </div>
        </Link>

        {/* 2. DESKTOP NAVIGATION */}
        <ul className="hidden md:flex items-center space-x-10 font-medium uppercase text-xs tracking-[0.2em]">
          <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
          <li><NavLink to="/about-hotel" className={navLinkStyles}>About</NavLink></li>
          <li><NavLink to="/suites" className={navLinkStyles}>Suites</NavLink></li>
          <li><NavLink to="/experience" className={navLinkStyles}>Experience</NavLink></li>
          <li>
            <Link 
              to="/book-now" 
              className="bg-hotelGold text-hotelNavy px-6 py-2 font-bold rounded-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              BOOK NOW
            </Link>
          </li>
        </ul>

        {/* 3. MOBILE TOGGLE BUTTON */}
        <div className="md:hidden text-2xl cursor-pointer text-hotelGold z-[110]" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* 4. MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[105] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden bg-hotelNavy
        ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <ul className="text-center space-y-10 text-2xl font-luxury tracking-[0.3em] uppercase">
          <li>
            <Link to="/" onClick={closeMenu} className="text-white hover:text-hotelGold block transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-hotel" onClick={closeMenu} className="text-white hover:text-hotelGold block transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/suites" onClick={closeMenu} className="text-white hover:text-hotelGold block transition-colors">
              Suites
            </Link>
          </li>
          <li>
            <Link to="/experience" onClick={closeMenu} className="text-white hover:text-hotelGold block transition-colors">
              Experience
            </Link>
          </li>
          <li className="pt-6">
            <Link 
              to="/book-now" 
              onClick={closeMenu} 
              className="bg-hotelGold text-hotelNavy px-12 py-4 font-bold rounded-sm shadow-2xl inline-block"
            >
              BOOK NOW
            </Link>
          </li>
        </ul>
        
        <div className="absolute bottom-10 text-hotelGold/40 text-[10px] tracking-[0.5em] uppercase">
          Kedest Excellence
        </div>
      </div>
    </nav>
  );
};

export default Navbar;