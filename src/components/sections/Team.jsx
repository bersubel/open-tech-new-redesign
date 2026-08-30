import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. TEAM DATA & SHUFFLE ARRAYS
// ==========================================
// Using your exact file names. The arrays are mixed so each slot 
// shuffles through a different sequence of the team every 3 seconds.
const teamSlots = [
  {
    id: 1,
    images: ["/kidus.png", "/nahome.png", "/yonas.png"],
    positionClass: "col-span-1 md:mt-0", // Top Left
    sticker: "hi",
  },
  {
    id: 2,
    images: ["/nahome.png", "/nasson.png", "/kidus.png"],
    positionClass: "col-span-1 mt-12 md:mt-40 relative z-20", // Center Pushed Down
    sticker: "vibes",
  },
  {
    id: 3,
    images: ["/nasson.png", "/nathnael.png", "/nahome.png"],
    positionClass: "col-span-1 mt-12 md:mt-16", // Top Right
    sticker: "none",
  },
  {
    id: 4,
    images: ["/nathnael.png", "/yonas.png", "/nasson.png"],
    positionClass: "col-span-1 mt-12 md:-mt-10", // Bottom Left (tucked up)
    sticker: "letsgo",
  },
  {
    id: 5,
    images: ["/yonas.png", "/kidus.png", "/nathnael.png"],
    positionClass: "col-span-1 mt-12 md:mt-20 relative z-20", // Bottom Center
    sticker: "none",
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
    // 1. Animate the main header text
    gsap.from(".team-header-text", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out"
    });

    // 2. Animate the team cards popping up
    gsap.utils.toArray('.team-card-wrapper').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 150,
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.2)",
        delay: i * 0.1 
      });
    });

    // 3. Animate the Hand-Drawn Arrow drawing itself
    gsap.fromTo(".curly-arrow-path", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-card-wrapper", // Triggers when the first card appears
          start: "top 60%",
        }
      }
    );

    // 4. Gentle floating animation for background blobs
    gsap.to(".bg-blob", {
      y: "40px",
      rotation: 15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1.5
    });
  }, { scope: sectionRef });

  return (
    // Added a rich, dark radial gradient to the background for depth
    <section ref={sectionRef} className="relative w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1f1f] via-black to-black py-32 overflow-hidden">
      
      {/* ==========================================
          BACKGROUND ABSTRACT BLOBS
      ========================================== */}
      <div className="bg-blob absolute top-40 right-[-10%] w-[40vw] h-[40vw] bg-primary rounded-full mix-blend-screen filter blur-[130px] opacity-20 pointer-events-none" />
      <div className="bg-blob absolute bottom-20 left-[-10%] w-[50vw] h-[50vw] bg-white rounded-[40%] mix-blend-overlay filter blur-[150px] opacity-[0.07] pointer-events-none" />

      {/* ==========================================
          MASSIVE TYPOGRAPHY HEADER
      ========================================== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mb-20 md:mb-32">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1]">
          <span className="team-header-text inline-block">we are a <span className="text-primary italic font-serif font-normal">driven</span>, future-proof</span> <br />
          <span className="team-header-text inline-block">team of digitally native</span> <br />
          <span className="team-header-text inline-block relative px-4 mt-2">
            wunderkinder.
            {/* Hand-drawn scribble circle */}
            <svg className="absolute inset-0 w-full h-[120%] -top-[10%] -left-[2%] text-primary overflow-visible pointer-events-none" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" preserveAspectRatio="none">
              <path d="M15,30 C30,5 170,5 185,30 C200,55 30,55 15,30 Z" strokeDasharray="600" strokeDashoffset="0">
                <animate attributeName="stroke-dashoffset" values="600;0" duration="2s" fill="freeze" />
              </path>
            </svg>
          </span> 
          <span className="team-header-text inline-block text-gray-400"> not to brag!</span>
        </h2>
      </div>

      {/* ==========================================
          SCATTERED TEAM GRID & ANIMATED ARROW
      ========================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        
        {/* The Animated SVG Arrow (Visible on Desktop, hidden on mobile to prevent clutter) */}
        <div className="absolute hidden lg:block z-30 pointer-events-none top-[30%] left-[28%] w-[250px] h-[200px]">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {/* The Curly Loop Path */}
            <path 
              className="curly-arrow-path" 
              d="M 20 80 C 80 -20, 160 140, 100 120 C 40 100, 70 20, 180 60" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            {/* The Arrowhead */}
            <path 
              className="curly-arrow-path" 
              d="M 165 50 L 180 60 L 170 75" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>

        {teamSlots.map((slot) => {
          // Calculate which image to show based on our 3-second timer
          const currentImage = slot.images[activeIndex % slot.images.length];

          return (
            <div key={slot.id} className={`team-card-wrapper relative flex flex-col items-center group ${slot.positionClass}`}>
              
              {/* Image Container with Hover Interactions */}
              <div className="relative w-full aspect-[4/5] max-w-[320px] rounded-[2rem] overflow-hidden bg-[#111] border border-white/10 shadow-2xl transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-[0_20px_50px_rgba(245,178,26,0.15)] cursor-pointer">
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
                
                {/* Subtle overlay gradient on the image to make it look premium */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* ==========================================
                  CUSTOM STICKERS / DOODLES
              ========================================== */}
              {slot.sticker === 'vibes' && (
                <div className="absolute -bottom-8 -right-8 md:-right-12 w-32 h-32 z-30 rotate-12 drop-shadow-xl pointer-events-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[20deg]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Primary Brand Blob Background */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-primary fill-current">
                      <path d="M48.5,9.5 C68.5,-3.5 91.5,15.5 95.5,39.5 C99.5,63.5 76.5,92.5 52.5,96.5 C28.5,100.5 4.5,75.5 1.5,51.5 C-1.5,27.5 28.5,22.5 48.5,9.5 Z" />
                    </svg>
                    <span className="relative z-10 text-black font-black uppercase text-xl leading-none text-center -rotate-6">
                      Good<br/>Vibes
                    </span>
                  </div>
                </div>
              )}

              {slot.sticker === 'hi' && (
                <div className="absolute -top-6 -left-6 md:-left-10 w-24 h-24 z-30 -rotate-12 drop-shadow-xl pointer-events-none transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[20deg]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* White Bubbly Background */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-white fill-current">
                      <path d="M50,5 C75,5 95,25 95,50 C95,75 70,95 40,95 C20,95 5,80 5,65 C5,45 25,5 50,5 Z" />
                    </svg>
                    <span className="relative z-10 text-primary font-black uppercase text-3xl">
                      HI!
                    </span>
                  </div>
                </div>
              )}

              {slot.sticker === 'letsgo' && (
                <div className="absolute -bottom-6 -left-4 w-40 h-20 z-30 rotate-6 drop-shadow-xl pointer-events-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                   <div className="relative w-full h-full flex items-center justify-center bg-[#141414] rounded-full border border-white/20 px-6 py-2">
                    <span className="text-white font-black uppercase tracking-widest text-lg">
                      Let's <span className="text-primary italic">GO!</span>
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