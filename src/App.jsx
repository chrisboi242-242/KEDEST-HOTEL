import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ExploreRooms from './pages/ExploreRooms';
import AvailableRooms from './pages/AvailableRooms';
import ExploreArea from './pages/ExploreArea';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <DarkModeProvider> 
      {/* ADD THE BASENAME HERE */}
      <Router basename="/KEDEST-HOTEL">
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-hotel" element={<About />} />
            <Route path="/explore-rooms" element={<ExploreRooms />} />
            <Route path="/available-rooms" element={<AvailableRooms />} />
            <Route path="/explore-area" element={<ExploreArea />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;