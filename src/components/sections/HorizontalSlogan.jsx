import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { triggerLogoRain } from '../../utils/logoRain';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSlogan() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null); 
  const arrowRef = useRef(null);
  const bottomContentRef = useRef(null); 
  
  // 🌟 Added a 4th sticker reference to fit all your PNGs
  const sticker1 = useRef(null);
  const sticker2 = useRef(null);
  const sticker3 = useRef(null);
  const sticker4 = useRef(null);

  const navigate = useNavigate(); 

  useGSAP(() => {
    // 1. Prepare Arrow
    const pathLength = arrowRef.current.getTotalLength();
    gsap.set(arrowRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    // 2. Hide ALL stickers initially
    gsap.set([sticker1.current, sticker2.current, sticker3.current, sticker4.current], { scale: 0, opacity: 0 });

    // 3. MASTER TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "+=250%", 
        scrub: 1.5,
        invalidateOnRefresh: true, 
      }
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=250%",
      pin: true,
    });

    // ==========================================
    // 🎬 THE TWO-LINE CHOREOGRAPHY
    // ==========================================

    // STEP 1: The Container Slide 
    tl.fromTo(wrapperRef.current, {
      x: () => window.innerWidth + 50 
    }, {
      x: () => -(wrapperRef.current.scrollWidth + 100),
      ease: "none",
      duration: 12 
    }, 0);

    // STEP 2: The LIVE Dispersed Assembly
    tl.fromTo('.scatter-letter', {
      y: (index) => (index % 2 === 0 ? "35vh" : "-35vh"), 
      x: (index) => (index % 2 === 0 ? 80 : -80), 
      opacity: 0,
      scale: 0.2, 
      rotateZ: (index) => (index % 2 === 0 ? 90 : -90)
    }, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      stagger: 0.1, 
      ease: "back.out(1.5)",
      duration: 1.5 
    }, 0.5); 

    // STEP 3: Pop-up PNG Stickers (Timed sequentially)
    tl.to(sticker1.current, { scale: 1, rotation: 15, opacity: 1, ease: "back.out(2)", duration: 0.5 }, 3);
    tl.to(sticker2.current, { scale: 1, rotation: -10, opacity: 1, ease: "back.out(2)", duration: 0.5 }, 4.5);
    tl.to(sticker3.current, { scale: 1, rotation: 10, opacity: 1, ease: "back.out(2)", duration: 0.5 }, 6);
    tl.to(sticker4.current, { scale: 1, rotation: -15, opacity: 1, ease: "back.out(2)", duration: 0.5 }, 7);

    // STEP 4: Draw Arrow 
    tl.to(arrowRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 7.5); 

    // STEP 5: Bottom Content Reveal (Text + Button)
    tl.fromTo(bottomContentRef.current, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 
      9 
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: sectionRef });

  // ✂️ SPLIT THE WORDS INTO TWO LINES
  const line1 = [
    { text: "we", isBrand: false },
    { text: "build", isBrand: false },
    { text: "brands", isBrand: true },
    { text: "in", isBrand: false },
    { text: "the", isBrand: false }
  ];

  const line2 = [
    { text: "center", isBrand: false },
    { text: "of", isBrand: false },
    { text: "their", isBrand: false },
    { text: "target", isBrand: true },
    { text: "market", isBrand: true }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden cursor-default"
    >
      
      {/* 🌟 POP-UP PNG STICKERS */}
      
      {/* 1. Digital Marketing */}
      <div ref={sticker1} className="absolute top-[25%] left-[20%] z-20 w-20 h-20 md:w-28 md:h-28">
        <img 
          src="/digital.png" 
          alt="Digital Marketing" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]" 
        />
      </div>

      {/* 2. Brand Identity */}
      <div ref={sticker2} className="absolute bottom-[20%] right-[15%] z-20 w-20 h-20 md:w-28 md:h-28">
        <img 
          src="/brand.png" 
          alt="Brand Identity" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]" 
        />
      </div>

      {/* 3. Cinematic Production */}
      <div ref={sticker3} className="absolute top-[15%] right-[40%] z-20 w-16 h-16 md:w-24 md:h-24">
        <img 
          src="/cinematic.png" 
          alt="Cinematic Production" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]" 
        />
      </div>

      {/* 4. VFX & 3D */}
      <div ref={sticker4} className="absolute bottom-[25%] left-[30%] z-20 w-16 h-16 md:w-24 md:h-24">
        <img 
          src="/vfx.png" 
          alt="VFX & 3D Animation" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]" 
        />
      </div>

      {/* 🏹 DRAWING ARROW */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center pt-[15vh]">
        <svg viewBox="0 0 800 400" className="w-full max-w-4xl h-auto">
          <path 
            ref={arrowRef}
            d="M 150 150 C 300 50, 450 50, 450 150 C 450 250, 350 250, 350 150 C 350 50, 600 50, 600 250" 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="5" 
            strokeLinecap="round"
          />
          <path d="M 580 230 L 600 250 L 620 230" fill="none" stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 🔠 THE FRAGMENTED HORIZONTAL SCROLLING TEXT */}
      <div className="relative z-30 w-full h-[30vh] flex items-center will-change-transform mt-[-10vh]">
        
        {/* 📦 THE NEW STACKED WRAPPER */}
        <div ref={wrapperRef} className="absolute left-0 flex flex-col w-max">
          
          {/* ⚡ LINE 1 */}
          <div className="flex whitespace-nowrap mb-2 md:mb-4">
            {line1.map((wordObj, wordIdx) => (
              <div key={`l1-${wordIdx}`} className="inline-flex mr-[3vw] md:mr-[2vw]">
                {wordObj.text.split('').map((char, charIdx) => (
                  <span 
                    key={`l1-c-${charIdx}`} 
                    className={`scatter-letter inline-block text-[9vw] md:text-[7vw] font-black tracking-[-0.05em] leading-none 
                      ${wordObj.isBrand ? 'text-primary drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]' : 'text-white'}`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* ⚡ LINE 2 */}
          <div className="flex whitespace-nowrap ml-28 md:ml-56">
            {line2.map((wordObj, wordIdx) => (
              <div key={`l2-${wordIdx}`} className="inline-flex mr-[3vw] md:mr-[2vw]">
                {wordObj.text.split('').map((char, charIdx) => (
                  <span 
                    key={`l2-c-${charIdx}`} 
                    className={`scatter-letter inline-block text-[9vw] md:text-[7vw] font-black tracking-[-0.05em] leading-none 
                      ${wordObj.isBrand ? 'text-primary drop-shadow-[0_0_15px_rgba(245,178,26,0.3)]' : 'text-white'}`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 📝 THE SEQUENCED SUBTEXT & BUTTON */}
      <div 
        ref={bottomContentRef}
        className="absolute top-[60%] md:top-[65%] z-30 max-w-4xl flex flex-col items-center text-center px-6 opacity-0"
      >
        <p className="text-gray-300 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-3xl">
          Open Technology PLC is an all-in-one creative, marketing, event, software & app development, web development, and production company based in Addis Ababa, Ethiopia. The company combines innovative digital solutions with VFX, 3D animation, cinematic production, and strategic marketing to create transformative brand experiences.
        </p>
        
        {/* 🚀 THE EXPLORE BUTTON (WITH TRANSITION) */}
        <a 
          href="/about"
          onClick={(e) => {
            e.preventDefault();
            triggerLogoRain(() => {
              navigate('/about');
              window.scrollTo(0, 0); 
            });
          }}
          className="group relative inline-flex items-center justify-center gap-3 mt-6 md:mt-8 px-8 py-3.5 rounded-full overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-primary"
        >
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></div>
          
          <span className="relative z-10 font-bold uppercase tracking-widest text-xs md:text-sm text-white group-hover:text-black transition-colors duration-300">
            Explore
          </span>
          
          <span className="relative z-10 w-5 h-5 flex items-center justify-center text-white group-hover:text-black transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>
      </div>

    </section>
  );
}