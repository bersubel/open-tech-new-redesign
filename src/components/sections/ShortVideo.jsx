import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ⬅️ React Router added
import { triggerLogoRain } from '../../utils/logoRain'; // ⬅️ Cinematic transition added

gsap.registerPlugin(ScrollTrigger);

// 🎬 UPDATED DATA: Exactly 6 videos loaded seamlessly
const initialCards = [
  { id: 1, src: '/vd1.mp4', label: 'project one', sticker: '🚀' },
  { id: 2, src: '/vd2.mp4', label: 'project two', sticker: '🔥' },
  { id: 3, src: '/vd3.mp4', label: 'project three', sticker: '💡' },
  { id: 4, src: '/vd4.mp4', label: 'project four', sticker: '⚡' },
  { id: 5, src: '/vd5.mp4', label: 'project five', sticker: '🎬' },
  { id: 6, src: '/vd6.mp4', label: 'project six', sticker: '✨' },
];

export default function ShortVideo() {
  const sectionRef = useRef(null);
  const bgContainerRef = useRef(null);
  const introTextRef = useRef(null);
  const cardStackRef = useRef(null);
  const moreBtnRef = useRef(null); 
  
  const videoRefs = useRef({});
  
  const [cards, setCards] = useState(initialCards);
  const [isMuted, setIsMuted] = useState(false); 
  const [isInView, setIsInView] = useState(false); 

  const navigate = useNavigate(); // ⬅️ Initialize navigation

  // --- 1. INTERSECTION OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- 2. THE SMART PLAY/PAUSE LOGIC ---
  useEffect(() => {
    cards.forEach((card, index) => {
      const videoEl = videoRefs.current[card.id];
      if (videoEl) {
        if (index === 0 && isInView) {
          videoEl.muted = isMuted; 
          videoEl.play().catch(e => console.log("Autoplay blocked by browser until user interaction.", e));
        } else {
          videoEl.muted = true;
          videoEl.pause();
        }
      }
    });
  }, [cards, isInView, isMuted]); 

  // --- 3. GSAP SCROLL ANIMATION ---
  useGSAP(() => {
    // Hide the drawing arrow initially
    gsap.set('.more-arrow-path', { strokeDasharray: 300, strokeDashoffset: 300 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "center center", 
        end: "+=300%", 
      }
    });

    // 1. Expand Background
    tl.to(bgContainerRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut",
      duration: 1
    }, 0);

    // 2. Hide Intro Text
    tl.to(introTextRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.5
    }, 0);

    // 3. Bring up the Card Stack
    tl.fromTo(cardStackRef.current, 
      { opacity: 0, y: 150 }, 
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, 
      0.8 
    );

    // 4. Draw the dynamic arrow swooping down
    tl.to('.more-arrow-path', {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 1.4); // Starts exactly as the deck is settling into place

    // 5. Pop in the Premium Button
    tl.fromTo(moreBtnRef.current,
      { opacity: 0, scale: 0.5, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.8)" },
      1.8 // Bounces in right as the arrow finishes drawing
    );

    return () => tl.kill();
  }, { scope: sectionRef });

  // --- 4. DRAG LOGIC ---
  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const frontCard = newCards.shift(); 
        newCards.push(frontCard); 
        return newCards;
      });
    }
  };

  // Toggle mute function
  const toggleMute = (e) => {
    e.stopPropagation(); 
    setIsMuted(prev => !prev); 
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      
      <div 
        ref={bgContainerRef} 
        className="absolute w-[80vw] md:w-[50vw] h-[50vh] md:h-[60vh] rounded-[40px] overflow-hidden group cursor-pointer"
      >
        <video 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
      </div>

      <div 
        ref={introTextRef} 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      >
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary text-black flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,178,26,0.3)]">
          <span className="font-black uppercase tracking-widest text-xs md:text-sm ml-1">Play</span>
        </div>
        <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl">
          Swipe <span className="text-primary italic font-serif font-normal">Our Work</span>
        </h2>
      </div>

      <div 
        ref={cardStackRef}
        className="relative z-20 flex flex-col items-center justify-center w-full h-full opacity-0 pointer-events-auto"
      >
        <div className="relative w-[280px] h-[500px] md:w-[320px] md:h-[570px] mt-10">
          <AnimatePresence>
            {cards.map((card, index) => {
              const isFront = index === 0;
              
              // 📐 DYNAMIC MATH FOR 6 CARDS: Perfectly alternates left/right with increasing depth
              const rotation = index === 0 ? 0 : index === 1 ? 5 : index === 2 ? -5 : index === 3 ? 10 : index === 4 ? -10 : 15;
              const xOffset = index === 0 ? 0 : index === 1 ? 50 : index === 2 ? -50 : index === 3 ? 100 : index === 4 ? -100 : 150;
              const scale = 1 - (index * 0.05);
              const zIndex = cards.length - index;

              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    rotate: rotation, 
                    x: xOffset, 
                    scale: scale,
                    opacity: 1 - (index * 0.15) 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{ zIndex }}
                  drag={isFront ? "x" : false} 
                  dragConstraints={{ left: 0, right: 0 }} 
                  onDragEnd={isFront ? handleDragEnd : undefined}
                  className={`absolute top-0 left-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-2 
                    ${isFront ? 'border-primary cursor-grab active:cursor-grabbing' : 'border-white/10'}
                  `}
                >
                  <video 
                    ref={el => videoRefs.current[card.id] = el}
                    src={card.src}
                    loop 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover bg-black pointer-events-none"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                  
                  <div 
                    onPointerDownCapture={toggleMute}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-primary hover:text-black transition-colors duration-300"
                  >
                    {isMuted ? (
                      <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                    <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                      {card.label}
                    </h3>
                    
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                      <span className="text-2xl">{card.sticker}</span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <p className="text-gray-400 font-medium tracking-widest uppercase text-xs mt-12 animate-pulse">
          Drag to shuffle
        </p>
      </div>

      {/* 🚀 NEW: THE "MORE OF OUR WORKS" ANIMATED BUTTON & ARROW */}
      <div className="absolute bottom-10 right-6 md:bottom-16 md:right-16 z-30 flex flex-col items-center md:items-end pointer-events-none">
        
        {/* The Animated Arrow (Hidden on mobile to save space) */}
        <div className="hidden md:block w-24 h-24 mb-2 mr-12">
          <svg viewBox="0 0 150 150" className="w-full h-full text-primary drop-shadow-[0_0_15px_rgba(245,178,26,0.5)]">
            {/* The swooping line */}
            <path className="more-arrow-path" d="M20,20 C 20,80 60,130 120,130" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* The arrowhead */}
            <path className="more-arrow-path" d="M 100,110 L 125,130 L 100,150" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 🚀 ROUTED BUTTON: Intercepts click, drops rain, navigates to /works */}
        <a
          ref={moreBtnRef}
          href="/works"
          onClick={(e) => {
            e.preventDefault();
            triggerLogoRain(() => {
              navigate('/works');
              window.scrollTo(0, 0);
            });
          }}
          className="group relative pointer-events-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 md:px-8 md:py-4 rounded-full overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(245,178,26,0.3)] hover:scale-105"
        >
          {/* Expanding Primary Color Fill */}
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></div>
          
          <span className="relative z-10 font-bold uppercase tracking-widest text-xs md:text-sm text-white group-hover:text-black transition-colors duration-300">
            More of our works
          </span>
          
          <span className="relative z-10 w-5 h-5 flex items-center justify-center text-white group-hover:text-black transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1 group-hover:-rotate-45">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>
      </div>

    </section>
  );
}