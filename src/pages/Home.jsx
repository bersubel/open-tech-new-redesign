import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Import Page Sections
import Hero from '../components/sections/Hero';
import HorizontalSlogan from '../components/sections/HorizontalSlogan';
import Services from '../components/sections/Services';
import ShortVideo from '../components/sections/ShortVideo';
import Team from '../components/sections/Team';
import PartnersMarquee from '../components/sections/PartnersMarquee';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const logoContainerRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);
  
  const tiltRef = useRef(null);
  const bobRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    
    // 1. INFINITE SLOW ROTATION
    gsap.to(".spin-logo", {
      rotation: 360,
      repeat: -1,
      duration: 25, 
      ease: "none"
    });

    // 2. ORGANIC LEVITATION (Continuous breathing effect)
    gsap.to(bobRef.current, {
      y: "-=12",
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut"
    });

    // --- DESKTOP ANIMATIONS (>= 768px) ---
    mm.add("(min-width: 768px)", () => {
      gsap.to(logoContainerRef.current, {
        left: "15vw", top: "85vh", scale: 1, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-slogan", start: "top bottom", end: "center center", scrub: 1.5 }
      });
      gsap.to(logoContainerRef.current, {
        scale: 0.5, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-services", start: "top bottom", end: "center center", scrub: 1.5, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "50vw", top: "50vh", scale: 1.6, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-video", start: "top bottom", end: "center center", scrub: 1.5, immediateRender: false }
      });
      gsap.to(logoLeftRef.current, {
        x: "-38vw", ease: "power2.out",
        scrollTrigger: { trigger: "#section-video", start: "center center", end: "bottom center", scrub: 1.5 }
      });
      gsap.to(logoRightRef.current, {
        x: "38vw", ease: "power2.out",
        scrollTrigger: { trigger: "#section-video", start: "center center", end: "bottom center", scrub: 1.5 }
      });
      gsap.to([logoLeftRef.current, logoRightRef.current], {
        x: 0, ease: "power2.in",
        scrollTrigger: { trigger: "#section-team", start: "top bottom", end: "top center", scrub: 1.5, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "85vw", top: "85vh", scale: 0.8, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-team", start: "top bottom", end: "center center", scrub: 1.5, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "15vw", top: "15vh", scale: 0.8, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-partners", start: "top bottom", end: "center center", scrub: 1.5, immediateRender: false }
      });
      
      // 🎯 FINAL DESKTOP PLACEMENT
      gsap.to(logoContainerRef.current, {
        left: "22vw", top: "35vh", scale: 0.85, ease: "power2.out",
        scrollTrigger: { 
          trigger: "#main-content", 
          start: "bottom 85%", 
          end: "bottom 15%", 
          scrub: 1.5, 
          immediateRender: false 
        }
      });
    });

    // --- MOBILE ANIMATIONS (< 768px) ---
    mm.add("(max-width: 767px)", () => {
      gsap.to(logoContainerRef.current, {
        left: "15vw", top: "85vh", scale: 0.9, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-slogan", start: "top bottom", end: "center center", scrub: 1 }
      });
      gsap.to(logoContainerRef.current, {
        scale: 0.6, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-services", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "50vw", top: "50vh", scale: 1.3, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-video", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoLeftRef.current, {
        x: "-35vw", ease: "power2.out",
        scrollTrigger: { trigger: "#section-video", start: "center center", end: "bottom center", scrub: 1 }
      });
      gsap.to(logoRightRef.current, {
        x: "35vw", ease: "power2.out",
        scrollTrigger: { trigger: "#section-video", start: "center center", end: "bottom center", scrub: 1 }
      });
      gsap.to([logoLeftRef.current, logoRightRef.current], {
        x: 0, ease: "power2.in",
        scrollTrigger: { trigger: "#section-team", start: "top bottom", end: "top center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "85vw", top: "85vh", scale: 0.7, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-team", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "15vw", top: "15vh", scale: 0.7, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-partners", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      
      // 🎯 FINAL MOBILE PLACEMENT: Shifted to the right side for vertical layouts
      gsap.to(logoContainerRef.current, {
        left: "75vw", 
        top: "22vh", 
        scale: 0.75, 
        ease: "power2.out",
        scrollTrigger: { 
          trigger: "#main-content", 
          start: "bottom 85%", 
          end: "bottom 15%", 
          scrub: 1, 
          immediateRender: false 
        }
      });
    });

    return () => mm.revert();
  });

  // 3. GLOBAL MOUSE TRACKING (3D Tilt & Magnetic Drift)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(tiltRef.current, {
        rotateX: yPos * -25, 
        rotateY: xPos * 25,  
        x: xPos * 20,        
        y: yPos * 20,        
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={logoContainerRef} 
        className="fixed z-[90] pointer-events-none w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 scale-[1.2]"
        style={{ left: '85vw', top: '85vh', perspective: '1000px' }}
      >
        <div ref={bobRef} className="w-full h-full">
          <div ref={tiltRef} className="relative w-full h-full transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
            
            <div ref={logoLeftRef} className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(20px)' }}>
              <img 
                src="/Opentechlogo.png" 
                alt="Open Tech Global" 
                className="spin-logo absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_8px_rgba(245,178,26,0.5)]" 
              />
            </div>
            <div ref={logoRightRef} className="absolute inset-0 w-full h-full" style={{ transform: 'translateZ(20px)' }}>
              <img 
                src="/Opentechlogo.png" 
                alt="Open Tech Global" 
                className="spin-logo absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_8px_rgba(245,178,26,0.5)]" 
              />
            </div>

          </div>
        </div>
      </div>

      <main id="main-content" className="relative z-10 bg-black-soft w-full overflow-hidden">
        <div id="section-hero" className="relative z-20">
          <Hero />
        </div>
        
        <div id="section-slogan" className="relative z-10 -mt-12 md:-mt-24 pt-12 md:pt-24">
          <HorizontalSlogan />
        </div>
        
        <div id="section-services"><Services /></div>
        <div id="section-video"><ShortVideo /></div>
        <div id="section-team"><Team /></div>
        <div id="section-partners"><PartnersMarquee /></div>
      </main>
    </>
  );
}