import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. TEAM DATA & RESPONSIVE ZIGZAG POSITIONING
// ==========================================
const teamSlots = [
  {
    id: 1,
    images: ["/kidus.png", "/nahome.png", "/yonas.png"],
    // Mobile: Pushed Right. Desktop: Top Left
    positionClass: "col-span-1 w-[80%] sm:w-[70%] ml-auto md:w-full md:ml-0 mt-0 md:mt-0 relative z-10", 
    sticker: "none",
  },
  {
    id: 2,
    images: ["/nahome.png", "/nasson.png", "/kidus.png"],
    // Mobile: Pushed Left, overlaps Card 1. Desktop: Center Down
    positionClass: "col-span-1 w-[85%] sm:w-[75%] mr-auto ml-2 md:w-full md:mx-0 -mt-20 md:mt-40 relative z-20", 
    sticker: "vibes", // Orange Good Vibes
  },
  {
    id: 3,
    images: ["/nasson.png", "/nathnael.png", "/nahome.png"],
    // Mobile: Left/Center, overlaps Card 2. Desktop: Top Right
    positionClass: "col-span-1 w-[80%] sm:w-[70%] ml-6 md:w-full md:ml-0 -mt-16 md:mt-16 relative z-30", 
    sticker: "fistbump", // Blue Fists doodle
  },
  {
    id: 4,
    images: ["/nathnael.png", "/yonas.png", "/nasson.png"],
    // Mobile: Pushed Right, overlaps Card 3. Desktop: Bottom Left
    positionClass: "col-span-1 w-[75%] sm:w-[65%] ml-auto mr-4 md:w-full md:mx-0 -mt-24 md:-mt-10 relative z-40", 
    sticker: "hi", // Blue Hi sticker
  },
  {
    id: 5,
    images: ["/yonas.png", "/kidus.png", "/nathnael.png"],
    // Mobile: Pushed Left, capping the stack. Desktop: Bottom Center
    positionClass: "col-span-1 w-[85%] sm:w-[75%] mr-auto ml-4 md:w-full md:mx-0 -mt-20 md:mt-20 relative z-50", 
    sticker: "letsgo", // Blue Lets go
  },
];

