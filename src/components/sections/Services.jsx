import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import router navigation
import { triggerLogoRain } from '../../utils/logoRain'; // ⬅️ Import the master transition

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. BLUEPRINT SERVICES DATA 
// ==========================================
const servicesData = [
  {
    id: '01',
    title: 'Software & Systems',
    items: ['Custom ERP Engines', 'CRM Platforms', 'iOS/Android Apps', 'Web-based Business Tools'],
    colorClass: 'bg-[#FFFBF2] text-[#111] border border-[#F5B21A]/20', 
    rotation: 'md:-rotate-3', 
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
        <path d="M45.5 12C63 5 80 15 88 32C96 49 85 70 70 82C55 94 30 90 16 75C2 60 4 35 15 22C26 9 35 16.5 45.5 12Z" fill="#111" stroke="#F5B21A" strokeWidth="3" />
        <path d="M35 35 L20 50 L35 65 M65 35 L80 50 L65 65 M45 75 L55 25" fill="none" stroke="#F5B21A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: '02',
    title: 'Web & Digital',
    items: ['Website Development', 'E-commerce Architectures', 'UI/UX Design', 'Performance Optimization', 'Technical Maintenance'],
    colorClass: 'bg-[#FFFFFF] text-[#111] border border-black/5',
    rotation: 'md:rotate-2',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
         <path d="M50 10 C70 15 90 35 85 60 C80 85 55 95 35 85 C15 75 5 50 15 30 C25 10 38 7 50 10Z" fill="#F5B21A" stroke="#111" strokeWidth="3" />
         <rect x="30" y="30" width="40" height="40" rx="4" fill="none" stroke="#111" strokeWidth="4" />
         <path d="M30 40H20 M30 50H20 M30 60H20 M70 40H80 M70 50H80 M70 60H80 M40 30V20 M50 30V20 M60 30V20 M40 70V80 M50 70V80 M60 70V80" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: '03',
    title: 'Digital Marketing',
    items: ['SMM', 'Paid Ads Campaigns', 'Content Strategy', 'Video Production', 'Digital Brand Growth'],
    colorClass: 'bg-[#FFF4DD] text-[#111] border border-[#F5B21A]/20',
    rotation: 'md:-rotate-6',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-md">
         <path d="M50 5 C80 5 95 30 90 60 C85 90 50 95 20 80 C-10 65 0 25 25 10 C35 4 40 5 50 5Z" fill="#111" stroke="#F5B21A" strokeWidth="3" />
         <rect x="35" y="25" width="30" height="50" rx="5" fill="none" stroke="#F5B21A" strokeWidth="4" />
         <circle cx="50" cy="65" r="3" fill="#F5B21A" />
      </svg>
    )
  },
  {
    id: '04',
    title: 'Brand Identity & Design',
    items: ['Brand Strategy & Positioning', 'Logo & Visual Identity', 'Brand Guidelines & Systems', 'Corporate & Marketing Collaterals', 'Company Profiles'],
    colorClass: 'bg-primary text-[#111] border border-black/10 shadow-[0_0_40px_rgba(245,178,26,0.3)]',
    rotation: 'md:rotate-4',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
         <path d="M50 10 C70 15 90 35 85 60 C80 85 55 95 35 85 C15 75 5 50 15 30 C25 10 38 7 50 10Z" fill="#111" stroke="#FFF" strokeWidth="3" />
         <ellipse cx="50" cy="35" rx="20" ry="8" fill="none" stroke="#FFF" strokeWidth="4"/>
         <path d="M30 35 V65 A20 8 0 0 0 70 65 V35" fill="none" stroke="#FFF" strokeWidth="4"/>
         <path d="M30 50 A20 8 0 0 0 70 50" fill="none" stroke="#FFF" strokeWidth="4"/>
      </svg>
    )
  },
  {
    id: '05',
    title: 'Cinematic Production',
    items: ['Commercial Advertising', 'Corporate Profiles', 'Documentary', 'Music Videos', 'Color Grading & Audio'],
    colorClass: 'bg-[#FCF9F0] text-[#111] border border-[#F5B21A]/10',
    rotation: 'md:-rotate-2',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
         <path d="M50 5 C80 5 95 30 90 60 C85 90 50 95 20 80 C-10 65 0 25 25 10 C35 4 40 5 50 5Z" fill="#111" stroke="#F5B21A" strokeWidth="3" />
         <path d="M25 70 L25 45 M45 70 L45 35 M65 70 L65 55 M85 70 L85 25" stroke="#F5B21A" strokeWidth="6" strokeLinecap="round" />
         <path d="M15 70 L95 70" stroke="#F5B21A" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: '06',
    title: 'VFX & 3D Animation',
    items: ['Advanced Compositing', '3D Product Animation', 'VFX Advertising', 'Product Visualization', 'Motion Graphics', 'CGI Social Media Content'],
    colorClass: 'bg-[#FDFDFD] text-[#111] border border-black/5',
    rotation: 'md:rotate-3',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
         <path d="M50 10 C70 15 90 35 85 60 C80 85 55 95 35 85 C15 75 5 50 15 30 C25 10 38 7 50 10Z" fill="#F5B21A" stroke="#111" strokeWidth="3" />
         <circle cx="35" cy="35" r="6" fill="#111" />
         <circle cx="65" cy="45" r="6" fill="#111" />
         <circle cx="45" cy="70" r="6" fill="#111" />
         <path d="M35 35 L65 45 L45 70 Z" fill="none" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    )
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const buttonRef = useRef(null); 
  
  const navigate = useNavigate(); // ⬅️ Initialize navigation

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ==========================================
    // 🖥️ DESKTOP: CINEMATIC DEALING SHUFFLE
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      // Hide header and button initially (pushed down)
      gsap.set([headerRef.current, buttonRef.current], { y: 80, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, 
          scrub: 1.5, 
          start: "top top", 
          end: "+=250%", 
          invalidateOnRefresh: true, 
        }
      });

      // STEP 1: Header Appears First
      tl.to(headerRef.current, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, 0);
      tl.to({}, { duration: 0.5 }); // Scroll pause

      // STEP 2: The Spinning Dealer's Shuffle
      tl.from('.service-card', {
        y: window.innerHeight + 200, 
        rotation: 360,               
        scale: 0.3,                  
        opacity: 0,
        stagger: 0.15,               
        duration: 1.8,
        ease: "back.out(1.2)"        
      });

      // STEP 3: The Big Button Bounces Up
      tl.to(buttonRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: "back.out(1.5)" 
      }, "-=0.5"); 
    });

    // ==========================================
    // 📱 MOBILE: STACKING DECK
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray('.service-card');
      const stackRotations = [-4, 5, -2, 4, -5, 3]; 

      // Push button down for entrance
      gsap.set(buttonRef.current, { y: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, 
          start: "top top", 
          end: "+=800%", 
          invalidateOnRefresh: true, 
        }
      });

      tl.to(headerRef.current, { y: "-8vh", opacity: 0.1, duration: 0.5 }, 0);
      gsap.set(cards, { y: window.innerHeight, rotation: 0 });

      cards.forEach((card, i) => {
        tl.to(card, {
          y: 70 + (i * 6), 
          rotation: stackRotations[i], 
          duration: 1,
          ease: "power2.out"
        }, "+=1.5"); 
      });

      // Reveal button gracefully at the very end of the stack
      tl.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      }, "+=1");
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative w-full h-screen bg-black flex flex-col items-center justify-start md:justify-center overflow-hidden cursor-default pt-24 md:pt-0"
    >
      {/* HEADER */}
      <div ref={headerRef} className="relative z-0 max-w-7xl mx-auto w-full text-center px-6">
        <h2 className="text-4xl md:text-[5vw] font-black text-white tracking-tighter leading-none mb-6 md:mb-8">
          partner with us <span className="italic font-serif font-normal text-primary">for:</span>
        </h2>
      </div>

      {/* CARD CONTAINER */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-center mt-2 md:mt-6 h-[55vh] md:h-auto"
      >
        {servicesData.map((service, index) => {
          const isHovered = hoveredIndex === index;
          const isAnotherHovered = hoveredIndex !== null && hoveredIndex !== index;

          const cardBaseClasses = "w-full h-full p-7 lg:p-8 pt-12 lg:pt-14 rounded-2xl md:rounded-xl shadow-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]";
          
          const cardActiveClasses = isHovered 
            ? "md:-translate-y-12 md:rotate-0 md:scale-105 md:shadow-[0_30px_60px_rgba(245,178,26,0.3)]" 
            : `${service.rotation} ${isAnotherHovered ? "md:opacity-40 md:scale-95 md:translate-y-4" : "md:hover:scale-100"}`;

          const isBrandCard = service.colorClass.includes('bg-primary');
          const bulletColor = isBrandCard ? 'text-[#111]' : 'text-primary';
          const lineOpacity = isBrandCard ? 'opacity-20' : 'opacity-10';

          return (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              // 🎯 FIXED DESKTOP DIMENSIONS: Height reduced to md:h-[400px] lg:h-[440px] so it breathes perfectly
              className={`service-card absolute md:relative top-0 left-0 right-0 mx-auto md:mx-0 md:-ml-16 lg:-ml-20 first:ml-0 w-[88%] sm:w-[350px] md:w-[260px] lg:w-[280px] h-[50vh] md:h-[400px] lg:h-[440px] flex-shrink-0 cursor-pointer ${isHovered ? 'z-50' : 'z-10'}`}
            >
              <div className={`${cardBaseClasses} ${service.colorClass} ${cardActiveClasses}`}>
                
                <div className={`absolute -top-8 -left-4 md:-top-10 md:-left-6 transition-transform duration-500 ease-out ${isHovered ? 'md:scale-110 md:-rotate-12' : 'md:scale-100'}`}>
                  {service.sticker}
                </div>

                <div className="relative z-10 flex flex-col justify-start h-full mt-4">
                  <h3 className="text-2xl lg:text-3xl font-black tracking-tighter leading-[1.05] mb-4">
                    {service.title}
                  </h3>
                  
                  <div className={`w-full h-[2px] bg-black ${lineOpacity} mb-6`} />
                  
                  <ul className="flex flex-col gap-3.5">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-semibold text-xs lg:text-sm text-gray-800">
                        <span className={`mt-[2px] flex-shrink-0 text-[10px] ${bulletColor}`}>✦</span>
                        <span className="leading-tight opacity-95 text-[#111]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 THE BIG, INSTRUCTIVE BOTTOM BUTTON - NOW WITH TRANSITION */}
      <div 
        ref={buttonRef} 
        className="absolute bottom-6 md:bottom-12 left-0 w-full flex justify-center px-4 z-40 pointer-events-auto"
      >
        <a 
          href="/services"
          onClick={(e) => {
            e.preventDefault();
            // Trigger the cinematic transition, then navigate to the new page
            triggerLogoRain(() => {
              navigate('/services');
              window.scrollTo(0, 0);
            });
          }}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 md:px-14 md:py-5 rounded-full overflow-hidden border-2 border-primary bg-black/40 backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,178,26,0.3)] hover:scale-105"
        >
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></div>
          
          <span className="relative z-10 font-black uppercase tracking-widest text-sm md:text-base text-primary group-hover:text-black transition-colors duration-300">
            Discover Our Full Services
          </span>
          
          <span className="relative z-10 w-6 h-6 flex items-center justify-center text-primary group-hover:text-black transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>
      </div>

    </section>
  );
}