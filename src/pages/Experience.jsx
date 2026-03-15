import React, { useState } from 'react';
import { 
  FaSolarPanel, FaSwimmingPool, FaShieldAlt, 
  FaGlassMartiniAlt, FaLightbulb, FaLeaf, FaTimes 
} from 'react-icons/fa';

const features = [
  { id: 1, icon: <FaLeaf />, title: "Serene Sanctuary", desc: "Tucked away in a quiet, secure street for a peaceful, homely atmosphere." },
  { id: 2, icon: <FaSolarPanel />, title: "Dual-Power Reliability", desc: "Industrial generators backed by 24/7 Solar energy systems." },
  { id: 3, icon: <FaSwimmingPool />, title: "Azure Pool", desc: "A temperature-controlled oasis for guest relaxation and leisure." },
  { id: 4, icon: <FaGlassMartiniAlt />, title: "Vogue Bar", desc: "Curated cocktails and premium spirits in a sophisticated lounge." },
  { id: 5, icon: <FaShieldAlt />, title: "Elite Security", desc: "Round-the-clock personnel and advanced smart-card entry systems." },
  { id: 6, icon: <FaLightbulb />, title: "Luminous Grounds", desc: "Wide, well-lit corridors and common areas for safety and elegance." }
];

const galleryImages = [
  { src: "/images/Hotel night view.jpg", title: "Midnight View", colSpan: "md:col-span-2" },
  { src: "/images/download (8).jpg", title: "Poolside", colSpan: "" },
  { src: "/images/Take me to the nearest bar.jpg", title: "The Lounge", colSpan: "" },
  { src: "/images/BBP NRG.jpg", title: "Solar Array", colSpan: "" },
  { src: "/images/download (9).jpg", title: "Security Detail", colSpan: "" },
  { src: "/images/download (10).jpg", title: "Architecture", colSpan: "md:col-span-2" }
];

const Experience = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header - Intense Intro */}
      <section className="bg-hotelNavy py-24 px-6 text-center border-b border-hotelGold/30">
        <h1 className="font-luxury text-hotelGold text-5xl md:text-7xl italic animate-fade-in">
          The Experience
        </h1>
        <p className="text-gray-400 mt-6 uppercase tracking-[0.4em] text-[10px] md:text-sm max-w-2xl mx-auto leading-loose">
          Beyond a stay—a standard of living. Discover the facilities that define Kedest luxury.
        </p>
      </section>

      {/* 2. Features Grid - Responsive Media Queries */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((f) => (
          <div key={f.id} className="group p-8 border border-gray-100 hover:border-hotelGold/50 transition-all duration-500 hover:shadow-xl rounded-sm">
            <div className="text-4xl text-hotelGold mb-6 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h3 className="font-luxury text-hotelNavy text-2xl italic mb-4">{f.title}</h3>
            <p className="text-gray-500 font-light leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* 3. Visual Tour - Modern Gallery Grid */}
      <section className="bg-hotelNavy/5 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-luxury text-hotelNavy text-4xl italic">Visual Tour</h2>
            <div className="h-1 w-20 bg-hotelGold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden cursor-pointer group h-72 ${img.colSpan}`}
                onClick={() => setSelectedImg(img.src)}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-hotelNavy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white uppercase tracking-[0.2em] text-xs font-bold border border-white px-4 py-2">
                    Enlarge {img.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      {selectedImg && (
        <div className="fixed inset-0 z-[200] bg-hotelNavy/fb backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-10 right-10 text-white text-4xl hover:text-hotelGold transition-colors">
            <FaTimes />
          </button>
          <img src={selectedImg} alt="Enlarged Experience" className="max-w-full max-h-[85vh] shadow-2xl border-4 border-white/10" />
        </div>
      )}

      {/* 5. Map Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-luxury text-hotelNavy text-4xl italic">Our Coordinates</h2>
          <p className="text-gray-500 mt-2 font-light">Visit us in the heart of the secure district.</p>
        </div>
        <div className="h-[450px] shadow-2xl border-2 border-hotelGold/10">
          <iframe 
            title="Hotel Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0182!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1633000000000!5m2!1sen!2sus"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </section>
    </div>
  );
};

export default Experience;