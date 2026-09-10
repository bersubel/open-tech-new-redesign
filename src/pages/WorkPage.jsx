import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. DATA SETUP
// ==========================================

// SECTION 1: Documentaries & Ads
const longVideos = [
  { id: 'L1', src: '/check.mp4', title: 'Cinematic Campaign', client: 'Marvelous Real Estate' },
  { id: 'L2', src: '/check.mp4', title: 'Brand Anthem', client: 'Castel Beer' },
  { id: 'L3', src: '/check.mp4', title: 'Event Documentary', client: 'Horn Star Group' },
];

// SECTION 2: Short Videos (All 13 Added!)
const shortVideos = [
  { id: 'S1', src: '/vd1.mp4', speed: 0.8 },
  { id: 'S2', src: '/vd2.mp4', speed: 1.2 },
  { id: 'S3', src: '/vd3.mp4', speed: 0.9 },
  { id: 'S4', src: '/vd4.mp4', speed: 1.1 },
  { id: 'S5', src: '/vd5.mp4', speed: 1.3 },
  { id: 'S6', src: '/vd6.mp4', speed: 0.7 },
  { id: 'S7', src: '/vd7.mp4', speed: 1.0 },
  { id: 'S8', src: '/vd8.mp4', speed: 1.4 },
  { id: 'S9', src: '/vd9.mp4', speed: 0.9 },
  { id: 'S10', src: '/vd10.mp4', speed: 1.2 },
  { id: 'S11', src: '/vd11.mp4', speed: 0.8 },
  { id: 'S12', src: '/vd12.mp4', speed: 1.1 },
  { id: 'S13', src: '/vd13.mp4', speed: 1.0 },
];

// SECTION 3: Brand Identity (Actual T-Series Client Logos)
const brandIdentityWorks = [
  { id: 'B1', client: 'Heal Venture', desc: 'Complete visual identity overhaul and brand strategy.', img: '/T15.png', color: '#00A896' },
  { id: 'B2', client: 'Kebena House', desc: 'Boutique hospitality branding and packaging design.', img: '/T2.png', color: '#D4AF37' },
  { id: 'B3', client: 'WoW Chocolate', desc: 'FMCG packaging, typography, and market positioning.', img: '/T0.png', color: '#E07A5F' },
  { id: 'B4', client: 'Eltex Textile', desc: 'Corporate rebrand and industrial visual guidelines.', img: '/T9.png', color: '#3D5A80' },
];

// SECTION 4: Websites (Actual T-Series Client Logos)
const websiteWorks = [
  { id: 'W1', client: 'Marvelous Real Estate', type: 'Luxury Property Portal', img: '/T6.png' },
  { id: 'W2', client: 'Lucid Dental Clinic', type: 'Healthcare Digital Experience', img: '/T11.png' },
  { id: 'W3', client: '2Brothers Food Complex', type: 'E-Commerce Architecture', img: '/T12.png' },
];

// ==========================================
// Reusable Section Title Component
// ==========================================
const SectionTitle = ({ subtitle, mainTitle, highlight }) => (
  <div className="flex flex-col items-center justify-center text-center w-full px-4 mb-12 md:mb-24 z-20 relative">
    <div className="flex items-center gap-4 mb-4 md:mb-6">
      <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent to-primary" />
      <span className="text-primary text-[10px] md:text-sm font-black uppercase tracking-[0.3em]">
        {subtitle}
      </span>
      <div className="w-8 md:w-16 h-px bg-gradient-to-l from-transparent to-primary" />
    </div>
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
      {mainTitle} <br className="md:hidden" />
      <span className="text-primary italic font-serif font-normal lowercase">{highlight}</span>
    </h2>
  </div>
);

