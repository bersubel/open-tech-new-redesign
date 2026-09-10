import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { triggerLogoRain } from '../../utils/logoRain';

// ==========================================
// 1. MAGNETIC PHYSICS WRAPPER
// ==========================================
function Magnetic({ children, strength = 0.15 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (window.innerWidth < 1024) return; 
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-flex relative z-50"
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 2. PREMIUM LINK COMPONENT (Text-Roll Hover)
// ==========================================
const NavLink = ({ title, path, handleNavigation, isWhiteBg }) => {
  return (
    <Magnetic>
      <a 
        href={path}
        onClick={(e) => handleNavigation(e, path)}
        className="group relative flex items-center justify-center px-4 py-2 cursor-pointer overflow-hidden rounded-full pointer-events-auto"
      >
        <div className="relative flex flex-col font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] text-center w-full">
          {/* Default Text */}
          <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%] ${isWhiteBg ? 'text-primary' : 'text-white'}`}>
            {title}
          </span>
          {/* Reveal Golden Text on Hover */}
          <span className="absolute top-0 left-0 w-full block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[120%] text-primary group-hover:translate-y-0">
            {title}
          </span>
        </div>
      </a>
    </Magnetic>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation(); 

  // 🧠 Smart Route Detector for White Background Pages
  const isWhiteBg = location.pathname === '/services';

  const handleNavigation = (e, path) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === path) {
      triggerLogoRain(() => {
        window.scrollTo({ top: 0, behavior: 'auto' }); 
      });
    } else {
      triggerLogoRain(() => {
        navigate(path);
        window.scrollTo(0, 0);
      });
    }
  };

  const leftLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Works', path: '/works' }
  ];

  const rightLinks = [
    { name: 'Partners', path: '/clients' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] px-4 py-6 md:px-12 pointer-events-none flex justify-center">
      
      {/* 
          Master Container: 
          'pointer-events-none' lets clicks pass through the empty space,
          but the inner elements have 'pointer-events-auto' 
      */}
      <div className="w-full max-w-[1800px] flex justify-between items-center relative h-16">
        
        {/* ==========================================
            DESKTOP NAVIGATION (1024px and up)
        ========================================== */}
        
        {/* LEFT LINKS (Locked to Left Edge) */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
          {leftLinks.map((link) => (
            <NavLink key={link.name} title={link.name} path={link.path} handleNavigation={handleNavigation} isWhiteBg={isWhiteBg} />
          ))}
        </div>

        {/* CENTER LOGO (Absolutely Centered - Cannot Overlap Links) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center pointer-events-auto">
          <Magnetic strength={0.1}>
            <a 
              href="/" 
              onClick={(e) => handleNavigation(e, '/')}
              className="group relative flex items-center justify-center cursor-pointer w-24 h-16"
            >
              <img 
                src="/Opentechlogo.png" 
                alt="Left Logo" 
                className="absolute h-10 object-contain z-20 transform group-hover:-translate-x-[120px] transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] drop-shadow-[0_0_15px_rgba(245,178,26,0.6)]" 
              />
              <span className="absolute z-10 text-xl font-black uppercase tracking-tighter text-primary opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:drop-shadow-[0_0_20px_rgba(245,178,26,0.8)] transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] whitespace-nowrap">
                OPEN TECHNOLOGY
              </span>
              <img 
                src="/Opentechlogo.png" 
                alt="Right Logo" 
                className="absolute h-10 object-contain z-20 transform group-hover:translate-x-[120px] transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] drop-shadow-[0_0_15px_rgba(245,178,26,0.6)]" 
              />
            </a>
          </Magnetic>
        </div>

        {/* RIGHT LINKS (Locked to Right Edge) */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
          {rightLinks.map((link) => (
            <NavLink key={link.name} title={link.name} path={link.path} handleNavigation={handleNavigation} isWhiteBg={isWhiteBg} />
          ))}
        </div>


        {/* ==========================================
            MOBILE NAVIGATION (Under 1024px)
        ========================================== */}
        <div className="lg:hidden flex justify-between items-center w-full pointer-events-auto">
          
          {/* REDESIGNED LEFT-ALIGNED MOBILE LOGO */}
          <a 
            href="/" 
            onClick={(e) => handleNavigation(e, '/')}
            className="flex items-center gap-3 z-50"
          >
            <img 
              src="/Opentechlogo.png" 
              alt="Open Technology Logo" 
              className="h-8 object-contain drop-shadow-[0_0_10px_rgba(245,178,26,0.3)]" 
            />
            <span className={`font-black uppercase tracking-tighter text-lg sm:text-xl ${isWhiteBg ? 'text-primary' : 'text-white'}`}>
              Open Technology
            </span>
          </a>

          {/* MOBILE HAMBURGER MENU */}
          <Magnetic strength={0.2}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-14 h-14 rounded-full flex flex-col items-center justify-center gap-[6px] relative z-[100] group transition-colors duration-300 ${isWhiteBg && !isMobileMenuOpen ? 'text-primary' : 'text-white'}`}
            >
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'w-7 rotate-45 translate-y-[8px]' : 'w-7 group-hover:w-5'}`} />
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-5 group-hover:w-7'}`} />
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'w-7 -rotate-45 -translate-y-[8px]' : 'w-6 group-hover:w-4'}`} />
            </button>
          </Magnetic>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10% round 24px)", scale: 0.95 }}
                animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1 }}
                exit={{ opacity: 0, clipPath: "inset(10% 10% 10% 10% round 24px)", scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-20 right-0 w-[85vw] max-w-[320px] bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-2 origin-top-right z-[90]"
              >
                {[...leftLinks, ...rightLinks].map((link, index) => (
                  <motion.a 
                    key={link.name}
                    href={link.path} 
                    onClick={(e) => handleNavigation(e, link.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + (index * 0.05), ease: "easeOut" }}
                    className="text-white text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors py-3 border-b border-white/5 last:border-0"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}