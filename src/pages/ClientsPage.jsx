import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { triggerLogoRain } from '../utils/logoRain';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. ALL 15 PARTNERS DATA
// ==========================================
const clientList = [
  { id: '01', name: 'Marvelous Real Estate', category: 'Real Estate', logo: '/T6.png', desc: 'Full-scale brand positioning and cinematic property showcases.' },
  { id: '02', name: 'Horn Star Group', category: 'Corporate', logo: '/T3.png', desc: 'Enterprise software integration and corporate identity overhaul.' },
  { id: '03', name: 'Ziquala Real Estate', category: 'Real Estate', logo: '/T10.png', desc: '3D architectural rendering and digital lead generation.' },
  { id: '04', name: 'Lucid Dental Clinic', category: 'Healthcare', logo: '/T11.png', desc: 'Premium social media management and brand trust building.' },
  { id: '05', name: '2Brothers Food Complex', category: 'F&B', logo: '/T12.png', desc: 'E-commerce architecture and packaging design strategy.' },
  { id: '06', name: 'Eltex Textile & Garment', category: 'Manufacturing', logo: '/T9.png', desc: 'B2B digital transformation and corporate profile production.' },
  { id: '07', name: 'Heal Venture', category: 'Health Tech', logo: '/T15.png', desc: 'Health-tech platform engineering and digital marketing.' },
  { id: '08', name: 'Globelink Properties', category: 'Real Estate', logo: '/T13.png', desc: 'International property marketing and UI/UX design.' },
  { id: '09', name: 'Davis Home Solutions', category: 'Services', logo: '/T7.png', desc: 'Home service lead generation and paid ad funnels.' },
  { id: '10', name: 'Jeblaton', category: 'Events', logo: '/T14.png', desc: 'Event branding, media coverage, and live streaming.' },
  { id: '11', name: 'Kebena House', category: 'Hospitality', logo: '/T2.png', desc: 'Boutique hospitality branding and visual identity.' },
  { id: '12', name: 'Ywaza Liquor + Events', category: 'F&B', logo: '/T5.png', desc: 'Liquor branding, packaging, and event sponsorship media.' },
  { id: '13', name: 'WoW Chocolate', category: 'F&B', logo: '/T0.png', desc: 'Brand positioning and engaging digital marketing campaigns.' },
  { id: '14', name: 'Broad View Trading PLC', category: 'Corporate', logo: '/T1.png', desc: 'Comprehensive corporate identity and B2B marketing strategy.' },
  { id: '15', name: 'Crea/ers', category: 'Creative', logo: '/T8.png', desc: 'Innovative visual identity and multimedia production services.' },
];

const testimonials = [
  { id: 'T1', src: '/check.mp4', name: 'Sarah Jenkins', role: 'CMO, Marvelous', quote: 'Open Tech completely redefined our digital presence. Their cinematic production is unmatched.' },
  { id: 'T2', src: '/check.mp4', name: 'Dawit Tadesse', role: 'Director, Castel', quote: 'The ROI on their digital ad campaigns was instantaneous. True partners in growth.' },
  { id: 'T3', src: '/check.mp4', name: 'Helen M.', role: 'Founder, Lucid Clinic', quote: 'They took our vision and built a brand that our patients instantly connect with.' },
];

const workProcess = [
  { step: '01', title: 'Discovery & Alignment', desc: 'Understanding business targets, audience context, and technical requirements.', img: '/process1.jpg' },
  { step: '02', title: 'Strategy & Architecture', desc: 'Building the blueprint—creative scripting, brand positioning, software specification, or campaign architecture.', img: '/process2.jpg' },
  { step: '03', title: 'Execution & Build', desc: 'Producing cinematic visual content, coding custom software platforms, or designing marketing assets in agile sprints.', img: '/process3.jpg' },
  { step: '04', title: 'Integration & Refinement', desc: 'Quality testing, editing, polishing visual effects, optimizing user interfaces, and ensuring cross-platform synergy.', img: '/process4.jpg' },
  { step: '05', title: 'Launch & Scale', desc: 'Deploying final deliverables, releasing applications live into the market, and measuring real-world outcome and growth.', img: '/process5.jpg' },
];

