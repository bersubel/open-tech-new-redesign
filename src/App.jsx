import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import The Master Transition
import { triggerLogoRain } from './utils/logoRain';

// Import Global UI Components
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/sections/Navbar';
import Footer from './components/sections/Footer';

// Import Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ClientsPage from './pages/ClientsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WorkPage from './pages/WorkPage';

export default function App() {

  // ==========================================
  // 🌧️ THE GLOBAL ENTRANCE ANIMATION
  // ==========================================
  useEffect(() => {
    // This fires exactly once on initial load or hard refresh.
    // It covers the native browser flash and smoothly reveals the page.
    triggerLogoRain(() => {
      console.log("Welcome to Open Tech.");
    });
  }, []);

  return (
    <Router>
      <div className="relative w-full bg-black text-white font-sans selection:bg-primary selection:text-black min-h-screen flex flex-col">
        
        {/* Global Overlays */}
        <CustomCursor />
        <Navbar />

        {/* Dynamic Page Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/works" element={<WorkPage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}