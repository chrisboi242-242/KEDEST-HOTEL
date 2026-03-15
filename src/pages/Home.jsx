import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. HERO SECTION - The First Impression */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: "url('/images/hero.jpg')" }} 
        >
          {/* Deeper, more dramatic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-hotelNavy/70 via-hotelNavy/40 to-hotelNavy/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl">
          <span className="text-hotelGold text-xs md:text-sm tracking-[0.6em] uppercase font-bold animate-fade-in block mb-4">
            The Gold Standard of Aba
          </span>
          <h1 className="font-luxury text-white italic leading-none text-6xl md:text-9xl drop-shadow-2xl animate-fade-in">
            Kedest <span className="text-hotelGold">Hotel</span>
          </h1>
          
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="h-[1px] w-12 md:w-24 bg-hotelGold/50"></div>
            <p className="text-gray-300 uppercase tracking-[0.4em] text-[10px] md:text-sm font-light">
              Nigeria • Luxury • Uninterrupted
            </p>
            <div className="h-[1px] w-12 md:w-24 bg-hotelGold/50"></div>
          </div>

          <p className="text-gray-300 mt-10 max-w-2xl mx-auto text-sm md:text-xl font-light leading-relaxed italic">
            "Where the elite find peace, and luxury never blinks."
          </p>

          <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-8">
            <Link to="/suites" className="w-full md:w-auto bg-hotelGold text-hotelNavy px-14 py-5 font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.3)] text-center">
              Discover The Suites
            </Link>
            <Link to="/book-now" className="w-full md:w-auto border border-white/30 text-white px-14 py-5 font-bold uppercase tracking-widest hover:bg-hotelGold hover:border-hotelGold transition-all duration-500 text-center backdrop-blur-sm">
              Secure a Room
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-hotelGold">
            <span className="text-[10px] uppercase tracking-widest rotate-90 mb-8 font-bold">Scroll</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-hotelGold to-transparent"></div>
        </div>
      </section>

      {/* 2. THE INTENSITY BAR (New: Social Proof/Stats) */}
      <section className="bg-hotelNavy py-12 px-6 border-b border-hotelGold/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <p className="text-hotelGold text-3xl font-luxury italic">24/7</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-2">Solar Power</p>
            </div>
            <div>
                <p className="text-hotelGold text-3xl font-luxury italic">100%</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-2">Secure Zone</p>
            </div>
            <div>
                <p className="text-hotelGold text-3xl font-luxury italic">Elite</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-2">Concierge</p>
            </div>
            <div>
                <p className="text-hotelGold text-3xl font-luxury italic">Aba</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-2">Prime Location</p>
            </div>
        </div>
      </section>

      {/* 3. THE SOLAR PROMISE - High Contrast Section */}
      <section className="relative py-32 bg-hotelNavy overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-0 right-0 text-[20vw] font-black text-white/[0.03] select-none leading-none -translate-y-1/4 translate-x-1/4">
          SOLAR
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-white font-luxury text-4xl md:text-7xl mb-8 italic leading-tight">
            Light That <span className="text-hotelGold underline decoration-1 underline-offset-8">Never Fades.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-2xl leading-relaxed font-light max-w-3xl mx-auto">
            In a city that never sleeps, we ensure your comfort doesn't either. 
            Our industrial-grade <span className="text-white font-semibold italic">Solar Infrastructure</span> means no noise, no fumes, and zero power interruptions. Ever.
          </p>
          <div className="mt-12 h-[1px] w-20 bg-hotelGold mx-auto"></div>
        </div>
      </section>

      {/* 4. THE LANDMARK - Editorial Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-stretch gap-0 border border-gray-100 shadow-2xl">
            
            {/* Image Side - Massive Presence */}
            <div className="w-full lg:w-1/2 relative group overflow-hidden">
                <img 
                  src="/images/SMART HOTEL.jpg" 
                  alt="Kedest Hotel Building Exterior" 
                  className="w-full h-full min-h-[500px] object-cover transition-transform duration-[5000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-hotelNavy/20 group-hover:bg-transparent transition-all duration-500"></div>
            </div>

            {/* Text Side - Elegant Padding */}
            <div className="w-full lg:w-1/2 bg-white p-12 md:p-20 flex flex-col justify-center">
              <span className="text-hotelGold font-bold text-xs tracking-[0.4em] uppercase mb-6 block">Our Legacy</span>
              <h2 className="font-luxury text-hotelNavy text-4xl md:text-6xl italic leading-tight mb-8">
                The Landmark of <br /> Aba Prestige
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-lg mb-10">
                Kedest Hotel & Suites isn't just a place to sleep—it's a statement. 
                Designed for the traveler who refuses to compromise on security and elegance.
              </p>
              
              <div className="space-y-4 mb-10 text-sm uppercase tracking-widest text-hotelNavy font-bold">
                 <p className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                    <span className="w-8 h-[1px] bg-hotelGold"></span> Victoria Island Standard
                 </p>
                 <p className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                    <span className="w-8 h-[1px] bg-hotelGold"></span> Smart Access Control
                 </p>
                 <p className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                    <span className="w-8 h-[1px] bg-hotelGold"></span> 24/7 Armed Security
                 </p>
              </div>

              <Link to="/experience" className="text-hotelNavy font-bold uppercase tracking-[0.3em] text-xs border-b-2 border-hotelGold pb-2 inline-block self-start hover:text-hotelGold transition-colors">
                Explore The Experience
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FINAL CTA - The Close */}
      <section className="py-24 bg-hotelNavy text-center">
          <h2 className="font-luxury text-white text-3xl md:text-5xl italic mb-10">Ready to Experience the Exceptional?</h2>
          <Link to="/Suites" className="bg-hotelGold text-hotelNavy px-16 py-5 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-2xl">
              Reserve Your Sanctuary Now
          </Link>
      </section>
    </div>
  );
};

export default Home;