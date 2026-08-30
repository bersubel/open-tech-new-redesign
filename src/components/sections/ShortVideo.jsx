import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const initialCards = [
  { id: 1, src: '/v1.mp4', label: 'project one', sticker: '🚀' },
  { id: 2, src: '/v2.mp4', label: 'project two', sticker: '🔥' },
  { id: 3, src: '/v3.mp4', label: 'project three', sticker: '💡' },
  { id: 4, src: '/v4.mp4', label: 'project four', sticker: '⚡' },
];

export default function ShortVideo() {
  const sectionRef = useRef(null);
  const bgContainerRef = useRef(null);
  const introTextRef = useRef(null);
  const cardStackRef = useRef(null);
  
  const videoRefs = useRef({});
  
  const [cards, setCards] = useState(initialCards);
  const [isMuted, setIsMuted] = useState(false); 
  const [isInView, setIsInView] = useState(false); 

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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "center center", 
        end: "+=300%", 
      }
    });

    tl.to(bgContainerRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut",
      duration: 1
    }, 0);

    tl.to(introTextRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.5
    }, 0);

    tl.fromTo(cardStackRef.current, 
      { opacity: 0, y: 150 }, 
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, 
      0.8 
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
    e.stopPropagation(); // Prevents dragging when clicking the button
    setIsMuted(prev => !prev); // Reliably toggles the previous state
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
              
              const rotation = index === 0 ? 0 : index === 1 ? 6 : index === 2 ? -6 : 12;
              const xOffset = index === 0 ? 0 : index === 1 ? 60 : index === 2 ? -60 : 120;
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
                    className="absolute inset-0 w-full h-full object-cover bg-black-soft pointer-events-none"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* FIXED MUTE BUTTON: Removed the onClick handler that was causing the double-fire issue */}
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
        
        <p className="text-gray-light font-medium tracking-widest uppercase text-xs mt-12 animate-pulse">
          Drag to shuffle
        </p>
      </div>

    </section>
  );
}