import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. DATA SETUP
// ==========================================

const longVideos = [
  { id: 'L1', ytId: 'GUy5vnK9WIA', title: 'Cinematic Campaign', client: 'OpenTechnology PLC' },
  { id: 'L2', ytId: '3UBn3keLpN0', title: 'Brand Anthem', client: 'Babogaya Resort' },
  { id: 'L3', ytId: 'vEicpuafeZ8', title: 'Event Documentary', client: 'Ziquala Real Estate' },
  { id: 'L4', ytId: '66OVzWQSZn8', title: 'Corporate Profile', client: '2Brothers Food Complex' },
  { id: 'L5', ytId: 'yC2a9CG5skI', title: 'Product Launch', client: 'Marvelous Real Estate' },
  { id: 'L6', ytId: 'Sy4h7GiBeiE', title: 'Real Estate Tour', client: 'Marvelous Real Estate' },
  { id: 'L7', ytId: 'VfRsy9xE0vU', title: 'Fashion Film', client: '2Brothers Food Complex' },
];

const shortVideos = [
  { id: 'S1', ytId: '4dg_cMvy-6s', speed: 0.8 }, { id: 'S2', ytId: 'vUgkfcfqjuo', speed: 1.2 },
  { id: 'S3', ytId: 'eOobC2byPlk', speed: 0.9 }, { id: 'S4', ytId: 'rEfZ16VWj_8', speed: 1.1 },
  { id: 'S5', ytId: '0aK1xp8B7x0', speed: 1.3 }, { id: 'S6', ytId: 'I2PxLDgNkZg', speed: 0.7 },
  { id: 'S7', ytId: 'o6dHzRh_D5E', speed: 1.0 }, { id: 'S8', ytId: 'Wl1mA7Jdxeg', speed: 1.4 },
  { id: 'S9', ytId: 'L5SZZshv43g', speed: 0.9 }, { id: 'S10', ytId: 'M3Luw3i6L_I', speed: 1.2 },
  { id: 'S11', ytId: 'wIxPmP11z-c', speed: 0.8 }, { id: 'S12', ytId: 'STQLqtCnQ9Y', speed: 1.1 },
  { id: 'S13', ytId: 'NFNOTWWUUzQ', speed: 1.0 }, { id: 'S14', ytId: 'n4-wbSl5qnY', speed: 0.9 },
  { id: 'S15', ytId: 'IYoz0u9EOlw', speed: 1.3 }, { id: 'S16', ytId: 'bASPSFB6edU', speed: 1.1 },
  { id: 'S17', ytId: 'r2fY6yzcBCE', speed: 0.8 }, { id: 'S18', ytId: 'wCHCvSZBJak', speed: 1.2 },
  { id: 'S19', ytId: 'OYL7gLGOMxo', speed: 1.0 }, { id: 'S20', ytId: 'HhdAf42HpDI', speed: 1.4 },
  { id: 'S21', ytId: 'eYI_PUoHcDY', speed: 0.9 }, { id: 'S22', ytId: 'FgQuQ3ixHsw', speed: 1.1 },
  { id: 'S23', ytId: 'M3Luw3i6L_I', speed: 1.2 },
];

const shortsTop = shortVideos.slice(0, 12);
const shortsBottom = shortVideos.slice(12, 23);
const landscapeHeroShort = { id: 'M1', ytId: 'riLsU9sI4mc', title: 'The Intermission', client: 'Special Feature' };

const brandIdentityWorks = [
  { id: 'B1', client: 'Marvelous Real Estate', desc: 'Complete visual identity overhaul and brand strategy.', img: '/brand1.png', color: '#00A896' },
  { id: 'B2', client: 'Horn Star Group', desc: 'Boutique hospitality branding and packaging design.', img: '/brand2.png', color: '#D4AF37' },
  { id: 'B3', client: 'WoW Chocolate', desc: 'FMCG packaging, typography, and market positioning.', img: '/brand3.png', color: '#E07A5F' },
  { id: 'B4', client: 'Eltex Textile', desc: 'Corporate rebrand and industrial visual guidelines.', img: '/brand4.png', color: '#3D5A80' },
];

