export default function LeadGeneration() {
  return (
    <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-12 py-20 z-20">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-auto md:h-[400px]">
        
        {/* 📧 NEWSLETTER SIGNUP */}
        <div className="flex-1 bg-[#111] rounded-[2rem] border border-white/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-[80px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 block">Insider Access</span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
              Join the <span className="text-primary italic font-serif font-normal lowercase">Network.</span>
            </h3>
            <p className="text-gray-400 font-medium text-sm mb-8 max-w-sm">
              Subscribe to get exclusive insights on digital strategy, branding, and our latest cinematic case studies.
            </p>
            
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button type="submit" className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-full hover:bg-white hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 📅 MEETING BOOKING */}
        <div className="flex-1 bg-primary rounded-[2rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group text-black">
          <div className="relative z-10">
            <span className="text-black/60 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 block">Ready to start?</span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Book a <span className="italic font-serif font-normal lowercase text-white">Discovery Call.</span>
            </h3>
            <p className="text-black/80 font-bold text-sm mb-8 max-w-sm">
              Speak directly with our strategy team. Choose a time that works for you, and let's map out your digital future.
            </p>
            
            {/* 💡 PRO TIP: Wrap this button in an <a> tag pointing to your Calendly link! */}
            <button className="bg-black text-white font-bold uppercase tracking-widest text-[10px] md:text-xs px-8 py-4 rounded-full flex items-center gap-3 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-xl">
              Schedule Meeting
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}