import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(true); 
  
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.muted = isMuted;
      } else {
        videoRef.current.muted = true;
      }
    }
  }, [isInView, isMuted]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const toggleAudio = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={toggleAudio}
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer"
    >
      {/* 1. BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/check.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      {/* 2. LOWERED TYPOGRAPHY */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-13 md:justify-center md:pb-0 md:pt-[50vh] pointer-events-none px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white text-5xl md:text-[7vw] leading-[1.1] md:leading-[1.05] font-black tracking-tighter">
            we engineer <span className="font-serif italic font-normal px-2">Software</span> <br />
            for the <span className="relative inline-block text-primary">
              enterprise
              <svg className="absolute w-[110%] h-auto -left-[5%] -bottom-2 md:-bottom-4 text-white" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 15C50 4 150 -5 298 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
        </div>
      </div>

      {/* 3. MOBILE FIXED UNMUTE BUTTON (Hidden on Desktop) */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering the section background click twice
          toggleAudio();
        }}
        // Positioned exactly where your red circle is (bottom-36 left-4)
        className="absolute z-50 bottom-36 left-4 w-16 h-16 flex items-center justify-center md:hidden active:scale-95 transition-transform"
      >
        <svg className="absolute inset-0 w-full h-full text-primary drop-shadow-xl" viewBox="0 0 512 512" fill="currentColor" preserveAspectRatio="xMidYMid meet">
          <path d="M256 0l54.8 141.4L452.5 90.6 371 228 512 256l-141 28 81.5 137.4-141.7-54.8L256 512l-54.8-141.4-141.7 54.8L141 284 0 256l141-28-81.5-137.4L201.2 145.2 256 0z" />
        </svg>

        <div className="relative z-10 text-black">
          {isMuted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </div>
      </button>

      {/* 4. DESKTOP FLOATING UNMUTE STICKER (Hidden on Mobile) */}
      <AnimatePresence>
        {isHovering && window.innerWidth >= 768 && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 0,
              x: mousePos.x + 20, 
              y: mousePos.y + 20
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 28, 
              mass: 0.1,
              x: { type: "tween", ease: "linear", duration: 0 },
              y: { type: "tween", ease: "linear", duration: 0 }
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none w-20 h-20 flex items-center justify-center"
          >
            <svg className="absolute inset-0 w-full h-full text-primary drop-shadow-xl" viewBox="0 0 512 512" fill="currentColor" preserveAspectRatio="xMidYMid meet">
              <path d="M256 0l54.8 141.4L452.5 90.6 371 228 512 256l-141 28 81.5 137.4-141.7-54.8L256 512l-54.8-141.4-141.7 54.8L141 284 0 256l141-28-81.5-137.4L201.2 145.2 256 0z" />
            </svg>

            <div className="relative z-10 text-black">
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}