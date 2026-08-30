import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Import UI & Navigation Components
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/sections/Navbar';

// Import Page Sections
import Hero from './components/sections/Hero';
import HorizontalSlogan from './components/sections/HorizontalSlogan';
import Services from './components/sections/Services';
import ShortVideo from './components/sections/ShortVideo';
import Team from './components/sections/Team';
import PartnersMarquee from './components/sections/PartnersMarquee';
import Footer from './components/sections/Footer'; 

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const logoContainerRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);

  useGSAP(() => {
    
    // ==========================================
    // 1. INFINITE SLOW ROTATION
    // Applies ONLY to the image, preventing transform conflicts
    // ==========================================
    gsap.to(".spin-logo", {
      rotation: 360,
      repeat: -1,
      duration: 25, // Extremely slow, luxurious rotation
      ease: "none"
    });

    // ==========================================
    // 2. CONTEXTUAL SCROLL ROUTING
    // Added slightly higher scrub (1.5) for a more buttery, fluid glide.
    // ==========================================

    // 1. Hero -> Slogan (Moves from Bottom Right to Bottom Left, Normal Size)
    gsap.to(logoContainerRef.current, {
      left: "15vw", 
      top: "85vh",
      scale: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#section-slogan",
        start: "top bottom",
        end: "center center",
        scrub: 1.5 
      }
    });

    // 2. Slogan -> Services (Shrinks massively and stays Bottom Left)
    gsap.to(logoContainerRef.current, {
      scale: 0.5, // Shrunk size as requested
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#section-services",
        start: "top bottom",
        end: "center center",
        scrub: 1.5,
        immediateRender: false
      }
    });

    // 3. Services -> Short Video (Moves to Dead Center & Scales up massively)
    gsap.to(logoContainerRef.current, {
      left: "50vw",
      top: "50vh",
      scale: 1.6, // Very prominent before it splits
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#section-video",
        start: "top bottom",
        end: "center center",
        scrub: 1.5,
        immediateRender: false
      }
    });

    // 4. INSIDE Short Video (Smoothly splits to both edges)
    // Animating the wrapper boxes, NOT the spinning images, to prevent cracking!
    gsap.to(logoLeftRef.current, {
      x: "-38vw",
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#section-video",
        start: "center center",
        end: "bottom center",
        scrub: 1.5
      }
    });
    gsap.to(logoRightRef.current, {
      x: "38vw",
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#section-video",
        start: "center center",
        end: "bottom center",
        scrub: 1.5
      }
    });

    // 5. Video -> Team (Merges back together instantly & drops to Bottom Right)
    gsap.to([logoLeftRef.current, logoRightRef.current], {
      x: 0,
      ease: "power2.in",
      scrollTrigger: {
        trigger: "#section-team",
        start: "top bottom",
        end: "top center", // Merges early as the section enters
        scrub: 1.5,
        immediateRender: false
      }
    });
    gsap.to(logoContainerRef.current, {
      left: "85vw",
      top: "85vh",
      scale: 0.8, // Slightly reduced size
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#section-team",
        start: "top bottom",
        end: "center center",
        scrub: 1.5,
        immediateRender: false
      }
    });

    // 6. Team -> Partners (Glides up to the Top Left)
    gsap.to(logoContainerRef.current, {
      left: "15vw",
      top: "15vh",
      scale: 0.8,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#section-partners",
        start: "top bottom",
        end: "center center",
        scrub: 1.5,
        immediateRender: false
      }
    });

    // 7. Partners -> Footer (Locks perfectly beside the "OPEN TECH." text)
    gsap.to(logoContainerRef.current, {
      left: "26vw", // Pushed out exactly to the right of the first grid column
      top: "55vh",  // Centered vertically with the grid text when scrolled to bottom
      scale: 1.2,   // Scaled back up to match the bold footer typography
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#section-footer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.5,
        immediateRender: false
      }
    });
  });

  return (
    <div className="relative w-full bg-black text-white font-sans selection:bg-primary selection:text-black">
      
      <CustomCursor />
      <Navbar />

      {/* ==========================================
          GLOBAL FLOATING DYNAMIC LOGO
      ========================================== */}
      {/* Starting Position: Bottom Right (85vw, 85vh) & Scaled up slightly for Hero */}
      <div 
        ref={logoContainerRef} 
        className="fixed z-[90] pointer-events-none w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(245,178,26,0.6)] scale-[1.2]"
        style={{ left: '85vw', top: '85vh' }}
      >
        {/* Left Twin Wrapper (Handles the sliding independently) */}
        <div ref={logoLeftRef} className="absolute inset-0 w-full h-full">
          <img 
            src="/Opentechlogo.png" 
            alt="Open Tech Global" 
            className="spin-logo absolute inset-0 w-full h-full object-contain" 
          />
        </div>
        
        {/* Right Twin Wrapper (Handles the sliding independently) */}
        <div ref={logoRightRef} className="absolute inset-0 w-full h-full">
          <img 
            src="/Opentechlogo.png" 
            alt="Open Tech Global" 
            className="spin-logo absolute inset-0 w-full h-full object-contain" 
          />
        </div>
      </div>

      {/* ==========================================
          WRAPPED SCROLLING CONTENT
      ========================================== */}
      <main id="main-content" className="relative z-10 bg-black-soft w-full overflow-hidden">
        <div id="section-hero"><Hero /></div>
        <div id="section-slogan"><HorizontalSlogan /></div>
        <div id="section-services"><Services /></div>
        <div id="section-video"><ShortVideo /></div>
        <div id="section-team"><Team /></div>
        <div id="section-partners"><PartnersMarquee /></div>
      </main>

      {/* FOOTER SECTION */}
      <div id="section-footer"><Footer /></div>
      
    </div>
  );
}