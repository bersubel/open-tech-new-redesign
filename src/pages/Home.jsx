import { useRef } from 'react';
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

  useGSAP(() => {
    let mm = gsap.matchMedia();
    
    // 1. INFINITE SLOW ROTATION
    gsap.to(".spin-logo", {
      rotation: 360,
      repeat: -1,
      duration: 25, 
      ease: "none"
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
      // Adjusted the end trigger slightly since the Footer is now outside this component
      gsap.to(logoContainerRef.current, {
        left: "26vw", top: "55vh", scale: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: "#section-partners", start: "center center", end: "bottom bottom", scrub: 1.5, immediateRender: false }
      });
    });

    // --- MOBILE ANIMATIONS (< 768px) ---
    mm.add("(max-width: 767px)", () => {
      gsap.to(logoContainerRef.current, {
        left: "20vw", top: "80vh", scale: 0.8, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-slogan", start: "top bottom", end: "center center", scrub: 1 }
      });
      gsap.to(logoContainerRef.current, {
        scale: 0.45, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-services", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "50vw", top: "50vh", scale: 1, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-video", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoLeftRef.current, {
        x: "-28vw", ease: "power2.out",
        scrollTrigger: { trigger: "#section-video", start: "center center", end: "bottom center", scrub: 1 }
      });
      gsap.to(logoRightRef.current, {
        x: "28vw", ease: "power2.out",
        scrollTrigger: { trigger: "#section-video", start: "center center", end: "bottom center", scrub: 1 }
      });
      gsap.to([logoLeftRef.current, logoRightRef.current], {
        x: 0, ease: "power2.in",
        scrollTrigger: { trigger: "#section-team", start: "top bottom", end: "top center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "80vw", top: "80vh", scale: 0.6, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-team", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "15vw", top: "15vh", scale: 0.6, ease: "power2.inOut",
        scrollTrigger: { trigger: "#section-partners", start: "top bottom", end: "center center", scrub: 1, immediateRender: false }
      });
      gsap.to(logoContainerRef.current, {
        left: "22vw", top: "35vh", scale: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: "#section-partners", start: "center center", end: "bottom bottom", scrub: 1, immediateRender: false }
      });
    });

    return () => mm.revert();
  });

  return (
    <>
      <div 
        ref={logoContainerRef} 
        className="fixed z-[90] pointer-events-none w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(245,178,26,0.6)] scale-[1.2]"
        style={{ left: '85vw', top: '85vh' }}
      >
        <div ref={logoLeftRef} className="absolute inset-0 w-full h-full">
          <img 
            src="/Opentechlogo.png" 
            alt="Open Tech Global" 
            className="spin-logo absolute inset-0 w-full h-full object-contain" 
          />
        </div>
        <div ref={logoRightRef} className="absolute inset-0 w-full h-full">
          <img 
            src="/Opentechlogo.png" 
            alt="Open Tech Global" 
            className="spin-logo absolute inset-0 w-full h-full object-contain" 
          />
        </div>
      </div>

      <main id="main-content" className="relative z-10 bg-black-soft w-full overflow-hidden">
        <div id="section-hero"><Hero /></div>
        <div id="section-slogan"><HorizontalSlogan /></div>
        <div id="section-services"><Services /></div>
        <div id="section-video"><ShortVideo /></div>
        <div id="section-team"><Team /></div>
        <div id="section-partners"><PartnersMarquee /></div>
      </main>
    </>
  );
}