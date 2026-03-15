import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import About from './pages/About';
import Suites from './pages/Suites';
import Experience from './pages/Experience';
import BookNow from './pages/BookNow';

function App() {
  return (
    <Router>
      {/* The flex-col min-h-screen ensures Footer stays at the bottom */}
      <div className="flex flex-col min-h-screen bg-white">
        
        <Navbar />

        <main className="flex-grow">
          {/* RED TEST BAR REMOVED — THE DESIGN IS LIVE */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-hotel" element={<About />} />
            <Route path="/suites" element={<Suites />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/book-now" element={<BookNow />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;