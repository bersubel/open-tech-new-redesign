import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. DATA SETUP (ACTUAL FILES)
// ==========================================
const longVideos = [
  { id: 'L1', src: '/check.mp4', title: 'Cinematic Campaign', client: 'Marvelous Real Estate' },
  { id: 'L2', src: '/check.mp4', title: 'Brand Anthem', client: 'Castel Beer' },
  { id: 'L3', src: '/check.mp4', title: 'Event Documentary', client: 'Horn Star Group' },
];

// Generate 13 Short Videos (/vd1.mp4 through /vd13.mp4)
const shortVideos = Array.from({ length: 13 }).map((_, i) => ({
  id: `S${i + 1}`,
  src: `/vd${i + 1}.mp4`, 
  title: `Digital Short ${(i + 1).toString().padStart(2, '0')}`,
  speed: Math.random() * 1.5 + 0.5 
}));

export default function WorkPage() {
  const containerRef = useRef(null);
  const horizontalTriggerRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  
  // Store refs for short videos to manage play/pause/color
  const shortVideoRefs = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ==========================================
    // 🖥️ DESKTOP ANIMATIONS (>= 768px)
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      
      // 1. HORIZONTAL SCROLL FOR LONG VIDEOS
      const totalWidth = horizontalScrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(horizontalScrollRef.current, {
        x: () => -(totalWidth - viewportWidth + 100), 
        ease: "none",
        scrollTrigger: {
          trigger: horizontalTriggerRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => "+=" + totalWidth, 
          invalidateOnRefresh: true,
        }
      });

      // 2. FRAGMENTED PARALLAX FOR SHORT VIDEOS
      gsap.utils.toArray('.parallax-short').forEach((card) => {
        const speed = parseFloat(card.dataset.speed);
        gsap.to(card, {
          y: () => -150 * speed, 
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    });

    // ==========================================
    // 📱 MOBILE ANIMATIONS (< 768px)
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      
      // 1. STICKY STACKING CARDS FOR LONG VIDEOS
      const mobileCards = gsap.utils.toArray('.mobile-long-card');
      
      mobileCards.forEach((card, i) => {
        if (i !== mobileCards.length - 1) { // Don't shrink the last card
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 15%", // When it hits near the top of the screen
              end: "bottom top", // As the next one covers it
              scrub: true,
              pin: true,
              pinSpacing: false // Allows the next card to overlap it
            }
          });
        }
      });

      // 2. VERY SUBTLE PARALLAX FOR MOBILE SHORTS
      gsap.utils.toArray('.parallax-short').forEach((card) => {
        gsap.to(card, {
          y: -30,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // ==========================================
  // 🧠 SMART PLAYBACK LOGIC (Mobile & Desktop)
  // ==========================================
  useEffect(() => {
    // MOBILE: Auto-play when in the center of the screen
    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target.querySelector('video');
          const badge = entry.target.querySelector('.playing-badge');
          
          if (entry.isIntersecting) {
            // Video is in the middle of the phone screen
            video.style.filter = "grayscale(0%)";
            video.style.transform = "scale(1.05)";
            badge.style.opacity = "1";
            video.play().catch(() => {});
          } else {
            // Video has scrolled away
            video.style.filter = "grayscale(100%)";
            video.style.transform = "scale(1)";
            badge.style.opacity = "0";
            video.pause();
          }
        });
      }, {
        rootMargin: "-30% 0px -30% 0px", // Only triggers in the middle 40% of the screen
        threshold: 0.1
      });

      shortVideoRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }
  }, []);

  // DESKTOP: Hover to play
  const handleMouseEnter = (e) => {
    if (window.innerWidth >= 768) {
      const video = e.currentTarget.querySelector('video');
      const badge = e.currentTarget.querySelector('.playing-badge');
      if (video) {
        video.style.filter = "grayscale(0%)";
        video.style.transform = "scale(1.05)";
        badge.style.opacity = "1";
        video.play();
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (window.innerWidth >= 768) {
      const video = e.currentTarget.querySelector('video');
      const badge = e.currentTarget.querySelector('.playing-badge');
      if (video) {
        video.style.filter = "grayscale(100%)";
        video.style.transform = "scale(1)";
        badge.style.opacity = "0";
        video.pause();
      }
    }
  };

  return (
    <main ref={containerRef} className="relative w-full bg-black text-white overflow-hidden pb-32">
      
      {/* 🌟 SAFE GRADIENT BACKGROUND */}
      <div className="absolute top-[100vh] left-1/2 -translate-x-1/2 w-[100vw] h-[200vh] bg-primary rounded-[100%] mix-blend-screen filter blur-[300px] opacity-[0.08] pointer-events-none" />

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center pt-24 px-6 z-10">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.9] text-center">
          Selected <span className="text-primary italic font-serif font-normal lowercase">Works.</span>
        </h1>
        <p className="mt-6 text-gray-400 max-w-xl text-center md:text-lg font-medium tracking-widest uppercase text-xs">
          Scroll to explore the archive
        </p>
      </section>

      {/* ==========================================
          LONG VIDEOS (Horizontal on Desktop, Sticky Stack on Mobile)
      ========================================== */}
      
      {/* DESKTOP VIEW (Hidden on Mobile) */}
      <section ref={horizontalTriggerRef} className="hidden md:flex relative w-full h-screen items-center bg-black z-20">
        <div ref={horizontalScrollRef} className="flex flex-row items-center gap-24 px-[10vw] w-max">
          {longVideos.map((video, index) => (
            <div key={`desktop-${video.id}`} className="relative w-[70vw] lg:w-[60vw] aspect-video rounded-3xl overflow-hidden bg-[#111] shadow-2xl flex-shrink-0">
              <video src={video.src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-12 left-12 flex flex-col pointer-events-none">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">0{index + 1} // {video.client}</span>
                <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">{video.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE VIEW (Sticky Stack, Hidden on Desktop) */}
      <section className="md:hidden relative w-full flex flex-col items-center px-4 pt-10 z-20">
        {longVideos.map((video, index) => (
          <div key={`mobile-${video.id}`} className="mobile-long-card relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#111] shadow-2xl mb-12">
            <video src={video.src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-6 flex flex-col pointer-events-none">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">0{index + 1} // {video.client}</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">{video.title}</h2>
            </div>
          </div>
        ))}
      </section>

      {/* ==========================================
          FRAGMENTED PARALLAX: SHORT VIDEOS
      ========================================== */}
      <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-12 mt-20 md:mt-64 z-20">
        
        <div className="flex flex-col items-center justify-center mb-16 md:mb-40">
          <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-primary mb-6 md:mb-8" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center">Digital Shorts</h2>
          <p className="text-gray-400 mt-2 text-[10px] md:text-sm uppercase tracking-widest font-bold text-center">
            {window.innerWidth < 768 ? "Scroll to play" : "Hover to play"}
          </p>
        </div>

        {/* Masonry Grid Setup */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 items-start">
          {shortVideos.map((video, index) => {
            
            // Fragmented margin logic for desktop and mobile
            const marginTopClass = 
              index % 4 === 0 ? "mt-0" : 
              index % 4 === 1 ? "mt-12 md:mt-24" : 
              index % 4 === 2 ? "mt-6 md:mt-12" : "mt-16 md:mt-32";

            return (
              <div 
                key={video.id} 
                ref={el => shortVideoRefs.current[index] = el}
                data-speed={video.speed}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`parallax-short relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] shadow-xl cursor-pointer ${marginTopClass}`}
              >
                {/* Bulletproof Video styling via JS */}
                <video 
                  src={video.src}
                  loop
                  muted
                  playsInline
                  style={{ filter: 'grayscale(100%)', transition: 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

                {/* The "Instructive" Playing Tag */}
                <div 
                  className="playing-badge absolute top-4 right-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest px-3 py-1 rounded-full pointer-events-none"
                  style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                >
                  Playing
                </div>

                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 pointer-events-none">
                  <h3 className="text-white font-black text-lg md:text-2xl uppercase tracking-tighter leading-none drop-shadow-md">
                    {video.title.split(' ').map((word, i) => <div key={i}>{word}</div>)}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}