import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'enterprise erp',
    items: ['Resource Planning', 'Database Architecture', 'Process Automation', 'Custom Dashboards', 'Legacy Migration'],
    colorClass: 'bg-primary text-black',
    rotation: 'md:-rotate-3', 
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
        <path d="M45.5 12C63 5 80 15 88 32C96 49 85 70 70 82C55 94 30 90 16 75C2 60 4 35 15 22C26 9 35 16.5 45.5 12Z" fill="#111" stroke="#FFF" strokeWidth="3" />
        <path d="M35 35 L20 50 L35 65 M65 35 L80 50 L65 65 M45 75 L55 25" fill="none" stroke="#F5B21A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: '02',
    title: 'web platforms',
    items: ['Full-stack Development', 'React / Next.js', 'Secure Authentication', 'API Integrations', 'Cloud Hosting'],
    colorClass: 'bg-[#1A1A1A] text-white border border-white/10',
    rotation: 'md:rotate-2',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
         <path d="M50 10 C70 15 90 35 85 60 C80 85 55 95 35 85 C15 75 5 50 15 30 C25 10 38 7 50 10Z" fill="#F5B21A" stroke="#FFF" strokeWidth="3" />
         <rect x="30" y="30" width="40" height="40" rx="4" fill="none" stroke="#111" strokeWidth="4" />
         <path d="M30 40H20 M30 50H20 M30 60H20 M70 40H80 M70 50H80 M70 60H80 M40 30V20 M50 30V20 M60 30V20 M40 70V80 M50 70V80 M60 70V80" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: '03',
    title: 'app engineering',
    items: ['Native iOS & Android', 'Cross-platform Apps', 'Real-time Tracking', 'Logistics Platforms', 'UI/UX Design'],
    colorClass: 'bg-[#333333] text-white',
    rotation: 'md:-rotate-6',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-md">
         <path d="M50 5 C80 5 95 30 90 60 C85 90 50 95 20 80 C-10 65 0 25 25 10 C35 4 40 5 50 5Z" fill="#FFF" stroke="#111" strokeWidth="3" />
         <rect x="35" y="25" width="30" height="50" rx="5" fill="none" stroke="#F5B21A" strokeWidth="4" />
         <circle cx="50" cy="65" r="3" fill="#F5B21A" />
      </svg>
    )
  },
  {
    id: '04',
    title: 'system architecture',
    items: ['Cloud Infrastructure', 'Microservices', 'Load Balancing', 'Disaster Recovery', 'Scalability Audits'],
    colorClass: 'bg-black text-white border border-primary',
    rotation: 'md:rotate-4',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
         <path d="M50 10 C70 15 90 35 85 60 C80 85 55 95 35 85 C15 75 5 50 15 30 C25 10 38 7 50 10Z" fill="#F5B21A" stroke="#111" strokeWidth="3" />
         <ellipse cx="50" cy="35" rx="20" ry="8" fill="none" stroke="#111" strokeWidth="4"/>
         <path d="M30 35 V65 A20 8 0 0 0 70 65 V35" fill="none" stroke="#111" strokeWidth="4"/>
         <path d="M30 50 A20 8 0 0 0 70 50" fill="none" stroke="#111" strokeWidth="4"/>
      </svg>
    )
  },
  {
    id: '05',
    title: 'data & analytics',
    items: ['Data Warehousing', 'BI Dashboards', 'Predictive Modeling', 'Machine Learning', 'Data Migration'],
    colorClass: 'bg-[#EAEAEA] text-black',
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
    title: 'quality assurance',
    items: ['Integration Testing', 'Automated Pipelines', 'Zero-downtime', 'Security Audits', 'Performance Tuning'],
    colorClass: 'bg-[#F4F3EE] text-black',
    rotation: 'md:rotate-3',
    sticker: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-md">
         <path d="M50 10 C70 15 90 35 85 60 C80 85 55 95 35 85 C15 75 5 50 15 30 C25 10 38 7 50 10Z" fill="#111" stroke="#F5B21A" strokeWidth="3" />
         <circle cx="35" cy="35" r="6" fill="#F5B21A" />
         <circle cx="65" cy="45" r="6" fill="#F5B21A" />
         <circle cx="45" cy="70" r="6" fill="#F5B21A" />
         <path d="M35 35 L65 45 L45 70 Z" fill="none" stroke="#F5B21A" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    )
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ==========================================
    // 🖥️ DESKTOP: CINEMATIC DEALING SHUFFLE
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      // Hide header initially
      gsap.set(headerRef.current, { y: 80, opacity: 0 });

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

      // STEP 1: Text Appears First
      tl.to(headerRef.current, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, 0);
      tl.to({}, { duration: 0.5 }); // Scroll pause

      // STEP 2: The Spinning Dealer's Shuffle
      // Using .from() lets GSAP do the math to map them to their perfect Tailwind classes
      tl.from('.service-card', {
        y: window.innerHeight + 200, // Start way off-screen at the bottom
        rotation: 360,               // Spin them wildly into place
        scale: 0.3,                  // Start tiny
        opacity: 0,
        stagger: 0.15,               // Deal them one by one
        duration: 1.8,
        ease: "back.out(1.2)"        // Snap into place with a satisfying bounce
      });
    });

    // ==========================================
    // 📱 MOBILE: UNTOUCHED STACKING DECK
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray('.service-card');
      const stackRotations = [-4, 5, -2, 4, -5, 3]; 

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
        <h2 className="text-4xl md:text-[5vw] font-black text-white tracking-tighter leading-none">
          partner with us <span className="italic font-serif font-normal">for:</span>
        </h2>
      </div>

      {/* CARD CONTAINER */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-center mt-12 md:mt-24 h-[65vh] md:h-auto"
      >
        {servicesData.map((service, index) => {
          const isHovered = hoveredIndex === index;
          const isAnotherHovered = hoveredIndex !== null && hoveredIndex !== index;

          const cardBaseClasses = "w-full h-full p-7 lg:p-8 pt-12 lg:pt-14 rounded-2xl md:rounded-xl shadow-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]";
          
          const cardActiveClasses = isHovered 
            ? "md:-translate-y-12 md:rotate-0 md:scale-105 md:shadow-[0_30px_60px_rgba(0,0,0,0.8)]" 
            : `${service.rotation} ${isAnotherHovered ? "md:opacity-40 md:scale-95 md:translate-y-4" : "md:hover:scale-100"}`;

          return (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              // 🎯 FIXED DESKTOP DIMENSIONS: Narrower width (md:w-[260px] lg:w-[280px]) so they don't clip, Taller height (md:h-[480px] lg:h-[520px])
              className={`service-card absolute md:relative top-0 left-0 right-0 mx-auto md:mx-0 md:-ml-16 lg:-ml-20 first:ml-0 w-[88%] sm:w-[350px] md:w-[260px] lg:w-[280px] h-[55vh] md:h-[480px] lg:h-[520px] flex-shrink-0 cursor-pointer ${isHovered ? 'z-50' : 'z-10'}`}
            >
              <div className={`${cardBaseClasses} ${service.colorClass} ${cardActiveClasses}`}>
                
                {/* STICKERS */}
                <div className={`absolute -top-8 -left-4 md:-top-10 md:-left-6 transition-transform duration-500 ease-out ${isHovered ? 'md:scale-110 md:-rotate-12' : 'md:scale-100'}`}>
                  {service.sticker}
                </div>

                {/* Changed h-full to justify-start so items sit nicely in the taller cards */}
                <div className="relative z-10 flex flex-col justify-start h-full mt-4">
                  <h3 className="text-3xl lg:text-4xl font-black tracking-tighter leading-[1.05] mb-4">
                    {service.title}
                  </h3>
                  
                  <div className="w-full h-[2px] bg-current opacity-20 mb-6" />
                  
                  <ul className="flex flex-col gap-3.5">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-semibold text-xs lg:text-sm">
                        <span className="mt-[2px] flex-shrink-0 text-[10px]">✦</span>
                        <span className="leading-tight opacity-95">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}