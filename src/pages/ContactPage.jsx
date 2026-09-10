import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { triggerLogoRain } from '../utils/logoRain';

gsap.registerPlugin(ScrollTrigger);

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
  }
];

export default function ContactPage() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // FORM STATE LOGIC
  const [formData, setFormData] = useState({ company: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate sending data (5 second delay)
    setTimeout(() => {
      // Clear the form fields
      setFormData({ company: '', email: '', message: '' });
      // Set status to success
      setFormStatus('success');

      // Optional: Hide the success message after 4 seconds to reset the form
      setTimeout(() => {
        setFormStatus('idle');
      }, 4000);
    }, 5000);
  };

  useGSAP(() => {
    // 1. Cinematic Text Reveal 
    gsap.fromTo('.reveal-text', 
      { y: 100, opacity: 0, rotateX: 45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    );

    // 2. Bento Grid Reveal
    gsap.fromTo('.bento-card',
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.5 }
    );

    // 3. Lead Generation Cards Reveal
    gsap.fromTo('.lead-card',
      { y: 100, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.lead-section', start: 'top 85%' }
      }
    );

    // 4. Socials Reveal
    gsap.fromTo('.social-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)', delay: 1.2 }
    );

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-[20%] w-[50vw] h-[50vw] bg-primary rounded-full mix-blend-screen filter blur-[300px] opacity-[0.12] pointer-events-none" />

      {/* ==========================================
          TOP: HERO TYPOGRAPHY
      ========================================== */}
      <div className="relative z-10 w-full px-6 md:px-16 pt-32 md:pt-40 flex flex-col items-center text-center perspective-[1000px]">
        <div className="overflow-hidden mb-6">
          <span className="reveal-text inline-block text-primary font-bold uppercase tracking-widest text-xs md:text-sm px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md shadow-[0_0_20px_rgba(245,178,26,0.15)]">
            Start a Project
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.9]">
          <div className="overflow-hidden"><span className="reveal-text inline-block">Let's Build</span></div>
          <div className="overflow-hidden">
            <span className="reveal-text inline-block text-white/40">Something</span>{' '}
            <span className="reveal-text inline-block text-primary italic font-serif font-normal lowercase">Extraordinary.</span>
          </div>
        </h1>
      </div>

      {/* ==========================================
          THE BENTO GRID (Map + Direct Contact)
      ========================================== */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[450px]">
          
          {/* 📍 THE MAP CARD (Spans 8 Columns) */}
          <a
            href="https://www.google.com/maps/place/Open+technology+digital+marketing+and+communication+agency+PLC/@9.0159057,38.8723161,202m/data=!3m1!1e3!4m6!3m5!1s0x164b9b5d3f2765b7:0xa5d3e6382cf54d66!8m2!3d9.0159895!4d38.8718237!16s%2Fg%2F11wwqn_mz4!5m1!1e4?authuser=0&entry=ttu&g_ep=EgoyMDI2MDkwNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="bento-card md:col-span-8 relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] group cursor-pointer aspect-square md:aspect-auto"
          >
            <img 
              src="/map.png" 
              alt="OTP Headquarters Location" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 opacity-70 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-60" />
            
            <div className="absolute bottom-8 left-8 pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(245,178,26,0.8)]" />
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Global Headquarters</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white drop-shadow-md">
                Addis Ababa, Ethiopia
              </h3>
              <p className="text-gray-400 font-medium text-sm mt-1 max-w-sm">Abuka Building, 4th Floor, 404, Lemi Kura Sub City</p>
            </div>

            <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Open in Maps</span>
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </div>
          </a>

          {/* 📱 DIRECT CONTACT CARDS (Spans 4 Columns, Stacked) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Email Card */}
            <a 
              href="mailto:Opentechnologyplc@gmail.com"
              className="bento-card flex-1 bg-[#111] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-primary hover:text-black transition-colors duration-500 cursor-pointer overflow-hidden relative"
            >
              <div className="flex justify-between items-center relative z-10">
                <span className="text-gray-500 group-hover:text-black/60 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors">Direct Email</span>
                <svg className="w-6 h-6 text-white group-hover:text-black -rotate-45 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black tracking-tighter leading-none text-white group-hover:text-black transition-colors">
                  Opentechnologyplc<br/>@gmail.com
                </h3>
              </div>
            </a>

            {/* Phone Card */}
            <a 
              href="tel:+251989165874"
              className="bento-card flex-1 bg-[#111] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer overflow-hidden relative"
            >
              <div className="flex justify-between items-center relative z-10">
                <span className="text-gray-500 group-hover:text-black/60 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors">Direct Phone</span>
                <svg className="w-6 h-6 text-white group-hover:text-black transform group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black tracking-tighter leading-none text-white group-hover:text-black transition-colors">
                  +251 989 165 874 <br/> <span className="text-lg text-gray-500 group-hover:text-black/50">+251 940 091 308</span>
                </h3>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* ==========================================
          LOWER: LEAD GENERATION (INQUIRY FORM & BOOKING)
      ========================================== */}
      <section className="lead-section relative w-full max-w-[1600px] mx-auto px-6 md:px-16 py-24 md:py-32 z-20">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-auto md:min-h-[400px]">
          
          {/* 📝 DIRECT INQUIRY FORM */}
          <div className="lead-card flex-1 bg-[#111] rounded-[2rem] border border-white/5 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-[80px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
            
            <div className="relative z-10 w-full">
              <span className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3 block">Project Inquiry</span>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3 text-white">
                Start the <span className="text-primary italic font-serif font-normal lowercase">Conversation.</span>
              </h3>
              <p className="text-gray-400 font-medium text-xs md:text-sm mb-6 max-w-sm">
                Tell us about your vision, timeline, and goals. Our strategy team will get back to you within 24 hours.
              </p>
              
              <form onSubmit={handleFormSubmit} className="flex flex-col w-full gap-4">
                {/* Top Row: Company & Email */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    disabled={formStatus === 'submitting'}
                    placeholder="Company Name" 
                    required
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={formStatus === 'submitting'}
                    placeholder="Email Address" 
                    required
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                  />
                </div>
                
                {/* Bottom Row: Message */}
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  disabled={formStatus === 'submitting'}
                  placeholder="Tell us about your project..." 
                  required
                  rows="3"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-50"
                />
                
                {/* Submit Button & Success Indicator */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-1">
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] px-8 py-3.5 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(245,178,26,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {formStatus === 'success' && (
                    <span className="text-green-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
                      Message sent successfully!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* 📅 MEETING BOOKING */}
          <div className="lead-card flex-1 bg-primary rounded-[2rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group text-black">
            <div className="relative z-10 flex flex-col h-full justify-center items-start">
              <span className="text-black/60 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 block">Ready to start?</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Book a <span className="italic font-serif font-normal lowercase text-white">Discovery Call.</span>
              </h3>
              <p className="text-black/80 font-bold text-sm mb-8 max-w-sm">
                Speak directly with our strategy team. Choose a time that works for you, and let's map out your digital future.
              </p>
              
              <a 
                href="https://calendly.com/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-black text-white font-bold uppercase tracking-widest text-[10px] md:text-xs px-8 py-4 rounded-full flex items-center gap-3 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Schedule Meeting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>

        </div>
      </section>

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