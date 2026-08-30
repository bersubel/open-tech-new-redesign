import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(true); // Tracks if the section is on screen
  
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // --- 1. INTERSECTION OBSERVER (Tracks scroll position) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Triggers when less than 10% of Hero is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- 2. SMART MUTE LOGIC ---
  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        // If they are looking at the Hero, respect their custom mute toggle
        videoRef.current.muted = isMuted;
      } else {
        // If they scrolled away, FORCE MUTE the audio
        videoRef.current.muted = true;
      }
    }
  }, [isInView, isMuted]);

  // Track the mouse coordinates to move the custom sticker
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Toggle the video audio on click
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
          // Removed the hardcoded muted prop here so our useEffect can control it
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* Pointing to your local video file in the public/ folder */}
          <source src="/check.mp4" type="video/mp4" />
        </video>
        {/* Subtle vignette to make the text pop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      {/* 2. LOWERED TYPOGRAPHY */}
      {/* CHANGED: pt-[25vh] is now pt-[50vh] to push the text lower down the screen */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[50vh] pointer-events-none px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white text-5xl md:text-[7vw] leading-[1.1] md:leading-[1.05] font-black tracking-tighter">
            we engineer <span className="font-serif italic font-normal px-2">Software</span> <br />
            for the <span className="relative inline-block text-primary">
              enterprise
              {/* The thin scribble line */}
              <svg className="absolute w-[110%] h-auto -left-[5%] -bottom-2 md:-bottom-4 text-white" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 15C50 4 150 -5 298 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
        </div>
      </div>

      {/* 3. FLOATING UNMUTE STICKER */}
      <AnimatePresence>
        {isHovering && (
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
            {/* Clean 8-point star SVG */}
            <svg className="absolute inset-0 w-full h-full text-primary drop-shadow-xl" viewBox="0 0 512 512" fill="currentColor" preserveAspectRatio="xMidYMid meet">
              <path d="M256 0l54.8 141.4L452.5 90.6 371 228 512 256l-141 28 81.5 137.4-141.7-54.8L256 512l-54.8-141.4-141.7 54.8L141 284 0 256l141-28-81.5-137.4L201.2 145.2 256 0z" />
            </svg>

            {/* The Audio Icon (Swaps based on mute state) */}
            <div className="relative z-10 text-black">
              {isMuted ? (
                // Muted Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                // Playing Icon
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