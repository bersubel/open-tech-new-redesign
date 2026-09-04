import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { triggerLogoRain } from '../../utils/logoRain';

// ==========================================
// 1. MAGNETIC PHYSICS WRAPPER
// ==========================================
function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (window.innerWidth < 768) return; 
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
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 2. DATA (UPDATED WITH REAL PROJECTS)
// ==========================================
const recentWorks = [
  { id: 1, video: "/check.mp4", tag: "Marvelous", tagColor: "bg-[#F5B21A] text-black", title: "Cinematic\nCampaign" },
  { id: 2, video: "/check.mp4", tag: "Castel Beer", tagColor: "bg-black text-[#F5B21A]", title: "Brand\nAnthem" },
  { id: 3, video: "/check.mp4", tag: "Horn Star", tagColor: "bg-white text-black border border-black/10", title: "Event\nDocumentary" },
];

const menuLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Works', href: '/works' }, 
  { name: 'Clients / Partners', href: '/clients' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

const menuContainer = {
  hidden: { opacity: 0, clipPath: "inset(15% 15% 15% 15% round 24px)", scale: 0.95, y: -10 },
  show: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], staggerChildren: 0.08, delayChildren: 0.2 } },
  exit: { opacity: 0, clipPath: "inset(15% 15% 15% 15% round 24px)", scale: 0.95, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
};

const menuItem = {
  hidden: { opacity: 0, y: 30, rotateX: -20 }, 
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
};

export default function Navbar() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate(); 
  const location = useLocation(); 

  // 🧠 THE MASTER TRANSITION LOGIC
  const handleNavigation = (e, path) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setIsWorkOpen(false);

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

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 py-4 md:px-12 md:py-6 grid grid-cols-3 items-center pointer-events-none">
      
      {/* LEFT: "Works" */}
      <div 
        className="flex justify-start relative pointer-events-auto"
        onMouseEnter={() => window.innerWidth >= 768 && setIsWorkOpen(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setIsWorkOpen(false)}
      >
        <Magnetic strength={0.2}>
          <button 
            onClick={() => setIsWorkOpen((prev) => !prev)}
            className="group flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-black/20 hover:backdrop-blur-md transition-all duration-300 mix-blend-difference"
          >
            <span className="text-primary mr-1.5 md:mr-2 transform group-hover:rotate-90 transition-transform duration-500">✦</span>
            <span className="font-black uppercase tracking-widest text-xs md:text-sm text-white">Works</span>
          </button>
        </Magnetic>

        <AnimatePresence>
          {isWorkOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="absolute top-12 left-0 w-[85vw] max-w-[280px] bg-[#F4F3EE] rounded-3xl p-4 md:p-5 shadow-2xl origin-top-left flex flex-col gap-2 border border-black/5"
            >
              {recentWorks.map((work) => (
                <div 
                  key={work.id} 
                  onClick={(e) => handleNavigation(e, '/works')}
                  className="flex items-center gap-3 cursor-pointer group hover:bg-black/5 p-2 rounded-2xl transition-colors duration-300"
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl bg-black overflow-hidden flex-shrink-0 shadow-sm">
                    {/* Live Video Thumbnail */}
                    <video 
                      src={work.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-black uppercase ${work.tagColor}`}>
                      {work.tag}
                    </span>
                    <h4 className="text-black font-black text-xs md:text-sm leading-tight tracking-tighter uppercase whitespace-pre-line">
                      {work.title}
                    </h4>
                  </div>
                </div>
              ))}
              
              <div className="w-full h-px bg-black/5 my-2" />
              
              <a 
                href="/works" 
                onClick={(e) => handleNavigation(e, '/works')}
                className="w-full bg-black text-white text-center py-3 rounded-2xl font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary hover:text-black transition-colors duration-300 shadow-md"
              >
                All our work
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CENTER: Logo */}
      <div className="flex justify-center pointer-events-auto translate-x-4 md:translate-x-8">
        <Magnetic strength={0.1}>
          <a 
            href="/" 
            onClick={(e) => handleNavigation(e, '/')}
            className="group relative flex items-center justify-center cursor-pointer w-20 md:w-24 h-12 md:h-16"
          >
            <img src="/Opentechlogo.png" alt="Left Logo" className="absolute h-8 md:h-12 object-contain z-20 transform group-hover:-translate-x-[70px] md:group-hover:-translate-x-[90px] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] drop-shadow-[0_0_15px_rgba(245,178,26,0.6)]" />
            <span className="absolute z-10 text-lg md:text-2xl font-black uppercase tracking-tighter text-primary opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:drop-shadow-[0_0_20px_rgba(245,178,26,0.8)] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] whitespace-nowrap">OPEN TECH</span>
            <img src="/Opentechlogo.png" alt="Right Logo" className="absolute h-8 md:h-12 object-contain z-20 transform group-hover:translate-x-[70px] md:group-hover:translate-x-[90px] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] drop-shadow-[0_0_15px_rgba(245,178,26,0.6)]" />
          </a>
        </Magnetic>
      </div>

      {/* RIGHT: Menu */}
      <div 
        className="flex justify-end relative pointer-events-auto"
        onMouseEnter={() => window.innerWidth >= 768 && setIsMenuOpen(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setIsMenuOpen(false)}
      >
        <Magnetic strength={0.2}>
          <button 
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center hover:bg-black/20 hover:backdrop-blur-md transition-all duration-300 text-white mix-blend-difference group"
          >
            <div className="relative flex flex-col items-end justify-center w-6 h-5 gap-[5px] overflow-hidden">
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6 group-hover:w-5'}`} />
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-6'}`} />
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5 group-hover:w-4'}`} />
            </div>
          </button>
        </Magnetic>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="absolute top-14 right-0 w-[80vw] max-w-[320px] bg-[#F4F3EE] rounded-3xl p-6 md:p-8 shadow-2xl origin-top-right flex flex-col items-start text-left border border-black/5"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-black/10 pb-4 w-full">
                <img src="/Opentechlogo.png" alt="Open Tech Logo" className="w-5 h-5 object-contain" />
                <h3 className="text-black font-black text-sm md:text-base tracking-widest uppercase">Open Tech.</h3>
              </div>
              
              <ul className="w-full flex flex-col gap-2">
                {menuLinks.map((link) => (
                  <motion.li key={link.name} variants={menuItem} className="w-full relative overflow-hidden group/item">
                    <a 
                      href={link.href} 
                      onClick={(e) => handleNavigation(e, link.href)}
                      className="flex items-center w-full py-2 text-black cursor-pointer"
                    >
                      <span className="absolute left-0 opacity-0 -translate-x-6 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                      </span>
                      <span className="font-black uppercase tracking-tighter text-2xl md:text-3xl transform group-hover/item:translate-x-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/item:text-primary">
                        {link.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </header>
  );
}