export default function Team() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- 3-SECOND AUTO SHUFFLE ---
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- GSAP SCROLL REVEAL ANIMATIONS ---
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. Universal Header Animation
    gsap.from(".team-header-text", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power4.out"
    });

    // 2. Desktop Arrow Animation
    gsap.fromTo(".curly-arrow-path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2, ease: "power3.out", scrollTrigger: { trigger: ".team-card-wrapper", start: "top 60%" } }
    );

    // 3. Mobile Arrow Animation
    gsap.fromTo(".mobile-arrow-path", 
      { strokeDasharray: 600, strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: ".mobile-arrow-trigger", start: "top 70%" } }
    );

    // 4. Universal Background Blob Float
    gsap.to(".bg-blob", {
      y: "40px", rotation: 15, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 1.5
    });

    // ==========================================
    // 🖥️ DESKTOP: UNTOUCHED GRID REVEAL
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray('.team-card-wrapper').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 150, scale: 0.8, opacity: 0, duration: 1.2, ease: "back.out(1.2)", delay: i * 0.1 
        });
      });
    });

    // ==========================================
    // 📱 MOBILE: "POLAROID SLAP" SEQUENCE
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray('.team-card-wrapper').forEach((card, i) => {
        // Alternates fly-in direction based on zigzag position
        const xOffset = i % 2 === 0 ? 100 : -100;
        const rotateOffset = i % 2 === 0 ? 15 : -15;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Triggers precisely as each card enters the screen
          },
          x: xOffset,
          y: 120,
          rotation: rotateOffset,
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.4)", // The satisfying "slap" into the stack
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1f1f] via-black to-black py-32 overflow-hidden">
      
      {/* ==========================================
          BACKGROUND ABSTRACT ELEMENTS
      ========================================== */}
      <div className="bg-blob absolute top-40 right-[-10%] w-[40vw] h-[40vw] bg-primary rounded-full mix-blend-screen filter blur-[130px] opacity-20 pointer-events-none" />
      <div className="bg-blob absolute bottom-20 left-[-10%] w-[50vw] h-[50vw] bg-white rounded-[40%] mix-blend-overlay filter blur-[150px] opacity-[0.07] pointer-events-none" />

      {/* MOBILE ONLY: The sharp Green abstract Clover behind Card 3 */}
      <div className="absolute block md:hidden z-0 pointer-events-none top-[45%] left-[-30%] w-[250px] h-[300px]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#2c614b] fill-current opacity-90 transform -rotate-12">
          <path d="M45.5,5.5 C60.5,-5.5 80.5,10.5 80.5,30.5 C80.5,45.5 105.5,55.5 95.5,75.5 C85.5,95.5 60.5,85.5 45.5,85.5 C25.5,85.5 5.5,105.5 -4.5,85.5 C-14.5,65.5 10.5,55.5 10.5,30.5 C10.5,10.5 30.5,15.5 45.5,5.5 Z" />
        </svg>
      </div>

      {/* MASSIVE TYPOGRAPHY HEADER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mb-16 md:mb-32">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1]">
          <span className="team-header-text inline-block">we are a <span className="text-primary italic font-serif font-normal">driven</span>, future-proof</span> <br />
          <span className="team-header-text inline-block">team of digitally native</span> <br />
          <span className="team-header-text inline-block relative px-4 mt-2">
            wunderkinder.
            <svg className="absolute inset-0 w-full h-[120%] -top-[10%] -left-[2%] text-primary overflow-visible pointer-events-none" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" preserveAspectRatio="none">
              <path d="M15,30 C30,5 170,5 185,30 C200,55 30,55 15,30 Z" strokeDasharray="600" strokeDashoffset="0">
                <animate attributeName="stroke-dashoffset" values="600;0" duration="2s" fill="freeze" />
              </path>
            </svg>
          </span> 
          <span className="team-header-text inline-block text-gray-400"> not to brag!</span>
        </h2>
      </div>

      {/* SCATTERED TEAM GRID */}
      {/* Mobile: gap-0 forces the negative margins to overlap them perfectly */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10">
        
        {/* DESKTOP ARROW (Hidden on Mobile) */}
        <div className="absolute hidden lg:block z-30 pointer-events-none top-[30%] left-[28%] w-[250px] h-[200px]">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            <path className="curly-arrow-path" d="M 20 80 C 80 -20, 160 140, 100 120 C 40 100, 70 20, 180 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path className="curly-arrow-path" d="M 165 50 L 180 60 L 170 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* MOBILE ARROW (Matches screenshot exactly, loops around Card 2) */}
        <div className="absolute block md:hidden z-30 pointer-events-none top-[16%] right-[5%] w-[120px] h-[250px] mobile-arrow-trigger">
          <svg viewBox="0 0 100 200" fill="none" className="w-full h-full text-white drop-shadow-md">
            <path className="mobile-arrow-path" d="M 0 10 C 120 50, 120 150, 60 120 C 20 100, 20 30, 80 180" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="mobile-arrow-path" d="M 65 170 L 80 180 L 95 165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {teamSlots.map((slot) => {
          const currentImage = slot.images[activeIndex % slot.images.length];

          return (
            <div key={slot.id} className={`team-card-wrapper relative flex flex-col items-center group ${slot.positionClass}`}>
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] max-w-[320px] rounded-3xl overflow-hidden bg-[#111] border border-white/10 shadow-xl transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-[0_20px_50px_rgba(245,178,26,0.15)] cursor-pointer">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt="Team Member"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* ==========================================
                  CUSTOM SCRAPBOOK STICKERS (Matched to Screenshot)
              ========================================== */}
              
              {slot.sticker === 'vibes' && (
                <div className="absolute -bottom-6 -right-6 md:-right-12 w-28 h-28 z-30 rotate-12 drop-shadow-lg pointer-events-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[20deg]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#ff5c39] fill-current">
                      <path d="M48.5,9.5 C68.5,-3.5 91.5,15.5 95.5,39.5 C99.5,63.5 76.5,92.5 52.5,96.5 C28.5,100.5 4.5,75.5 1.5,51.5 C-1.5,27.5 28.5,22.5 48.5,9.5 Z" />
                    </svg>
                    <span className="relative z-10 text-white font-black uppercase text-[19px] leading-[0.9] tracking-tighter text-center -rotate-6 pt-2">
                      Good<br/>Vibes
                    </span>
                  </div>
                </div>
              )}

              {slot.sticker === 'fistbump' && (
                <div className="absolute -bottom-8 -right-4 w-28 h-28 z-30 rotate-6 drop-shadow-lg pointer-events-none transform transition-transform duration-500 group-hover:scale-110">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#3b5cff] fill-current">
                      <path d="M25,30 C35,20 60,10 75,30 C90,50 85,80 60,90 C35,100 10,85 5,60 C0,35 15,40 25,30 Z" opacity="0.2" />
                      <path d="M20,60 C30,40 60,40 70,50 M35,45 C40,40 50,40 55,45 M40,65 C45,55 60,55 65,60 M25,70 L35,70 M60,70 L70,70 M45,75 L55,75" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}

              {slot.sticker === 'hi' && (
                <div className="absolute -bottom-8 -left-4 w-24 h-24 z-30 -rotate-12 drop-shadow-lg pointer-events-none transform transition-transform duration-500 group-hover:scale-110">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#3b5cff] fill-current">
                      <path d="M25,15 C45,5 75,10 85,30 C95,50 90,80 70,90 C50,100 15,90 5,70 C-5,50 5,25 25,15 Z" />
                    </svg>
                    <span className="relative z-10 text-[#fbbbbb] font-black uppercase text-3xl pt-1">
                      HI!
                    </span>
                  </div>
                </div>
              )}

              {slot.sticker === 'letsgo' && (
                <div className="absolute -bottom-10 right-4 w-36 h-28 z-30 rotate-6 drop-shadow-lg pointer-events-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                   <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#637cff] fill-current">
                      <path d="M15,30 C30,5 75,10 85,35 C95,60 80,95 50,90 C20,85 0,70 5,45 Z" />
                    </svg>
                    <span className="relative z-10 text-[#ffdede] font-black uppercase tracking-tighter leading-[0.9] text-xl text-center -rotate-6 pt-2">
                      Let's <br/> GO!
                    </span>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
}