export default function WorkPage() {
  const containerRef = useRef(null);
  const horizontalTriggerRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const shortVideoRefs = useRef([]);
  
  // 💡 State now tracks BOTH long videos and short videos for mute toggling
  const [mutedStates, setMutedStates] = useState({
    ...longVideos.reduce((acc, video) => ({ ...acc, [video.id]: true }), {}),
    ...shortVideos.reduce((acc, video) => ({ ...acc, [video.id]: true }), {})
  });

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ==========================================
    // 🖥️ DESKTOP ANIMATIONS (>= 768px)
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      
      // 1. DOCS & ADS: Horizontal Scroll
      if (horizontalScrollRef.current) {
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
      }

      // 2. FRAGMENTED PARALLAX FOR SHORTS
      gsap.utils.toArray('.parallax-short').forEach((card) => {
        const speed = parseFloat(card.dataset.speed);
        gsap.to(card, {
          y: () => -150 * speed, 
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

      // 3. WEBSITES: 3D Stacking Scroll Effect
      const websiteCards = gsap.utils.toArray('.website-stack-card');
      websiteCards.forEach((card, i) => {
        if (i !== websiteCards.length - 1) { 
          gsap.to(card, {
            scale: 0.85, y: 50, opacity: 0.4, filter: 'blur(10px)', ease: "none",
            scrollTrigger: { trigger: card, start: "top 10%", end: "bottom top", scrub: true, pin: true, pinSpacing: false }
          });
        }
      });
    });

    // ==========================================
    // 📱 MOBILE ANIMATIONS (< 768px)
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      
      // 1. DOCS & ADS: Sticky Stacking Long Videos
      const mobileCards = gsap.utils.toArray('.mobile-long-card');
      mobileCards.forEach((card, i) => {
        if (i !== mobileCards.length - 1) { 
          gsap.to(card, {
            scale: 0.9, opacity: 0.5, ease: "none",
            scrollTrigger: { trigger: card, start: "top 15%", end: "bottom top", scrub: true, pin: true, pinSpacing: false }
          });
        }
      });

      // 2. BRAND IDENTITY: Horizontal Pinned Scroll
      const mobileBrandTrack = document.querySelector('.mobile-brand-track');
      if (mobileBrandTrack) {
        const getScrollAmount = () => mobileBrandTrack.scrollWidth - window.innerWidth + 32;
        gsap.to(mobileBrandTrack, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: '.mobile-brand-section',
            pin: true,
            scrub: 1,
            start: "center center",
            end: () => "+=" + getScrollAmount(),
            invalidateOnRefresh: true,
          }
        });
      }

      // 3. SHORTS: Subtle Parallax
      gsap.utils.toArray('.parallax-short').forEach((card) => {
        gsap.to(card, { y: -30, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // 4. WEBSITES: Mobile Stacking
      const webCardsMobile = gsap.utils.toArray('.website-stack-card');
      webCardsMobile.forEach((card, i) => {
        if (i !== webCardsMobile.length - 1) { 
          gsap.to(card, {
            scale: 0.9, opacity: 0.5, ease: "none",
            scrollTrigger: { trigger: card, start: "top 15%", end: "bottom top", scrub: true, pin: true, pinSpacing: false }
          });
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Playback & Mute Logic for Short Videos
  useEffect(() => {
    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target.querySelector('video');
          if (entry.isIntersecting) {
            video.style.filter = "grayscale(0%)";
            video.style.transform = "scale(1.05)";
            video.play().catch(() => {});
          } else {
            video.style.filter = "grayscale(100%)";
            video.style.transform = "scale(1)";
            video.pause();
          }
        });
      }, { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 });

      shortVideoRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
      return () => observer.disconnect();
    }
  }, []);

  const handleMouseEnter = (e) => {
    if (window.innerWidth >= 768) {
      const video = e.currentTarget.querySelector('video');
      if (video) {
        video.style.filter = "grayscale(0%)";
        video.style.transform = "scale(1.05)";
        video.play();
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (window.innerWidth >= 768) {
      const video = e.currentTarget.querySelector('video');
      if (video) {
        video.style.filter = "grayscale(100%)";
        video.style.transform = "scale(1)";
        video.pause();
      }
    }
  };

  const toggleMute = (e, id) => {
    e.stopPropagation();
    setMutedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main ref={containerRef} className="relative w-full bg-black text-white overflow-hidden pb-32">
      
      <div className="absolute top-[50vh] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-primary rounded-[100%] mix-blend-screen filter blur-[300px] opacity-[0.08] pointer-events-none" />

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
          SECTION 1: DOCUMENTARIES & ADS
      ========================================== */}
      <SectionTitle subtitle="Cinematic Production" mainTitle="Documentaries" highlight="& Ads." />

      {/* 🖥️ Long Videos Desktop */}
      <section ref={horizontalTriggerRef} className="hidden md:flex relative w-full h-screen items-center bg-black z-20 mb-32">
        <div ref={horizontalScrollRef} className="flex flex-row items-center gap-24 px-[10vw] w-max">
          {longVideos.map((video, index) => {
            const isMuted = mutedStates[video.id];
            
            return (
              <div key={`desktop-${video.id}`} className="relative w-[70vw] lg:w-[60vw] aspect-video rounded-3xl overflow-hidden bg-[#111] shadow-2xl flex-shrink-0 group">
                <video src={video.src} autoPlay loop muted={isMuted} playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                {/* 💡 Mute Toggle Button */}
                <button 
                  onClick={(e) => toggleMute(e, video.id)} 
                  className="absolute top-6 right-6 md:top-8 md:right-8 z-30 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300 opacity-0 group-hover:opacity-100"
                >
                  {isMuted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  )}
                </button>

                <div className="absolute bottom-12 left-12 flex flex-col pointer-events-none">
                  <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">0{index + 1} // {video.client}</span>
                  <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none drop-shadow-lg">{video.title}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📱 Long Videos Mobile */}
      <section className="md:hidden relative w-full flex flex-col items-center px-4 z-20 mb-20">
        {longVideos.map((video, index) => {
          const isMuted = mutedStates[video.id];
          
          return (
            <div key={`mobile-${video.id}`} className="mobile-long-card relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#111] shadow-2xl mb-12">
              <video src={video.src} autoPlay loop muted={isMuted} playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              
              {/* 💡 Mute Toggle Button */}
              <button 
                onClick={(e) => toggleMute(e, video.id)} 
                className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300"
              >
                {isMuted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                )}
              </button>

              <div className="absolute bottom-8 left-6 flex flex-col pointer-events-none">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">0{index + 1} // {video.client}</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none drop-shadow-lg">{video.title}</h2>
              </div>
            </div>
          );
        })}
      </section>

      {/* ==========================================
          SECTION 2: DIGITAL SHORTS
      ========================================== */}
      <SectionTitle subtitle={window.innerWidth < 768 ? "Scroll to play" : "Hover to play"} mainTitle="Digital" highlight="Shorts." />

      <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-12 mb-40 z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 items-start">
          {shortVideos.map((video, index) => {
            const marginTopClass = index % 4 === 0 ? "mt-0" : index % 4 === 1 ? "mt-12 md:mt-24" : index % 4 === 2 ? "mt-6 md:mt-12" : "mt-16 md:mt-32";
            const isMuted = mutedStates[video.id];

            return (
              <div 
                key={video.id} 
                ref={el => shortVideoRefs.current[index] = el}
                data-speed={video.speed}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`parallax-short relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] shadow-xl cursor-pointer ${marginTopClass}`}
              >
                <video src={video.src} loop muted={isMuted} playsInline style={{ filter: 'grayscale(100%)', transition: 'all 0.5s' }} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                
                <button onClick={(e) => toggleMute(e, video.id)} className="absolute top-3 right-3 md:top-4 md:right-4 z-30 w-8 h-8 md:w-10 md:h-10 bg-black/40 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300">
                  {isMuted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          SECTION 3: BRAND IDENTITY
      ========================================== */}
      <SectionTitle subtitle="Visual Strategy & Positioning" mainTitle="Brand" highlight="Identity." />

      <section className="mobile-brand-section relative w-full max-w-[1600px] mx-auto px-4 md:px-12 pb-20 z-20">
        
        <p className="hidden md:block text-primary text-xs uppercase tracking-widest font-bold animate-pulse text-right mb-4">
          Hover to expand ⟶
        </p>

        {/* Desktop: Masterpiece Hover Accordion */}
        <div className="hidden md:flex w-full h-[70vh] gap-6">
          {brandIdentityWorks.map((work, index) => (
            <div 
              key={work.id} 
              className="group relative flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-pointer h-full"
            >
              <div className="absolute inset-0 bg-[#151515] group-hover:bg-[#1a1a1a] transition-colors duration-700" />
              <img src={work.img} alt={work.client} className="absolute inset-0 w-full h-full object-contain p-12 lg:p-20 opacity-30 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                <h3 
                  className="text-2xl lg:text-3xl font-black uppercase tracking-[0.2em] text-white/40 whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {work.client}
                </h3>
              </div>

              <div className="absolute bottom-10 left-10 flex flex-col pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: work.color, backgroundColor: work.color }} />
                  <span className="text-white/80 font-bold tracking-widest uppercase text-xs">0{index + 1}</span>
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                  {work.client}
                </h3>
                <p className="text-gray-300 font-medium text-sm max-w-xs">
                  {work.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Pinned Horizontal Scrolling Track */}
        <div className="md:hidden w-full overflow-hidden">
          <div className="mobile-brand-track flex items-center gap-4 w-max">
            {brandIdentityWorks.map((work, index) => (
              <div key={`mobile-${work.id}`} className="relative w-[85vw] h-[60vh] rounded-3xl overflow-hidden bg-[#151515] border border-white/5 flex-shrink-0">
                <img src={work.img} alt={work.client} className="absolute inset-0 w-full h-full object-contain p-10 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                
                <div className="absolute bottom-8 left-6 flex flex-col pointer-events-none">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: work.color }} />
                    <span className="text-white/80 font-bold tracking-widest uppercase text-xs">0{index + 1}</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
                    {work.client}
                  </h3>
                  <p className="text-gray-400 font-medium text-xs max-w-[200px]">
                    {work.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: WEBSITES
      ========================================== */}
      <section className="relative w-full bg-[#F4F3EE] text-black mt-32 pt-24 pb-24 md:pt-40 md:pb-40 rounded-t-[3rem] md:rounded-t-[5rem] z-20">
        
        <SectionTitle subtitle="High-Performance E-Commerce & Web" mainTitle="Digital" highlight="Experiences." />

        <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-12 flex flex-col items-center mt-12 md:mt-24">
          {websiteWorks.map((work, index) => (
            <div 
              key={work.id} 
              className="website-stack-card relative w-full aspect-[4/5] md:aspect-video rounded-3xl md:rounded-[2rem] overflow-hidden bg-gradient-to-br from-white to-gray-200 shadow-2xl border border-black/5 mb-16 md:mb-24 last:mb-0 group cursor-pointer"
            >
              <img src={work.img} alt={work.client} className="absolute inset-0 w-full h-full object-contain p-12 md:p-24 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-white pointer-events-none">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full mb-3 md:mb-4">
                  {work.type}
                </span>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-lg">
                  {work.client}
                </h3>
              </div>
              
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-xl">
                <svg className="w-5 h-5 md:w-6 md:h-6 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}