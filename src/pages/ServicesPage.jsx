import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { triggerLogoRain } from '../utils/logoRain';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. FULL BLUEPRINT SERVICES DATA (Updated with Images)
// ==========================================
const fullServices = [
  {
    id: '01',
    title: 'Software & Systems Development',
    desc: 'Custom Enterprise Resource Planning (ERP) engines, Customer Relationship Management (CRM) platforms, custom iOS/Android mobile application development, and web-based business tools.',
    icon: '💻',
    category: 'Engineering',
    img: '/service-software.jpg' // <-- ADD YOUR IMAGE PATHS HERE
  },
  {
    id: '02',
    title: 'Web & Digital Development',
    desc: 'Custom website engineering, e-commerce architectures, UI/UX design, performance optimization, and technical maintenance.',
    icon: '🌐',
    category: 'Engineering',
    img: '/service-web.jpg'
  },
  {
    id: '03',
    title: 'Digital Marketing & Ads',
    desc: 'Social media management, paid advertising campaigns, content strategy, copy variations, performance tracking, and digital brand growth.',
    icon: '📈',
    category: 'Growth',
    img: '/service-marketing.jpg'
  },
  {
    id: '04',
    title: 'Branding & Creative Strategy',
    desc: 'Brand positioning, visual identity systems, campaign architecture, and unified creative communication.',
    icon: '✨',
    category: 'Identity',
    img: '/service-branding.jpg'
  },
  {
    id: '05',
    title: 'Cinematic Production',
    desc: 'Commercial advertising, corporate profiles, mini-documentaries, music videos, scriptwriting, filming, color grading, and audio post-production.',
    icon: '🎬',
    category: 'Production',
    img: '/service-production.jpg'
  },
  {
    id: '06',
    title: 'AI-Powered Video Production',
    desc: 'Generative AI workflows, synthetic asset generation, visual acceleration, and concept creation.',
    icon: '🤖',
    category: 'Innovation',
    img: '/service-ai.jpg'
  },
  {
    id: '07',
    title: 'VFX, CGI & 3D Animation',
    desc: 'Advanced compositing, visual effects integration, 3D modeling, CGI, and motion graphics.',
    icon: '🌪️',
    category: 'Visual Effects',
    img: '/service-vfx.jpg'
  },
  {
    id: '08',
    title: 'Event Organization',
    desc: 'End-to-end event design, physical stage builds, multimedia execution, and promotional coverage.',
    icon: '🎟️',
    category: 'Experiences',
    img: '/service-event.jpg'
  },
  {
    id: '09',
    title: 'Influencer & Strategic Partnerships',
    desc: 'Talent management, creator alignment, brand integration, and outreach expansion.',
    icon: '🤝',
    category: 'Talent',
    img: '/service-talent.jpg'
  },
  {
    id: '10',
    title: 'Live Streaming',
    desc: 'Professional live-streaming solutions for corporate events, conferences, product launches, meetings, and special events across digital platforms.',
    icon: '📡',
    category: 'Broadcasting',
    img: '/service-stream.jpg'
  },
  {
    id: '11',
    title: 'Broadcast Management',
    desc: 'End-to-end broadcast process—from production coordination and technical setup to live transmission and platform management.',
    icon: '🎛️',
    category: 'Broadcasting',
    img: '/service-broadcast.jpg'
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. HERO REVEAL (Universal)
    gsap.from('.hero-text', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.2
    });

    // ==========================================
    // 🖥️ DESKTOP LOGIC (Sticky Split-Screen)
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: rightColRef.current,
        pinSpacing: false,
      });

      const cards = gsap.utils.toArray('.service-list-card');
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
              
              // Animate both the image and the number
              gsap.fromTo('.dynamic-content-layer', 
                { scale: 0.8, opacity: 0, y: 50 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
              );
            }
          }
        });
      });
    });

    // ==========================================
    // 📱 MOBILE LOGIC: KINETIC CARDS & SCROLLER
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      const mobileCards = gsap.utils.toArray('.mobile-service-card');

      mobileCards.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0.3, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5,
            }
          }
        );

        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
            }
          }
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <main className="w-full bg-black text-white selection:bg-primary selection:text-black">
      
      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative w-full h-[50vh] md:h-[70vh] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary rounded-full mix-blend-screen filter blur-[220px] opacity-[0.14] pointer-events-none" />
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.9] text-center z-10">
          <span className="hero-text block text-white">Capabilities</span>
          <span className="hero-text block text-primary italic font-serif font-normal lowercase mt-2">& Services.</span>
        </h1>
        <p className="hero-text mt-6 text-gray-400 max-w-xl text-center text-sm md:text-lg font-medium tracking-wide px-2">
          An arsenal of multidisciplinary solutions designed to position brands at the exact center of their target market.
        </p>
      </section>

      {/* ==========================================
          CREAMY SECTION (Split on Desktop / Cards on Mobile)
      ========================================== */}
      <section 
        ref={containerRef} 
        className="relative w-full bg-[#F4F3EE] text-[#111] rounded-t-[2.5rem] md:rounded-t-[4rem] z-20 pt-8 md:pt-0"
      >

        {/* 📱 MOBILE FLOATING HUD (Sticky Under Navbar) */}
        <div className="md:hidden sticky top-20 z-40 w-full px-4 mb-4 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-lg text-white border border-white/15 rounded-full px-4 py-2.5 shadow-2xl flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2 truncate mr-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
              <span className="text-primary font-black text-xs tracking-wider flex-shrink-0">
                {fullServices[activeIndex].id} / 11
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300 truncate">
                {fullServices[activeIndex].title}
              </span>
            </div>
            
            <div className="w-14 h-1.5 bg-white/20 rounded-full overflow-hidden flex-shrink-0">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                style={{ width: `${((activeIndex + 1) / fullServices.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row relative">
          
          {/* ==========================================
              LEFT: SERVICE CARDS 
          ========================================== */}
          <div ref={leftColRef} className="w-full md:w-[55%] flex flex-col px-4 md:px-12 py-6 md:py-40 gap-6 md:gap-32">
            {fullServices.map((service, index) => {
              const isActiveOnMobile = activeIndex === index;

              return (
                <div 
                  key={service.id} 
                  className={`service-list-card mobile-service-card relative flex flex-col justify-between p-6 sm:p-8 md:p-0 rounded-3xl md:rounded-none bg-white md:bg-transparent border transition-all duration-500 overflow-hidden shadow-lg md:shadow-none ${
                    isActiveOnMobile 
                      ? 'border-primary/80 ring-2 ring-primary/20 md:ring-0 md:border-transparent' 
                      : 'border-black/5 md:border-transparent'
                  }`}
                >
                  <span className="block md:hidden absolute -right-3 -bottom-5 text-black/[0.04] font-black text-8xl select-none pointer-events-none">
                    {service.id}
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#F4F3EE] md:bg-white border border-black/10">
                        <span>{service.icon}</span>
                        <span className="text-gray-700">{service.category}</span>
                      </span>
                      
                      <span className="md:hidden text-primary font-black text-sm tracking-wider">
                        #{service.id}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] text-black">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base md:text-2xl font-medium text-gray-600 leading-relaxed max-w-lg mt-3">
                      {service.desc}
                    </p>
                  </div>

                  <div className="md:hidden flex items-center justify-between pt-4 mt-4 border-t border-black/5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Open Tech Capability
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActiveOnMobile ? 'bg-primary scale-125' : 'bg-black/20'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==========================================
              RIGHT: PINNED VISUAL DISPLAY (Desktop Only)
          ========================================== */}
          <div className="hidden md:flex w-[45%] h-screen sticky top-0 flex-col items-center justify-center p-12 pointer-events-none">
            
            <div className="relative w-full aspect-square rounded-[3rem] bg-white border border-black/5 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              
              {/* 🎨 NEW: The Layered Image and Number Container */}
              <div className="dynamic-content-layer absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
                
                {/* 1. Background Image */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 scale-105"
                  style={{ backgroundImage: `url(${fullServices[activeIndex].img})` }}
                />
                
                {/* 2. Image Overlay (To ensure number is readable) */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

                {/* 3. The Massive Number */}
                <div className="relative z-10 text-[22vw] font-black text-black leading-none tracking-tighter drop-shadow-2xl mix-blend-overlay opacity-90">
                  {fullServices[activeIndex].id}
                </div>
                
              </div>

              {/* Title Badge overlay at bottom */}
              <div className="absolute bottom-10 w-full text-center px-8 z-20">
                <p className="text-primary font-bold uppercase tracking-widest text-sm bg-black/90 backdrop-blur-md text-white inline-block px-4 py-2 rounded-full shadow-lg border border-white/10">
                  {fullServices[activeIndex].title}
                </p>
              </div>

              {/* Scroll Indicators at top right */}
              <div className="absolute top-10 right-10 flex flex-col gap-2 z-20">
                {fullServices.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 rounded-full transition-all duration-500 shadow-md ${i === activeIndex ? 'h-8 bg-primary' : 'h-2 bg-black/30 backdrop-blur-sm'}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* ==========================================
            BOTTOM CTA
        ========================================== */}
        <div className="w-full flex flex-col items-center justify-center py-24 md:py-32 border-t border-black/5 bg-[#F4F3EE] px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-black tracking-tighter uppercase mb-8 md:mb-10 text-center">
            Ready to see it <span className="text-primary italic font-serif font-normal lowercase">in action?</span>
          </h2>
          
          <a 
            href="/works"
            onClick={(e) => {
              e.preventDefault();
              triggerLogoRain(() => {
                navigate('/works');
                window.scrollTo(0, 0);
              });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full overflow-hidden border-2 border-black bg-white cursor-pointer transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,178,26,0.3)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></div>
            
            <span className="relative z-10 font-black uppercase tracking-widest text-xs md:text-sm text-black transition-colors duration-300">
              Explore Our Work
            </span>
            
            <span className="relative z-10 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-black transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </div>

      </section>
    </main>
  );
}