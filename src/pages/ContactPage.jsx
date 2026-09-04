import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { triggerLogoRain } from '../utils/logoRain';

// ==========================================
// 1. DATA SETUP
// ==========================================
const contactData = [
  { 
    label: "Email", 
    value: "Opentechnologyplc@gmail.com", 
    link: "mailto:Opentechnologyplc@gmail.com" 
  },
  { 
    label: "Website", 
    value: "Opentechnologyplc.com", 
    link: "https://opentechnologyplc.com" 
  },
  { 
    label: "Phone", 
    value: "+251 989 165 874 / +251 940 091 308", 
    link: "tel:+251989165874" 
  },
  { 
    label: "Location", 
    value: "Abuka Building, 6th Floor, Lemi Kura Sub City, Addis Ababa, Ethiopia", 
    link: null // No link for address, just text
  }
];

const socials = [
  {
    name: "Instagram",
    url: "#",
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  },
  {
    name: "Telegram",
    url: "#",
    icon: <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  },
  {
    name: "Behance",
    url: "#",
    icon: <path d="M22 7h-7v-2h7v2zM11.5 14.6c1.2-.4 2-1.4 2-2.8 0-2.3-1.6-3.8-4-3.8h-5v11h5.3c2.7 0 4.5-1.5 4.5-4 0-1.8-1-3.2-2.8-3.4zm-4.5-4.1h2.2c1.2 0 1.9.6 1.9 1.5 0 .9-.7 1.5-1.9 1.5h-2.2v-3zm2.5 6.5h-2.5v-3.3h2.6c1.3 0 2.2.6 2.2 1.7 0 1.1-1 1.6-2.3 1.6zM24 14.8c0-3.6-2.5-6.8-6.5-6.8-4.2 0-7 3.3-7 7.5s2.8 7.5 7.1 7.5c3.2 0 5.6-1.7 6.5-4.6h-3.1c-.5 1-1.6 1.7-3.1 1.7-1.9 0-3.1-1.2-3.3-3h9.4c0-.2.0-.3.0-.3zM13.8 13.1c.3-1.6 1.5-2.7 3.3-2.7 1.7 0 2.8 1 3.1 2.7h-6.4z"/>
  }
];

export default function ContactPage() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // 1. Cinematic Text Reveal (Left Side)
    gsap.fromTo('.reveal-text', 
      { y: 100, opacity: 0, rotateX: 45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    );

    // 2. Info List Reveal (Right Side)
    gsap.fromTo('.info-row',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.8 }
    );

    // 3. Socials Reveal (Bottom Left)
    gsap.fromTo('.social-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)', delay: 1.2 }
    );

    // ==========================================
    // 4. THE 3D LOGO INFINITE ROTATION
    // ==========================================
    // Spin horizontally on the Y axis
    gsap.to('.logo-3d', {
      rotationY: 360,
      duration: 12,
      repeat: -1,
      ease: 'none'
    });
    
    // Subtle breathing float to make it feel volumetric
    gsap.to('.logo-3d-wrapper', {
      y: -30,
      rotationX: 10,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between">
      
      {/* ==========================================
          THE 3D LOGO BACKGROUND
      ========================================== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Glow effect behind the logo */}
        <div className="absolute w-[50vw] h-[50vw] bg-primary rounded-full mix-blend-screen filter blur-[200px] opacity-[0.15]" />
        
        {/* The Logo Image 
            mix-blend-screen completely removes the black background from your image!
        */}
        <div className="logo-3d-wrapper relative w-[80vw] md:w-[45vw] aspect-square flex items-center justify-center perspective-[1000px]">
          <img 
            src="/image_9eddc6.jpg" 
            alt="3D OpenTech Logo" 
            className="logo-3d w-full h-full object-contain mix-blend-screen opacity-90"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>
      </div>

      {/* ==========================================
          TOP & MIDDLE: FOREGROUND CONTENT
      ========================================== */}
      <div className="relative z-10 w-full px-6 md:px-16 pt-32 md:pt-40 flex flex-col md:flex-row justify-between items-start h-full">
        
        {/* Left Side: Massive Typography */}
        <div className="w-full md:w-1/2 flex flex-col perspective-[1000px]">
          <div className="overflow-hidden mb-6">
            <span className="reveal-text inline-block text-primary font-bold uppercase tracking-widest text-xs md:text-sm px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
              Contact Us
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[6vw] font-black uppercase tracking-tighter leading-[0.9]">
            <div className="overflow-hidden"><span className="reveal-text inline-block">Let's Build</span></div>
            <div className="overflow-hidden"><span className="reveal-text inline-block text-white/50">Something</span></div>
            <div className="overflow-hidden"><span className="reveal-text inline-block text-primary italic font-serif font-normal lowercase">That Matters.</span></div>
          </h1>
        </div>

        {/* Right Side: Sleek Contact List */}
        <div className="w-full md:w-5/12 flex flex-col mt-16 md:mt-0 pb-32 md:pb-0">
          <div className="w-full border-t border-white/20" />
          
          {contactData.map((item, index) => (
            <div 
              key={index} 
              className="info-row group relative flex flex-col md:flex-row md:items-end justify-between py-6 md:py-8 border-b border-white/20 transition-colors duration-500 hover:border-primary"
            >
              <span className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-0 md:w-1/3">
                {item.label}
              </span>
              
              {item.link ? (
                <a 
                  href={item.link} 
                  target={item.label === 'Website' ? "_blank" : "_self"} 
                  rel="noreferrer"
                  className="text-lg md:text-2xl font-light text-white group-hover:text-primary transition-colors duration-300 md:w-2/3 text-left md:text-right hover:underline underline-offset-4 decoration-primary/50"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-lg md:text-xl font-light text-gray-300 md:w-2/3 text-left md:text-right leading-snug">
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          BOTTOM ROW: SOCIALS & BACK BUTTON
      ========================================== */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-12 pt-12 mt-auto flex flex-col-reverse md:flex-row justify-between items-center gap-8 border-t border-white/10 bg-black/40 backdrop-blur-md">
        
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mr-2">Follow Us</span>
          {socials.map((social, index) => (
            <a 
              key={index}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="social-icon w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
              aria-label={social.name}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>

        {/* Back to Home Button */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            triggerLogoRain(() => {
              navigate('/');
              window.scrollTo(0, 0);
            });
          }}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden border border-white/20 bg-transparent cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(245,178,26,0.2)]"
        >
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></div>
          <span className="relative z-10 font-black uppercase tracking-widest text-[10px] md:text-xs text-white group-hover:text-black transition-colors duration-300">
            Return to Homepage
          </span>
        </a>

      </div>
    </main>
  );
}