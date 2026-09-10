import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { triggerLogoRain } from '../utils/logoRain';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. DATA SETUP
// ==========================================
const teamMembers = [
  { id: '01', name: 'Yonas Kebede', role: 'Creative Director / AI Director', img: '/yonas.png' },
  { id: '02', name: 'Nathenael Nasir', role: 'General Manager / Production Designer', img: '/nathnael.png' },
  { id: '03', name: 'Kidus Yared', role: 'Production Director / VFX Supervisor', img: '/kidus.png' },
  { id: '04', name: 'Nahom Tesfaye', role: 'Marketing Director / Cinematographer', img: '/nahome.png' },
  { id: '05', name: 'Nahom Nasir', role: 'Live Stream Expert', img: '/nasson.png' },
];

const narrativeContent = [
  {
    tag: "Who We Are",
    text: "Open Technology is an all-in-one creative, marketing, event, software & app development, web development, and production company based in Addis Ababa, Ethiopia. We combine innovative digital solutions with VFX, 3D animation, cinematic production, and strategic marketing to create transformative brand experiences."
  },
  {
    tag: "Our Story",
    text: "Founded in 2024, Open Technology was built around a simple belief: creativity and technology should work together. Today, we are moving deeper into advanced tech and AI capabilities while constantly helping companies grow and expanding our own creative boundaries."
  },
  {
    tag: "The Mission",
    text: "Empowering companies, brands, and creators to achieve their fullest potential through creative excellence, technology-driven strategies, and exceptional execution."
  }
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const narrativePinRef = useRef(null);
  const navigate = useNavigate();
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ==========================================
    // 1. HERO TEXT REVEAL
    // ==========================================
    gsap.fromTo('.hero-word', 
      { y: 100, opacity: 0, rotateX: -45 }, 
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.08, ease: 'power4.out', delay: 0.2 }
    );

    gsap.fromTo('.hero-sub', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, delay: 1, ease: 'power3.out' }
    );

    // ==========================================
    // 2. THE STATS COUNTER ANIMATION
    // ==========================================
    const stats = gsap.utils.toArray('.stat-number');
    stats.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const suffix = stat.getAttribute('data-suffix') || '';
      
      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(stat, 
            { innerHTML: 0 }, 
            { 
              innerHTML: target, 
              duration: 2.5, 
              ease: "power3.out", 
              snap: { innerHTML: 1 }, 
              onUpdate: function() {
                stat.innerHTML = Math.round(this.targets()[0].innerHTML) + suffix;
              }
            }
          );
        }
      });
    });

    // ==========================================
    // 3. STICKY NARRATIVE & TEXT SCRUB
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      // Pin the left side title on desktop
      ScrollTrigger.create({
        trigger: narrativePinRef.current,
        start: "top 15%",
        end: "bottom bottom",
        pin: ".narrative-left",
        pinSpacing: false,
      });
    });

    // Fade and slide the narrative blocks as you scroll
    gsap.utils.toArray('.narrative-block').forEach((block) => {
      gsap.fromTo(block, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
    });

    // ==========================================
    // 4. TEAM ACCORDION ENTRANCE
    // ==========================================
    gsap.fromTo('.team-accordion-container',
      { opacity: 0, scale: 0.95, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out",
        scrollTrigger: { trigger: ".team-section", start: "top 75%" }
      }
    );

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative w-full bg-black text-white overflow-hidden pb-32">
      
      {/* Ambient Glow */}
      <div className="absolute top-[10vh] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-primary rounded-full mix-blend-screen filter blur-[300px] opacity-[0.1] pointer-events-none" />

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-32 px-6 z-10 text-center">
        <div className="overflow-hidden mb-4">
          <span className="hero-sub block text-primary font-bold uppercase tracking-widest text-xs md:text-sm px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
            Addis Ababa, Ethiopia
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-[7vw] font-black uppercase tracking-tighter leading-[0.9] flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 max-w-6xl perspective-[1000px]">
          <span className="hero-word">Creativity</span>
          <span className="hero-word text-white/30">&</span>
          <span className="hero-word">Technology</span>
          <span className="hero-word">Working</span>
          <span className="hero-word text-primary italic font-serif font-normal lowercase pr-4">Together.</span>
        </h1>
      </section>

      {/* ==========================================
          THE STATS (Animated Counters)
      ========================================== */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-20 z-20 border-y border-white/10 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl rounded-[2rem] md:rounded-[4rem] mb-32">
        
        <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-4">
          <span className="stat-number text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none" data-target="2024">
            0
          </span>
          <span className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">Year Founded</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-4">
          <span className="stat-number text-6xl md:text-8xl font-black text-white tracking-tighter leading-none" data-target="30" data-suffix="+">
            0
          </span>
          <span className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">Young Professionals</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-4">
          <span className="stat-number text-6xl md:text-8xl font-black text-white tracking-tighter leading-none" data-target="6">
            0
          </span>
          <span className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">Core Departments</span>
        </div>

      </section>

      {/* ==========================================
          STICKY NARRATIVE SCROLL
      ========================================== */}
      <section ref={narrativePinRef} className="relative w-full max-w-7xl mx-auto px-6 mb-32 md:mb-48 flex flex-col md:flex-row items-start gap-16 md:gap-24 z-20">
        
        {/* Left: Sticky Title (Desktop) */}
        <div className="narrative-left w-full md:w-1/3 md:h-screen flex flex-col md:pt-40">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
            The <span className="text-primary italic font-serif font-normal lowercase">Story.</span>
          </h2>
          <p className="mt-6 text-gray-400 font-medium md:text-lg max-w-sm">
            We are moving deeper into advanced tech and AI capabilities while constantly expanding our own creative boundaries.
          </p>
        </div>

        {/* Right: Scrolling Text Blocks */}
        <div className="w-full md:w-2/3 flex flex-col md:pt-40 md:pb-[40vh] gap-24 md:gap-40">
          {narrativeContent.map((block, i) => (
            <div key={i} className="narrative-block flex flex-col">
              <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-primary/50" /> {block.tag}
              </span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-snug md:leading-tight text-white/90">
                {block.text}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          THE LEADERSHIP ACCORDION
      ========================================== */}
      <section className="team-section relative w-full px-4 md:px-12 mb-32 z-20">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Leadership <span className="text-primary italic font-serif font-normal lowercase">& Team.</span>
          </h2>
          <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">
            The minds behind the machine
          </p>
        </div>

        {/* The Accordion Engine:
            Uses flex-col on mobile and flex-row on desktop.
            flex-grow handles the smooth expansion. 
        */}
        <div className="team-accordion-container w-full max-w-[1500px] mx-auto h-[80vh] md:h-[70vh] flex flex-col md:flex-row gap-2 md:gap-4 rounded-[2rem] overflow-hidden">
          {teamMembers.map((member, index) => {
            const isActive = activeTeamIndex === index;
            
            return (
              <div 
                key={member.id}
                onMouseEnter={() => window.innerWidth >= 768 && setActiveTeamIndex(index)}
                onClick={() => setActiveTeamIndex(index)}
                className={`relative group overflow-hidden rounded-[1.5rem] bg-[#111] border border-white/5 cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex items-end
                  ${isActive ? 'flex-[4] md:flex-[5] shadow-2xl' : 'flex-[1] opacity-70 hover:opacity-100'}`}
              >
                {/* Background Image */}
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${isActive ? 'scale-100 grayscale-0' : 'scale-110 grayscale opacity-40'}
                  `}
                />
                
                {/* Gradient Mask for text readability */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80'}`} />

                {/* Content Block */}
                <div className="relative z-10 w-full p-6 md:p-10 flex flex-col justify-end h-full pointer-events-none">
                  
                  {/* Vertical ID (Visible when closed on Desktop) */}
                  <span className={`absolute top-6 left-6 md:top-8 md:left-8 text-primary font-black text-xl md:text-2xl transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                    {member.id}
                  </span>

                  {/* Name and Role (Animates in when active) */}
                  <div className={`flex flex-col transform transition-all duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 hidden md:flex'}`}>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none mb-2 md:mb-4 drop-shadow-lg whitespace-nowrap">
                      {member.name}
                    </h3>
                    <p className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs">
                      {member.role}
                    </p>
                  </div>
                  
                  {/* Mobile Closed State Name (Vertical text fallback) */}
                  <div className={`md:hidden absolute bottom-6 left-6 right-6 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white truncate">
                      {member.name}
                    </h3>
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
          Ready to build <span className="text-primary italic font-serif font-normal lowercase">together?</span>
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
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </span>
        </a>
      </div>

    </main>
  );
}