const websiteWorks = [
  { id: 'W1', client: 'Marvelous Real Estate', type: 'Luxury Property Portal', img: '/T6.png' },
  { id: 'W2', client: 'Lucid Dental Clinic', type: 'Healthcare Digital Experience', img: '/T11.png' },
  { id: 'W3', client: '2Brothers Food Complex', type: 'E-Commerce Architecture', img: '/T12.png' },
];

const SectionTitle = ({ subtitle, mainTitle, highlight }) => (
  <div className="flex flex-col items-center justify-center text-center w-full px-4 mb-12 md:mb-24 z-20 relative">
    <div className="flex items-center gap-4 mb-4 md:mb-6">
      <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent to-primary" />
      <span className="text-primary text-[10px] md:text-sm font-black uppercase tracking-[0.3em]">{subtitle}</span>
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
  
  const [mutedStates, setMutedStates] = useState(() => {
    const states = {};
    longVideos.forEach(v => states[v.id] = true);
    shortVideos.forEach(v => states[v.id] = true);
    states[landscapeHeroShort.id] = true;
    return states;
  });

  // 🎬 ADVANCED PLAY/PAUSE CONTROLLER
  const playVideo = (wrapper) => {
    if (wrapper.classList.contains('yt-short-video')) {
      gsap.to(wrapper, { filter: 'grayscale(0%)', scale: 1.05, duration: 0.5, ease: "power3.out" });
    } else if (window.innerWidth >= 768) {
      gsap.to(wrapper, { filter: 'grayscale(0%)', duration: 0.5, ease: "power3.out" });
    }
    
    const iframe = wrapper.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
    }
  };

  const pauseVideo = (wrapper) => {
    if (wrapper.classList.contains('yt-short-video')) {
      gsap.to(wrapper, { filter: 'grayscale(100%)', scale: 1, duration: 0.5, ease: "power3.out" });
    } else if (window.innerWidth >= 768) {
      gsap.to(wrapper, { filter: 'grayscale(100%)', duration: 0.5, ease: "power3.out" });
    }

    const iframe = wrapper.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
    }
  };

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 🌟 1. DESKTOP ANIMATIONS
    mm.add("(min-width: 768px)", () => {
      // Horizontal Scroll for 7 Long Videos
      if (horizontalScrollRef.current && horizontalTriggerRef.current) {
        const totalWidth = horizontalScrollRef.current.scrollWidth;
        const scrollDistance = totalWidth - window.innerWidth;

        let horizontalTween = gsap.to(horizontalScrollRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalTriggerRef.current,
            pin: true,
            scrub: 1,
            start: "center center",
            end: () => "+=" + scrollDistance, 
            invalidateOnRefresh: true,
          }
        });

        gsap.utils.toArray('.desktop-long-card').forEach((wrapper) => {
          ScrollTrigger.create({
            trigger: wrapper,
            containerAnimation: horizontalTween,
            start: "left center",
            end: "right center",
            onEnter: () => playVideo(wrapper),
            onLeave: () => pauseVideo(wrapper),
            onEnterBack: () => playVideo(wrapper),
            onLeaveBack: () => pauseVideo(wrapper),
          });
        });
      }
    });

    // 🌟 2. MOBILE ANIMATIONS
    mm.add("(max-width: 767px)", () => {
      
      // 💡 THE ULTIMATE FULL-SCREEN PLATE STACK LOGIC
      const mobileLongWrappers = gsap.utils.toArray('.mobile-long-wrapper');
      
      mobileLongWrappers.forEach((wrapper, i) => {
        const card = wrapper.querySelector('.mobile-long-card');
        const nextWrapper = mobileLongWrappers[i + 1];

        // 1. Play/Pause Controller (Auto-plays only when this specific full-screen wrapper locks into view)
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 20%", // Triggers play when the wrapper is fully covering the screen
          endTrigger: nextWrapper || wrapper, 
          end: nextWrapper ? "top 20%" : "bottom 20%", // Pauses exactly when the NEXT plate covers the screen
          onEnter: () => playVideo(card),
          onLeave: () => pauseVideo(card),
          onEnterBack: () => playVideo(card),
          onLeaveBack: () => pauseVideo(card),
        });

        // 2. Shrink/Blur Plate Stacking Overlay Animation
        if (nextWrapper) { 
          gsap.to(card, {
            scale: 0.85, 
            opacity: 0.3, 
            filter: 'blur(10px)', 
            ease: "none",
            scrollTrigger: { 
              trigger: wrapper, 
              start: "top top", // Begins shrinking the moment this wrapper hits the top
              endTrigger: nextWrapper, 
              end: "top top", // Fully shrunk the exact moment the next wrapper perfectly overlaps it
              scrub: true 
            }
          });
        }
      });

      // Mobile Brand Reveal
      gsap.utils.toArray('.mobile-brand-card').forEach((card) => {
        gsap.from(card, {
          y: 80, opacity: 0, scale: 0.95, duration: 0.6,
          scrollTrigger: { trigger: card, start: "top 85%" }
        });
      });
    });

    // 🌟 3. UNIVERSAL ANIMATIONS (Runs on Mobile & Desktop)

    // INITIALIZE SHORTS TO BLACK & WHITE
    gsap.set('.yt-short-video', { filter: 'grayscale(100%)', scale: 1 });

    // 💡 CENTER-SCREEN LOGIC FOR SHORTS (Color bloom & Auto-Play)
    gsap.utils.toArray('.yt-short-video').forEach((wrapper) => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 60%",   
        end: "bottom 40%",  
        onEnter: () => playVideo(wrapper),
        onLeave: () => pauseVideo(wrapper),
        onEnterBack: () => playVideo(wrapper),
        onLeaveBack: () => pauseVideo(wrapper),
      });
    });

    // Shorts Parallax Float
    gsap.utils.toArray('.parallax-short').forEach((card) => {
      const speed = parseFloat(card.dataset.speed || 1);
      gsap.to(card, {
        y: () => window.innerWidth >= 768 ? -120 * speed : -40 * speed, 
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // Website Card CSS Stacking 
    gsap.utils.toArray('.website-stack-card').forEach((card, i, arr) => {
      if (i !== arr.length - 1) { 
        gsap.to(card, {
          scale: 0.9, opacity: 0.5, filter: 'blur(8px)', ease: "none",
          scrollTrigger: { trigger: card, start: "top 12%", end: "bottom top", scrub: true }
        });
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Desktop Hover Overrides
  const handleMouseEnter = (e) => { if (window.innerWidth >= 768) playVideo(e.currentTarget); };
  const handleMouseLeave = (e) => { if (window.innerWidth >= 768) pauseVideo(e.currentTarget); };

  const toggleMute = (e, id) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    const wrapper = btn.closest('.yt-wrapper');
    const iframe = wrapper.querySelector('iframe');
    
    setMutedStates(prev => {
      const isCurrentlyMuted = prev[id];
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: isCurrentlyMuted ? 'unMute' : 'mute' }), '*');
      }
      return { ...prev, [id]: !isCurrentlyMuted };
    });
  };

  const getYTUrl = (ytId) => `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&vq=hd1080&iv_load_policy=3`;

  const MuteButton = ({ isMuted, onClick }) => (
    <button onClick={onClick} className="absolute top-4 right-4 md:top-6 md:right-6 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300 pointer-events-auto">
      {isMuted ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
      )}
    </button>
  );

  return (
    <main ref={containerRef} className="relative w-full bg-black text-white overflow-clip pb-32">
      
      {/* Grayscale filter ONLY affects desktop elements */}
      <style>{`
        @media (min-width: 768px) {
          .grayscale-filter { filter: grayscale(100%); transition: filter 0.4s ease, transform 0.4s ease; }
        }
      `}</style>
      
      <div className="absolute top-[50vh] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-primary rounded-[100%] mix-blend-screen filter blur-[300px] opacity-[0.08] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center pt-24 px-6 z-10">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.9] text-center">
          Selected <span className="text-primary italic font-serif font-normal lowercase">Works.</span>
        </h1>
      </section>

      {/* ==========================================
          SECTION 1: 7 LONG VIDEOS 
      ========================================== */}
      <SectionTitle subtitle="Cinematic Production" mainTitle="Documentaries" highlight="& Ads." />

      {/* 🖥️ DESKTOP */}
      <section ref={horizontalTriggerRef} className="hidden md:flex relative w-full h-screen items-center bg-black z-20 mb-32 overflow-hidden">
        <div ref={horizontalScrollRef} className="flex flex-row items-center gap-16 px-[15vw] w-max h-full">
          {longVideos.map((video, index) => (
            <div key={video.id} className="yt-wrapper desktop-long-card grayscale-filter relative w-[70vw] aspect-video rounded-3xl overflow-hidden bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-shrink-0 isolate transform-gpu">
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-3xl isolate transform-gpu">
                <iframe src={getYTUrl(video.ytId)} loading="lazy" className="absolute top-1/2 left-1/2 w-full h-full scale-[1.18] -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-black" frameBorder="0" allow="autoplay; encrypted-media" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-transparent to-transparent pointer-events-none opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <MuteButton isMuted={mutedStates[video.id]} onClick={(e) => toggleMute(e, video.id)} />
              <div className="absolute bottom-10 left-10 flex flex-col pointer-events-none">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">0{index + 1} // {video.client}</span>
                <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none drop-shadow-lg">{video.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📱 MOBILE - 100VH FULL-SCREEN PLATE STACKING */}
      <section className="md:hidden relative w-full flex flex-col z-20 pb-[10vh]">
        {longVideos.map((video, index) => (
          <div 
            key={`mobile-${video.id}`} 
            // 💡 FULL SCREEN WRAPPER: This ensures exactly ONE video is visible at a time. The next video hides off-screen until you scroll a full 100vh down.
            className="mobile-long-wrapper sticky top-0 w-full h-[100vh] flex flex-col items-center justify-center px-4 isolate transform-gpu"
          >
            <div className="yt-wrapper mobile-long-card relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 isolate transform-gpu">
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[2.5rem] isolate transform-gpu">
                <iframe src={getYTUrl(video.ytId)} loading="lazy" className="absolute top-1/2 left-1/2 w-full h-full scale-[1.18] -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-black" frameBorder="0" allow="autoplay; encrypted-media" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-transparent to-transparent pointer-events-none opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <MuteButton isMuted={mutedStates[video.id]} onClick={(e) => toggleMute(e, video.id)} />
              <div className="absolute bottom-6 left-6 flex flex-col pointer-events-none">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">0{index + 1} // {video.client}</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none drop-shadow-lg">{video.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ==========================================
          SECTION 2: DIGITAL SHORTS
      ========================================== */}
      <SectionTitle subtitle={window.innerWidth < 768 ? "Scroll to play" : "Hover to play"} mainTitle="Digital" highlight="Shorts." />

      <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-12 mb-40 z-20">
        
        {/* TOP GRID (12 Shorts) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start mb-16 md:mb-32">
          {shortsTop.map((video, index) => {
            const isMobileCol2 = index % 2 !== 0;
            const mobileMargin = isMobileCol2 ? "mt-8" : "mt-0";
            const desktopMargin = index % 4 === 0 ? "md:mt-0" : index % 4 === 1 ? "md:mt-24" : index % 4 === 2 ? "md:mt-12" : "md:mt-32";
            
            return (
              <div 
                key={video.id} 
                data-speed={video.speed}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`yt-wrapper yt-short-video parallax-short relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] shadow-xl cursor-pointer isolate transform-gpu ${mobileMargin} ${desktopMargin}`}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl isolate transform-gpu">
                  <iframe src={getYTUrl(video.ytId)} loading="lazy" className="absolute top-1/2 left-1/2 w-full h-full scale-[1.15] -translate-x-1/2 -translate-y-1/2" frameBorder="0" allow="autoplay; encrypted-media" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                <MuteButton isMuted={mutedStates[video.id]} onClick={(e) => toggleMute(e, video.id)} />
              </div>
            );
          })}
        </div>

        {/* 🌟 THE MIDDLE LANDSCAPE HERO */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="yt-wrapper yt-short-video relative w-full max-w-6xl mx-auto aspect-video rounded-[2rem] md:rounded-3xl overflow-hidden bg-[#111] shadow-2xl mb-16 md:mb-32 isolate transform-gpu"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[2rem] md:rounded-3xl isolate transform-gpu">
            <iframe src={getYTUrl(landscapeHeroShort.ytId)} loading="lazy" className="absolute top-1/2 left-1/2 w-full h-full scale-[1.18] -translate-x-1/2 -translate-y-1/2" frameBorder="0" allow="autoplay; encrypted-media" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-transparent to-transparent pointer-events-none opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <MuteButton isMuted={mutedStates[landscapeHeroShort.id]} onClick={(e) => toggleMute(e, landscapeHeroShort.id)} />
          <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 flex flex-col pointer-events-none">
            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Featured // {landscapeHeroShort.client}</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">{landscapeHeroShort.title}</h2>
          </div>
        </div>

        {/* BOTTOM GRID (11 Shorts) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start">
          {shortsBottom.map((video, index) => {
            const isMobileCol2 = index % 2 !== 0;
            const mobileMargin = isMobileCol2 ? "mt-8" : "mt-0";
            const desktopMargin = index % 4 === 0 ? "md:mt-0" : index % 4 === 1 ? "md:mt-24" : index % 4 === 2 ? "md:mt-12" : "md:mt-32";
            
            return (
              <div 
                key={video.id} 
                data-speed={video.speed}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`yt-wrapper yt-short-video parallax-short relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#111] shadow-xl cursor-pointer isolate transform-gpu ${mobileMargin} ${desktopMargin}`}
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl isolate transform-gpu">
                  <iframe src={getYTUrl(video.ytId)} loading="lazy" className="absolute top-1/2 left-1/2 w-full h-full scale-[1.15] -translate-x-1/2 -translate-y-1/2" frameBorder="0" allow="autoplay; encrypted-media" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                <MuteButton isMuted={mutedStates[video.id]} onClick={(e) => toggleMute(e, video.id)} />
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
        <p className="hidden md:block text-primary text-xs uppercase tracking-widest font-bold animate-pulse text-right mb-4">Hover to expand ⟶</p>

        <div className="hidden md:flex w-full h-[70vh] gap-6">
          {brandIdentityWorks.map((work, index) => (
            <div key={work.id} className="group relative flex-1 hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-pointer h-full">
              <div className="absolute inset-0 bg-[#151515] group-hover:bg-[#1a1a1a] transition-colors duration-700" />
              <img src={work.img} alt={work.client} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-[0.2em] text-white/40 whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{work.client}</h3>
              </div>
              <div className="absolute bottom-10 left-10 flex flex-col pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: work.color, backgroundColor: work.color }} />
                  <span className="text-white/80 font-bold tracking-widest uppercase text-xs">0{index + 1}</span>
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">{work.client}</h3>
                <p className="text-gray-300 font-medium text-sm max-w-xs">{work.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden w-full flex flex-col gap-6">
          {brandIdentityWorks.map((work, index) => (
            <div key={`mobile-${work.id}`} className="mobile-brand-card relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#151515] shadow-2xl">
              <img src={work.img} alt={work.client} className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-6 flex flex-col pointer-events-none">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: work.color, backgroundColor: work.color }} />
                  <span className="text-white/80 font-bold tracking-widest uppercase text-xs">0{index + 1}</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">{work.client}</h3>
                <p className="text-gray-400 font-medium text-xs max-w-[200px]">{work.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 4: WEBSITES
      ========================================== */}
      <section className="relative w-full bg-[#F4F3EE] text-black mt-32 pt-24 pb-[20vh] md:pt-40 md:pb-[40vh] rounded-t-[3rem] md:rounded-t-[5rem] z-20">
        <SectionTitle subtitle="High-Performance E-Commerce & Web" mainTitle="Digital" highlight="Experiences." />
        <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-12 flex flex-col items-center mt-12 md:mt-24 pb-[10vh]">
          {websiteWorks.map((work) => (
            <div 
              key={work.id} 
              className="website-stack-card sticky top-[12vh] md:top-[15vh] w-full aspect-[4/5] md:aspect-video rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-white to-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-black/5 mb-8 md:mb-24 last:mb-0 group cursor-pointer"
            >
              <img src={work.img} alt={work.client} className="absolute inset-0 w-full h-full object-contain p-8 md:p-24 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-white pointer-events-none">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/50 text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full mb-3 md:mb-4">{work.type}</span>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-lg">{work.client}</h3>
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