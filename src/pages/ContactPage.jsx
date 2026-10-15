import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { triggerLogoRain } from '../utils/logoRain';

gsap.registerPlugin(ScrollTrigger);

const socials = [
{ 
      name: 'Facebook', 
      url: 'https://www.facebook.com/profile.php?id=61578614340935&mibextid=ZbWKwL', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/opentech_et?srtk=M3NhNG4zNmltejR2', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    { 
      name: 'TikTok', 
      url: 'https://www.tiktok.com/@opentech_et?_r=1&_t=ZS-9AUjDNkQt9Q', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
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