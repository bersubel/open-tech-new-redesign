import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerLogoRain } from '../../utils/logoRain'; // ⬅️ The magic rain import

// ==========================================
// 1. MAGNETIC PHYSICS WRAPPER
// ==========================================
function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (window.innerWidth < 768) return; // Disable magnetic pull on mobile touch
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

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
// 2. DUMMY DATA FOR DROPDOWNS
// ==========================================
const recentWorks = [
  { id: 1, img: "/work1.jpg", tag: "jumbo", tagColor: "bg-[#FF6B6B]", title: "super in\nde markt" },
  { id: 2, img: "/work2.jpg", tag: "douwe egberts", tagColor: "bg-[#A06CD5]", title: "feestje bouwe?\napp douwe" },
  { id: 3, img: "/work3.jpg", tag: "hema", tagColor: "bg-[#FF9F1C]", title: "skibidi school" },
];

// ==========================================
// 3. THE MAIN NAVBAR COMPONENT
// ==========================================
export default function Navbar() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    // ⚡ Trigger the transparent rain overlay, then instantly snap to top
    triggerLogoRain(() => {
      window.scrollTo({ top: 0, behavior: 'auto' }); 
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 py-4 md:px-12 md:py-6 grid grid-cols-3 items-center pointer-events-none">
      
      {/* ==========================================
          LEFT: "Works" Button & Postcard
      ========================================== */}
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
              className="absolute top-12 left-0 w-[85vw] max-w-[280px] bg-[#F4F3EE] rounded-3xl p-4 md:p-5 shadow-2xl origin-top-left flex flex-col gap-4 border border-black/5"
            >
              {recentWorks.map((work) => (
                <div key={work.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gray-300 overflow-hidden flex-shrink-0 shadow-sm">
                    <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-black uppercase text-white ${work.tagColor}`}>
                      {work.tag}
                    </span>
                    <h4 className="text-black font-bold text-xs md:text-sm leading-tight tracking-tight whitespace-pre-line">
                      {work.title}
                    </h4>
                  </div>
                </div>
              ))}
              <a href="#work" className="w-full bg-black text-white text-center py-2.5 md:py-3.5 rounded-2xl mt-1 font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary hover:text-black transition-colors duration-300">
                All our work
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==========================================
          CENTER: Logo Splitting to Reveal Text
      ========================================== */}
      <div className="flex justify-center pointer-events-auto translate-x-4 md:translate-x-8">
        <Magnetic strength={0.1}>
          <a 
            href="#" 
            onClick={handleHomeClick}
            className="group relative flex items-center justify-center cursor-pointer w-20 md:w-24 h-12 md:h-16"
          >
            <img 
              src="/Opentechlogo.png" 
              alt="Left Logo"
              className="absolute h-8 md:h-12 object-contain z-20 transform group-hover:-translate-x-[70px] md:group-hover:-translate-x-[90px] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] drop-shadow-[0_0_15px_rgba(245,178,26,0.6)]" 
            />
            <span className="absolute z-10 text-lg md:text-2xl font-black uppercase tracking-tighter text-primary opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:drop-shadow-[0_0_20px_rgba(245,178,26,0.8)] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] whitespace-nowrap">
              OPEN TECH
            </span>
            <img 
              src="/Opentechlogo.png" 
              alt="Right Logo"
              className="absolute h-8 md:h-12 object-contain z-20 transform group-hover:translate-x-[70px] md:group-hover:translate-x-[90px] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] drop-shadow-[0_0_15px_rgba(245,178,26,0.6)]" 
            />
          </a>
        </Magnetic>
      </div>

      {/* ==========================================
          RIGHT: Call Icon & Hover QR Postcard
      ========================================== */}
      <div 
        className="flex justify-end relative pointer-events-auto"
        onMouseEnter={() => window.innerWidth >= 768 && setIsContactOpen(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setIsContactOpen(false)}
      >
        <Magnetic strength={0.2}>
          <button 
            onClick={() => setIsContactOpen((prev) => !prev)}
            className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center hover:bg-black/20 hover:backdrop-blur-md transition-all duration-300 text-white mix-blend-difference"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </button>
        </Magnetic>

        <AnimatePresence>
          {isContactOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="absolute top-12 right-0 w-[75vw] max-w-[240px] bg-[#F4F3EE] rounded-3xl p-5 md:p-6 shadow-2xl origin-top-right flex flex-col items-center text-center border border-black/5"
            >
              <div className="w-full aspect-square bg-white rounded-2xl mb-4 md:mb-5 p-3 shadow-sm border border-black/5 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                  <rect x="10" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <rect x="17.5" y="17.5" width="10" height="10" fill="currentColor"/>
                  <rect x="65" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <rect x="72.5" y="17.5" width="10" height="10" fill="currentColor"/>
                  <rect x="10" y="65" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5"/>
                  <rect x="17.5" y="72.5" width="10" height="10" fill="currentColor"/>
                  <rect x="45" y="10" width="10" height="10" fill="currentColor"/>
                  <rect x="45" y="25" width="10" height="25" fill="currentColor"/>
                  <rect x="65" y="45" width="25" height="10" fill="currentColor"/>
                  <rect x="45" y="65" width="45" height="10" fill="currentColor"/>
                  <rect x="75" y="80" width="15" height="10" fill="currentColor"/>
                  <rect x="45" y="80" width="20" height="10" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-black font-black uppercase tracking-tighter text-lg md:text-xl">whatsapp us</h3>
              <p className="text-black font-medium text-[10px] md:text-xs leading-tight mt-2 px-1">
                Scan the QR code to chat with us via your smartphone.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </header>
  );
}