import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. HERO HEADER */}
      <section className="bg-hotelNavy py-32 px-6 text-center border-b border-hotelGold/30 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        </div>
        
        <div className="relative z-10">
          <span className="text-hotelGold text-xs tracking-[0.6em] uppercase font-bold mb-4 block animate-fade-in">Established in Aba</span>
          <h1 className="font-luxury text-white text-6xl md:text-9xl italic animate-fade-in leading-none">
            Our <span className="text-hotelGold">Legacy</span>
          </h1>
          <div className="h-[1px] w-24 bg-hotelGold mx-auto mt-10"></div>
        </div>
      </section>

      {/* 2. THE EDITORIAL SPLIT */}
      <section className="max-w-7xl mx-auto py-24 md:py-32 px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-hotelGold/10 -z-10 hidden md:block"></div>
            <div className="relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] group">
              <img 
                src="/images/29 Scandinavian.jpg" 
                alt="Kedest Hotel Interior" 
                className="w-full h-[600px] object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-hotelNavy p-8 shadow-2xl hidden md:block border-l-4 border-hotelGold">
              <p className="text-hotelGold font-luxury italic text-2xl">Excellence</p>
              <p className="text-white text-[10px] tracking-[0.3em] uppercase mt-2">The Kedest Standard</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-10">
            <h2 className="font-luxury text-hotelNavy text-5xl md:text-7xl italic leading-tight">
              A Sanctuary <br /> Built for the <span className="text-hotelGold underline decoration-1 underline-offset-8 italic">Elite.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-light">
              Kedest Hotel & Suites was born from a singular, ruthless vision: 
              To create a space where the chaos of the outside world stops at the gates.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-100">
              <div className="group">
                <h4 className="text-hotelGold font-bold text-4xl font-luxury italic">24/7</h4>
                <p className="text-hotelNavy uppercase text-[10px] tracking-[0.4em] font-black mt-2">Solar Autonomy</p>
              </div>
              <div className="group">
                <h4 className="text-hotelGold font-bold text-4xl font-luxury italic">Secure</h4>
                <p className="text-hotelNavy uppercase text-[10px] tracking-[0.4em] font-black mt-2">Smart-Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PHILOSOPHY */}
      <section className="bg-hotelNavy py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h3 className="font-luxury text-hotelGold text-3xl md:text-5xl italic mb-10">The Mission</h3>
          <p className="text-2xl md:text-4xl text-white italic font-light leading-relaxed">
            "To provide a sanctuary of luxury where the <span className="text-hotelGold font-semibold">lights never go out</span> and the service never falters."
          </p>
        </div>
      </section>

      {/* 4. CALL TO ACTION - UPDATED & FUNCTIONAL */}
      <section className="py-24 bg-white text-center px-6">
        <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] mb-6 font-bold">Experience it yourself</p>
        <h2 className="font-luxury text-hotelNavy text-4xl md:text-6xl italic mb-12 leading-tight">Luxury Awaits <br/> Your Arrival.</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
           <Link 
             to="/suites" 
             className="bg-hotelNavy text-hotelGold px-14 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-hotelGold hover:text-hotelNavy transition-all duration-500 shadow-2xl"
           >
              View The Residences
           </Link>
           <Link 
             to="/experience" 
             className="border border-hotelNavy text-hotelNavy px-14 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-hotelNavy hover:text-white transition-all duration-500"
           >
              Our Gallery
           </Link>
        </div>
      </section>
    </div>
  );
};

export default About;