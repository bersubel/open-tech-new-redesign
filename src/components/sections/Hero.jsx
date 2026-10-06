import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(true); 
  
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);
  
  const textLoadRef = useRef(null);
  const textScrollRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. INITIAL ENTRY ANIMATION
    gsap.fromTo(textLoadRef.current, 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
    );

    // 2. SCROLL ANIMATION (Smooth Parallax, No Pinning)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top", // Animation plays exactly as the section scrolls out of view
          pin: false, // 💡 UNPINNED: The section will naturally scroll up immediately
          scrub: 1, // Smooth, fluid tracking
        }
      });

      // Video gets pushed down slightly (parallax) and fades as you scroll up
      tl.to(videoWrapperRef.current, { 
        y: 150, 
        scale: 0.95, 
        opacity: 0, 
        ease: "none" 
      }, 0)
      // Text floats up faster than the scroll for a lightweight feel
      .to(textScrollRef.current, { 
        y: -150, 
        opacity: 0, 
        ease: "none" 
      }, 0); 
    });

    return () => mm.revert();
  }, { scope: sectionRef });

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
      // 💡 ADDED: rounded-b-[3rem] md:rounded-b-[5rem] for the smooth curved bottom edge
      // 💡 ADDED: shadow-2xl to give it a slight pop over the section underneath it
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl z-20"
    >
      {/* 1. BACKGROUND VIDEO */}
      <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full z-0 origin-top">
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

      {/* 2. TYPOGRAPHY */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-13 md:justify-center md:pb-0 md:pt-[50vh] pointer-events-none px-4">
        <div ref={textScrollRef} className="max-w-5xl mx-auto text-center">
          <div ref={textLoadRef} className="opacity-0">
            <h1 className="text-white text-5xl md:text-[7vw] leading-[1.1] md:leading-[1.05] font-black tracking-tighter">
              Empowering <span className="font-serif italic font-normal px-2">brands</span> <br />
              through <span className="relative inline-block text-primary">
                open solutions
                <svg className="absolute w-[110%] h-auto -left-[5%] -bottom-2 md:-bottom-4 text-white" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 15C50 4 150 -5 298 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* 3. MOBILE FIXED UNMUTE BUTTON */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleAudio();
        }}
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

      {/* 4. DESKTOP FLOATING UNMUTE STICKER */}
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
            exit={{ scale: 0, opacity: 0}}
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