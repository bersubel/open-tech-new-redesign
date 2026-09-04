import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Added React Router
import { triggerLogoRain } from '../../utils/logoRain'; // ⬅️ Added cinematic transition

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. DATA SETUP
// ==========================================
const row1Logos = [
  { type: 'image', src: '/marvelous.png', alt: 'Marvelous Real Estate' },
  { type: 'image', src: '/eltex.png', alt: 'Eltex Textile & Garment Factory' },
  { type: 'image', src: '/heal.png', alt: 'Heal Venture' },
  { type: 'image', src: '/kebena.png', alt: 'Kebena House' },
  { type: 'text', name: 'Horn Star Group' }, // The Golden Card
  { type: 'image', src: '/waza.png', alt: 'Ywaza Liquor' }
];

const row2Logos = [
  { type: 'image', src: '/davis.png', alt: 'Davis Home Solutions' },
  { type: 'image', src: '/globelink.png', alt: 'Globelink Properties' },
  { type: 'image', src: '/jubilation.png', alt: 'Jeblaton' },
  { type: 'image', src: '/lucid.png', alt: 'Lucid Dental Clinic' },
  { type: 'image', src: '/twobrothers.png', alt: '2Brothers Food Complex' },
  { type: 'image', src: '/castel.png', alt: 'Castel Beer' },
  { type: 'image', src: '/ziquala.png', alt: 'Ziquala Real Estate' }
];

// Duplicate EXACTLY once so moving by -50% creates a perfect, seamless infinite loop
const track1 = [...row1Logos, ...row1Logos];
const track2 = [...row2Logos, ...row2Logos];

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================
const LogoItem = ({ item }) => {
  if (item.type === 'text') {
    // 🌟 THE GOLDEN CARD
    return (
      <div className="h-16 md:h-20 lg:h-28 aspect-[3/1] bg-primary flex items-center justify-center rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] mx-4 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300">
        <span className="text-black font-black uppercase tracking-tighter text-sm md:text-lg leading-none text-center px-4">
          {item.name}
        </span>
      </div>
    );
  }
  
  // 🖼️ STANDARD IMAGE LOGO
  return (
    <img 
      src={item.src} 
      alt={item.alt} 
      className="h-16 md:h-20 lg:h-28 w-auto object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mix-blend-screen bg-transparent px-10 md:px-20"
    />
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function PartnersMarquee() {
  const sectionRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const buttonRef = useRef(null);
  
  const navigate = useNavigate(); // ⬅️ Initialize navigation

  useGSAP(() => {
    // --- MARQUEE ANIMATIONS (Infinite) ---
    // Top Row: Scrolls Left
    gsap.to(marquee1Ref.current, {
      x: "-50%", // Moves exactly half its total width
      ease: "none",
      duration: 35, 
      repeat: -1, 
    });

    // Bottom Row: Scrolls Right
    gsap.fromTo(marquee2Ref.current, 
      { x: "-50%" },
      {
        x: "0%",
        ease: "none",
        duration: 40, 
        repeat: -1,
      }
    );

    // --- BUTTON & ARROW ENTRANCE (ScrollTriggered) ---
    gsap.set('.inward-arrow-path', { strokeDasharray: 300, strokeDashoffset: 300 });
    gsap.set(buttonRef.current, { opacity: 0, scale: 0.8, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 90%", // Trigger when the button area enters the viewport
        toggleActions: "play none none none"
      }
    });

    // 1. Draw Arrows
    tl.to('.inward-arrow-path', {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.out"
    });

    // 2. Pop Button
    tl.to(buttonRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.8)"
    }, "-=0.6");

  }, { scope: sectionRef }); 

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 md:py-32 bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/10"
    >
      
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto w-full text-center px-4 mb-16 md:mb-24">
        <h2 className="text-3xl md:text-[4vw] font-black text-white tracking-tighter leading-none uppercase">
          integrated with the <span className="text-primary italic font-serif font-normal lowercase">best</span>
        </h2>
      </div>

      {/* MARQUEE TRACK 1 (Moving Left) */}
      <div className="relative w-full overflow-hidden flex items-center mb-12 md:mb-16">
        {/* Left and Right Fade Masks */}
        <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div ref={marquee1Ref} className="flex items-center whitespace-nowrap w-max">
          {track1.map((item, index) => (
            <div key={`row1-${index}`} className="flex items-center justify-center flex-shrink-0 cursor-pointer">
              <LogoItem item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE TRACK 2 (Moving Right) */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left and Right Fade Masks */}
        <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div ref={marquee2Ref} className="flex items-center whitespace-nowrap w-max">
          {track2.map((item, index) => (
            <div key={`row2-${index}`} className="flex items-center justify-center flex-shrink-0 cursor-pointer">
              <LogoItem item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 BOTTOM CTA: ARROWS & BUTTON */}
      <div className="relative z-20 w-full max-w-5xl mt-20 md:mt-32 flex items-center justify-center gap-4 md:gap-8 pointer-events-none px-4">
        
        {/* LEFT ARROW (Hidden on small mobile) */}
        <div className="hidden sm:block w-20 h-10 md:w-32 md:h-16">
          <svg viewBox="0 0 150 50" className="w-full h-full text-primary drop-shadow-[0_0_10px_rgba(245,178,26,0.4)]">
            <path className="inward-arrow-path" d="M 0,25 C 50,25 100,25 140,25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path className="inward-arrow-path" d="M 125,10 L 145,25 L 125,40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 🚀 ROUTED BUTTON: Triggers transition & navigates to /clients */}
        <a 
          ref={buttonRef}
          href="/clients" 
          onClick={(e) => {
            e.preventDefault();
            triggerLogoRain(() => {
              navigate('/clients');
              window.scrollTo(0, 0);
            });
          }}
          className="group relative pointer-events-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 md:px-12 md:py-5 rounded-full overflow-hidden border-2 border-primary bg-black/60 backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,178,26,0.3)] hover:scale-105 flex-shrink-0"
        >
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></div>
          
          <span className="relative z-10 font-black uppercase tracking-widest text-[10px] md:text-sm text-primary group-hover:text-black transition-colors duration-300 whitespace-nowrap">
            Social Proof & Work Process
          </span>
          
          <span className="relative z-10 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-primary group-hover:text-black transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </span>
        </a>

        {/* RIGHT ARROW (Hidden on small mobile) */}
        <div className="hidden sm:block w-20 h-10 md:w-32 md:h-16">
          <svg viewBox="0 0 150 50" className="w-full h-full text-primary drop-shadow-[0_0_10px_rgba(245,178,26,0.4)]">
            <path className="inward-arrow-path" d="M 150,25 C 100,25 50,25 10,25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path className="inward-arrow-path" d="M 25,10 L 5,25 L 25,40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </div>

    </section>
  );
}