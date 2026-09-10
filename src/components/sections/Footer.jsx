import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { triggerLogoRain } from '../../utils/logoRain';

export default function Footer() {
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // 🧠 THE MASTER TRANSITION LOGIC
  const handleNavigation = (e, path) => {
    e.preventDefault();

    if (location.pathname === path) {
      // If already on the page, just trigger rain and scroll to top
      triggerLogoRain(() => {
        window.scrollTo({ top: 0, behavior: 'auto' }); 
      });
    } else {
      // Intercept route change, trigger rain, then change page
      triggerLogoRain(() => {
        navigate(path);
        window.scrollTo(0, 0);
      });
    }
  };

  const scrollToTop = () => {
    triggerLogoRain(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  };

  const socialLinks = [
    { 
      name: 'Facebook', 
      url: '#', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
    },
    { 
      name: 'Instagram', 
      url: '#', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    { 
      name: 'X', 
      url: '#', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.1581 3.5249H21.2821L14.4551 11.3219L22.4761 21.9219H16.2021L11.2861 15.4969L5.66311 21.9219H2.53711L9.83911 13.5689L2.14611 3.5249H8.57711L13.0231 9.3909L18.1581 3.5249ZM17.0621 20.0529H18.7901L7.63211 5.3049H5.78711L17.0621 20.0529Z"/></svg>
    },
    { 
      name: 'YouTube', 
      url: '#', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    },
    { 
      name: 'LinkedIn', 
      url: '#', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    }
  ];

  // Complete and proper routing data
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Works', path: '/works' },
    { name: 'Clients / Partners', path: '/clients' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="w-full bg-black py-4 px-4 md:px-6">
      
      <div 
        ref={footerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })} 
        className="relative w-full rounded-[2.5rem] border border-white/10 bg-[#050505] overflow-hidden flex flex-col pt-10"
      >
        
        {/* --- TOP GRID SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-8 px-6 md:px-16 pb-10 z-10">
          
          {/* Column 1: Logo & Socials */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase leading-none">
                Open<br/>Tech.
              </h2>
            </div>
            
            <div className="flex items-center gap-3 mt-8 md:mt-0">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Updated with Full Routing) */}
          <div className="col-span-1 flex flex-col gap-3">
            <h4 className="text-gray-500 font-medium text-sm mb-1">Quick Links</h4>
            {quickLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={(e) => handleNavigation(e, link.path)}
                className="text-white font-medium hover:text-primary transition-colors w-max cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Column 3: Location */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h4 className="text-gray-500 font-medium text-sm">Location</h4>
              <p className="text-white font-medium leading-relaxed text-sm">
                Abuki Building, 4th Floor, 404,<br />
                Lemi Kura Sub City,<br />
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          {/* Column 4: Contacts */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h4 className="text-gray-500 font-medium text-sm">Contact Us</h4>
              <a href="tel:+251989165874" className="text-white font-medium text-sm hover:text-primary transition-colors">
                +251 989 165 874
              </a>
              <a href="tel:+251940091308" className="text-white font-medium text-sm hover:text-primary transition-colors">
                +251 940 091 308
              </a>
              <a href="mailto:Opentechnologyplc@gmail.com" className="text-white font-medium text-sm hover:text-primary transition-colors w-max break-all mt-2">
                Opentechnologyplc@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM FLASHLIGHT TYPOGRAPHY --- */}
        <div className="relative w-full flex items-end justify-center mt-auto select-none overflow-hidden">
          
          <h1 className="text-[18vw] leading-[0.75] font-black uppercase tracking-tighter text-[#141414] w-full text-center whitespace-nowrap">
            OPEN TECH
          </h1>

          <h1 
            className="absolute bottom-0 text-[18vw] leading-[0.75] font-black uppercase tracking-tighter text-primary w-full text-center pointer-events-none whitespace-nowrap"
            style={{
              WebkitMaskImage: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
              maskImage: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`
            }}
          >
            OPEN TECH
          </h1>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs md:text-sm font-medium z-20 whitespace-nowrap">
            ©2026 Open Technology P.L.C. All Rights Reserved.
          </div>

          <button 
            onClick={scrollToTop}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 z-20 group cursor-pointer"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>

        </div>
      </div>
    </footer>
  );
}