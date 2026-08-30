import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Split your 11 logos into two rows
const row1Logos = [
  "/creavers.png",
  "/eltex.png",
  "/heal.png",
  "/kebena.png",
  "/tila.png",
  "/waza.png"
];

const row2Logos = [
  "/davis.png",
  "/globelink.png",
  "/jubilation.png",
  "/lucid.png",
  "/twobrothers.png"
];

// Duplicate EXACTLY once so moving by -50% creates a perfect, seamless infinite loop
const track1 = [...row1Logos, ...row1Logos];
const track2 = [...row2Logos, ...row2Logos];

export default function PartnersMarquee() {
  const sectionRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);

  useGSAP(() => {
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

        <div ref={marquee1Ref} className="flex whitespace-nowrap w-max">
          {track1.map((logoSrc, index) => (
            <div 
              key={`row1-${index}`} 
              className="px-10 md:px-20 flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              <img 
                src={logoSrc} 
                alt="Partner Logo" 
                // Increased heights: h-16 (mobile), h-20 (tablet), h-28 (desktop)
                className="h-16 md:h-20 lg:h-28 w-auto object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mix-blend-screen bg-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE TRACK 2 (Moving Right) */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left and Right Fade Masks */}
        <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div ref={marquee2Ref} className="flex whitespace-nowrap w-max">
          {track2.map((logoSrc, index) => (
            <div 
              key={`row2-${index}`} 
              className="px-10 md:px-20 flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              <img 
                src={logoSrc} 
                alt="Partner Logo" 
                // Increased heights: h-16 (mobile), h-20 (tablet), h-28 (desktop)
                className="h-16 md:h-20 lg:h-28 w-auto object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mix-blend-screen bg-transparent"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}