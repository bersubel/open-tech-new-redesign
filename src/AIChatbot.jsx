import { useState, useRef, useEffect } from 'react';

// ==========================================
// EXPANDED FAQ DATA (With HTML Links)
// ==========================================
const faqs = [
  { 
    q: "What services do you offer?", 
    a: "We specialize in Cinematic Production, Brand Identity, High-Performance Websites, and Digital Marketing." 
  },
  { 
    q: "How do I book a meeting?", 
    a: "You can schedule a discovery call with our team using the 'Schedule Meeting' section on the Contact page!" 
  },
  { 
    q: "Where are you located?", 
    a: "Our headquarters are on the 4th Floor of Abuka Building, Lemi Kura Sub City, Addis Ababa.<br/><br/>📍 <a href='https://maps.app.goo.gl/qw71sxpfYBEKoAap6' target='_blank' rel='noopener noreferrer' class='text-[#F5B21A] hover:underline font-bold'>View on Google Maps</a>" 
  },
  { 
    q: "Do you work internationally?", 
    a: "Absolutely! While we are headquartered in Addis Ababa, we collaborate with brands and clients globally." 
  },
  { 
    q: "What is your pricing?", 
    a: "Our pricing is project-based and tailored to your specific needs. Let's book a discovery call to discuss your vision and get a quote." 
  },
  { 
    q: "How long does a website take?", 
    a: "A high-end, Awwwards-caliber website typically takes 4-8 weeks depending on the complexity and 3D elements required." 
  },
  { 
    q: "Do you do social media?", 
    a: "Yes, our Digital Marketing team handles end-to-end social media management, content strategy, and paid advertising campaigns." 
  }
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I am the OpenTechnology PLC Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text, isFaq = false, faqAnswer = '') => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Processing Delay
    setTimeout(() => {
      setIsTyping(false);
      if (isFaq) {
        setMessages(prev => [...prev, { type: 'bot', text: faqAnswer }]);
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: "I am currently in demo mode! To answer real custom questions, Use the FAQ section or contact us directly." }]);
      }
    }, 1500);
  };

  return (
    // 🛡️ THE WRAPPER: Now purely fixed to the button's exact size. No more invisible dead zones!
    <div className="fixed bottom-6 right-6 z-[9999]">
      
      {/* 🤖 THE CHAT WINDOW (Absolutely positioned above the button) */}
      <div 
        className={`absolute bottom-[calc(100%+16px)] right-0 mb-2 w-[85vw] sm:w-[340px] bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-400 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none'}`}
      >
        {/* Header - Scaled down padding */}
        <div className="bg-primary px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-primary">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2H8a2 2 0 0 1-2-2v-2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2h4zm0 2h-4v2H8v2H6v2H4v4h2v2h2v2h4v2h4v-2h2v-2h2v-2h2v-4h-2v-2h-2V8h-2V6h-2V4z"/></svg>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-widest text-black text-xs leading-tight">Open Technology PLC Assistant</h3>
              <span className="text-[9px] text-black/70 font-bold uppercase tracking-widest block">Online</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Message Area - Reduced height to 250px so it doesn't take up the whole screen */}
        <div className="p-4 h-[250px] overflow-y-auto flex flex-col gap-3 bg-gradient-to-b from-transparent to-black/20">
          {messages.map((msg, i) => {
            const isUser = msg.type === 'user';
            return (
              <div 
                key={i} 
                className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed ${
                  isUser 
                    ? 'bg-primary text-black self-end rounded-br-sm' 
                    : 'bg-white/10 text-white self-start rounded-bl-sm border border-white/5'
                }`}
              >
                {/* Secure HTML Injection for Bot Messages Only */}
                {isUser ? (
                  msg.text
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                )}
              </div>
            );
          })}
          
          {isTyping && (
            <div className="bg-white/10 border border-white/5 text-white self-start rounded-2xl rounded-bl-sm p-3 flex gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* TWO-ROW FAQ QUICK CHIPS - Thinner scrollbar */}
        <div 
          className="px-3 pb-3 pt-1 grid grid-rows-2 grid-flow-col gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-black/40 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-colors" 
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {faqs.map((faq, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(faq.q, true, faq.a)}
              className="flex-shrink-0 w-fit whitespace-nowrap text-[9px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-primary px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              style={{ scrollSnapAlign: 'start' }}
            >
              {faq.q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-white/10 bg-black/50 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Type a question..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            onClick={() => handleSend(inputValue)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>

      {/* 🚀 THE TOGGLE BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary border-2 border-black shadow-[0_0_30px_rgba(245,178,26,0.3)] flex items-center justify-center text-black hover:scale-110 transition-transform duration-300 relative z-10"
      >
        {isOpen ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        )}
      </button>

    </div>
  );
}