export default function ClientsPage() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  
  // ⏱️ Auto-Pilot States
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeClient = clientList[activeIndex];
  
  const [mutedStates, setMutedStates] = useState(
    testimonials.reduce((acc, test) => ({ ...acc, [test.id]: true }), {})
  );

  // Math references to ensure infinite forward rotation
  const prevIndex = useRef(0);
  const cumRot = useRef(0);

  // ==========================================
  // ⏱️ TIMER (You can change 3000 to adjust speed)
  // ==========================================
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % clientList.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [isPaused]);

  // ==========================================
  // 🧠 BRAIN 1: ROCK-SOLID SCROLL ENGINE (Runs ONCE)
  // ==========================================
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. HERO REVEAL
    gsap.from('.hero-text', { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });

    // 2. HORIZONTAL SCROLL SOCIAL PROOF 
    mm.add("(min-width: 768px)", () => {
      const track = document.querySelector('.testimonial-track');
      if (track) {
        const getScrollAmount = () => track.scrollWidth - window.innerWidth;
        
        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: ".testimonial-section",
            pin: true,
            scrub: 1,
            start: "top top", 
            end: () => `+=${getScrollAmount()}`, 
            invalidateOnRefresh: true,
          }
        });
      }
    });

    // 3. PROCESS PARALLAX TIMELINE
    gsap.to('.timeline-line', {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: ".process-section", start: "top center", end: "bottom center", scrub: true }
    });

    gsap.utils.toArray('.process-step').forEach((step) => {
      gsap.from(step, {
        y: 80, opacity: 0,
        scrollTrigger: { trigger: step, start: "top 85%", end: "top 60%", scrub: 1 }
      });
      const img = step.querySelector('.process-img');
      if (img) {
        gsap.to(img, {
          y: 40, ease: "none",
          scrollTrigger: { trigger: step, start: "top bottom", end: "bottom top", scrub: true }
        });
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // ==========================================
  // 🧠 BRAIN 2: GLOBE SHUFFLE ENGINE (Dynamic for ANY length)
  // ==========================================
  useGSAP(() => {
    let diff = activeIndex - prevIndex.current;
    const maxIndex = clientList.length - 1;
    
    // Dynamically check for the jump between the last item and the first item
    if (diff === -maxIndex) diff = 1;  
    if (diff === maxIndex) diff = -1;  
    
    cumRot.current -= diff * (360 / clientList.length);
    prevIndex.current = activeIndex;

    // Desktop: Rotate the Ring & Counter-Rotate the Logos inside it
    gsap.to('.globe-ring', { rotation: cumRot.current, duration: 1.5, ease: "expo.out", overwrite: "auto" });
    gsap.to('.orbiting-logo-inner', { rotation: -cumRot.current, duration: 1.5, ease: "expo.out", overwrite: "auto" });

    // Mobile: Rotate the 3D Cylinder
    gsap.to('.mobile-3d-cylinder', { rotationY: cumRot.current, duration: 1.5, ease: "expo.out", overwrite: "auto" });

  }, { scope: containerRef, dependencies: [activeIndex] });

  // Smart Auto-Play Videos (Natively handles scroll)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.testimonial-video').forEach(vid => observer.observe(vid));
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e, id) => {
    e.stopPropagation();
    setMutedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main ref={containerRef} className="relative w-full bg-black text-white overflow-hidden pb-32">
      
      <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-primary rounded-full mix-blend-screen filter blur-[250px] opacity-[0.12] pointer-events-none" />

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center pt-24 px-6 z-10">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.9] text-center">
          <span className="hero-text block">Partners in</span>
          <span className="hero-text block text-primary italic font-serif font-normal lowercase mt-2">Disruption.</span>
        </h1>
        <p className="hero-text mt-6 text-gray-400 max-w-xl text-center md:text-lg font-medium tracking-widest uppercase text-xs">
          The visionaries we build alongside.
        </p>
      </section>

      {/* ==========================================
          CLIENT SHOWCASE (Mobile 3D Cylinder & Desktop Stepped Orbit)
      ========================================== */}
      <section 
        className="relative w-full max-w-[1500px] mx-auto px-4 md:px-12 mb-32 md:mb-48 z-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        
        {/* 📱 MOBILE VIEW: 3D HORIZONTAL CYLINDER */}
        <div className="flex xl:hidden flex-col items-center gap-6 w-full max-w-[500px] mx-auto overflow-visible">
          
          <div className="w-full h-[320px] bg-[#111] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center relative transition-all duration-300">
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
              {activeClient.category}
            </span>
            
            {activeClient.logo ? (
              <img src={activeClient.logo} alt={activeClient.name} className="w-32 h-auto object-contain mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
            ) : (
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">
                {activeClient.name}
              </h3>
            )}
            
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-[280px]">
              {activeClient.desc}
            </p>
          </div>

          <div className="relative w-full h-32 mt-4 perspective-[1000px] flex items-center justify-center pointer-events-auto">
             <div 
               className="mobile-3d-cylinder relative w-full h-full"
               style={{ transformStyle: 'preserve-3d', transform: `translateZ(-140px)` }}
             >
               {clientList.map((client, i) => {
                 const theta = 360 / clientList.length; // Dynamically calculated
                 const isActive = activeIndex === i;
                 return (
                   <div 
                     key={`mobile-${client.id}`}
                     onClick={() => setActiveIndex(i)}
                     className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center p-3 cursor-pointer bg-[#111] transition-all duration-500"
                     style={{ 
                       transform: `rotateY(${i * theta}deg) translateZ(140px)`,
                       opacity: isActive ? 1 : 0.15,
                       boxShadow: isActive ? '0 0 25px rgba(245,178,26,0.5)' : 'none',
                       border: isActive ? '2px solid #F5B21A' : '1px solid rgba(255,255,255,0.1)'
                     }}
                   >
                     {client.logo ? (
                       <img src={client.logo} className={`w-full h-full object-contain ${isActive ? 'grayscale-0' : 'grayscale'}`} />
                     ) : (
                       <span className="text-primary font-black uppercase text-[6px]">Golden</span>
                     )}
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* 🖥️ DESKTOP VIEW: MASTERPIECE STEPPED ORBIT */}
        <div className="hidden xl:flex flex-row items-center gap-24">
          
          <div className="w-[55%] relative aspect-square max-w-[700px] flex items-center justify-center">
            
            <div className="absolute z-20 w-32 h-32 rounded-full bg-black border-2 border-primary/30 flex items-center justify-center shadow-[0_0_50px_rgba(245,178,26,0.3)]">
              <img src="/Opentechlogo.png" alt="OpenTech Center" className="w-20 object-contain animate-pulse" />
            </div>

            <div className="globe-ring absolute w-[90%] h-[90%] rounded-full border border-white/10 flex items-center justify-center">
              {clientList.map((client, i) => {
                const theta = 360 / clientList.length; // Dynamically calculated
                const angle = (i * theta) - 90; 
                const radius = 32; 
                const left = 50 + radius * Math.cos(angle * (Math.PI / 180));
                const top = 50 + radius * Math.sin(angle * (Math.PI / 180));
                const isActive = activeIndex === i;

                return (
                  <div 
                    key={`desk-${client.id}`}
                    onClick={() => setActiveIndex(i)}
                    className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <div className={`orbiting-logo-inner w-full h-full rounded-full border flex items-center justify-center p-3 shadow-lg transition-all duration-300 bg-[#111] cursor-pointer ${isActive ? 'border-primary scale-125 z-50 shadow-[0_0_30px_rgba(245,178,26,0.4)]' : 'border-white/10 hover:border-white/40 z-10'}`}>
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className={`object-contain w-full h-full filter transition-all ${isActive ? 'grayscale-0' : 'grayscale opacity-60'}`} />
                      ) : (
                        <span className="text-primary font-black uppercase text-[8px] text-center leading-tight">Golden<br/>Card</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[45%] h-[500px] rounded-[3rem] bg-[#111] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              {activeClient.logo && <img src={activeClient.logo} className="w-[150%] h-[150%] object-cover blur-md" />}
            </div>

            <div key={`content-${activeClient.id}`} className="animate-fade-in-up z-10 flex flex-col items-center text-center">
              <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
                {activeClient.category}
              </span>
              
              {activeClient.logo ? (
                <img src={activeClient.logo} alt={activeClient.name} className="w-64 object-contain mb-8 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
              ) : (
                <h3 className="text-6xl font-black uppercase tracking-tighter text-white mb-8">
                  {activeClient.name}
                </h3>
              )}
              
              <p className="text-gray-400 font-medium text-xl px-4 leading-relaxed max-w-sm">
                {activeClient.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SOCIAL PROOF (Horizontal Scroll Track)
      ========================================== */}
      <section className="testimonial-section relative w-full h-auto md:h-screen flex items-center bg-[#0a0a0a] z-20 overflow-hidden py-24 md:py-0">
        
        <div className="testimonial-track relative z-10 flex flex-col md:flex-row gap-12 md:gap-16 px-6 md:pl-[10vw] md:pr-[15vw] w-full md:w-max items-center h-full">
          
          <div className="w-full md:w-[35vw] md:min-w-[400px] flex flex-col justify-center flex-shrink-0 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-5xl md:text-7xl lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.9]">
              Social <br className="hidden md:block"/><span className="text-primary italic font-serif font-normal lowercase">Proof.</span>
            </h2>
            <p className="mt-4 md:mt-6 text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">
              Don't just take our word for it.
            </p>
          </div>

          {testimonials.map((test, index) => {
            const isMuted = mutedStates[test.id];

            return (
              <div 
                key={test.id}
                className="test-card relative w-full md:w-[45vw] lg:w-[35vw] max-w-[500px] md:max-w-[600px] aspect-[4/5] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl flex-shrink-0 mx-auto md:mx-0"
              >
                <video 
                  ref={el => videoRefs.current[index] = el}
                  src={test.src}
                  loop 
                  autoPlay={window.innerWidth >= 768} 
                  muted={isMuted}
                  playsInline
                  className="testimonial-video absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                <button 
                  onClick={(e) => toggleMute(e, test.id)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors duration-300"
                >
                  {isMuted ? (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  ) : (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  )}
                </button>

                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 pointer-events-none">
                  <p className="text-white text-lg md:text-xl font-medium italic mb-4 md:mb-6 leading-relaxed relative drop-shadow-md">
                    <span className="absolute -top-3 -left-3 md:-top-4 md:-left-4 text-3xl md:text-4xl text-primary opacity-60 font-serif">"</span>
                    {test.quote}
                  </p>
                  <h4 className="text-primary font-black uppercase tracking-tighter text-xl md:text-2xl leading-none drop-shadow-md">
                    {test.name}
                  </h4>
                  <span className="text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-widest drop-shadow-md">
                    {test.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          WORK PROCESS (Mobile Left-Aligned, Desktop Alternating)
      ========================================== */}
      <section id="process" className="process-section relative w-full max-w-6xl mx-auto px-6 py-24 md:py-48 z-20">
        
        <div className="text-center mb-16 md:mb-40">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Our <span className="text-primary italic font-serif font-normal lowercase">Process.</span>
          </h2>
          <p className="mt-2 md:mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">
            How we bring ideas to reality.
          </p>
        </div>

        <div className="relative w-full">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 origin-top">
            <div className="timeline-line absolute top-0 left-0 w-full h-full bg-primary origin-top transform scale-y-0" />
          </div>

          {workProcess.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.step} className={`process-step relative flex flex-col md:flex-row items-start md:items-center w-full mb-20 md:mb-32 pl-8 md:pl-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                <div className="absolute left-2 md:left-1/2 -translate-x-1/2 mt-2 md:mt-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-black border-[3px] border-primary z-10 shadow-[0_0_15px_rgba(245,178,26,0.6)]" />

                <div className={`w-full md:w-1/2 flex flex-col justify-center mb-6 md:mb-0 ${isEven ? 'md:pr-24 md:items-end md:text-right' : 'md:pl-24 md:items-start md:text-left'}`}>
                  <span className="text-5xl md:text-8xl font-black text-white/5 tracking-tighter -mb-4 md:-mb-10 select-none pointer-events-none">
                    {step.step}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2 md:mb-4 z-10">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 font-medium text-sm md:text-lg leading-relaxed max-w-sm z-10">
                    {step.desc}
                  </p>
                </div>

                <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden bg-[#111] shadow-2xl border border-white/5">
                    <img src={step.img} alt={step.title} className="process-img absolute inset-0 w-full h-[120%] object-cover opacity-60 -top-[10%]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          BOTTOM CTA
      ========================================== */}
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 z-20 relative border-t border-white/5">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8 md:mb-10 text-center">
          Ready to join the <span className="text-primary italic font-serif font-normal lowercase">roster?</span>
        </h2>
        
        <a 
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            triggerLogoRain(() => {
              navigate('/contact');
              window.scrollTo(0, 0);
            });
          }}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full overflow-hidden border-2 border-primary bg-black cursor-pointer transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,178,26,0.3)] hover:-translate-y-1"
        >
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></div>
          
          <span className="relative z-10 font-black uppercase tracking-widest text-xs md:text-sm text-primary group-hover:text-black transition-colors duration-300">
            Start a Project
          </span>
          
          <span className="relative z-10 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-primary group-hover:text-black transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>
      </div>

    </main>
  );
}