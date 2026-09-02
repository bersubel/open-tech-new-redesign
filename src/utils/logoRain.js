import gsap from 'gsap';

export const triggerLogoRain = (callback) => {
  // 1. Create a full-screen overlay container
  const container = document.createElement('div');
  // Removed the background color completely!
  container.className = 'fixed inset-0 z-[99999] pointer-events-none overflow-hidden';
  document.body.appendChild(container);

  // 2. Generate the "Rain" (100 logos)
  const logoCount = 100;
  const logos = [];

  for (let i = 0; i < logoCount; i++) {
    const logo = document.createElement('img');
    logo.src = '/Opentechlogo.png'; 
    logo.className = 'absolute top-0 left-0 drop-shadow-[0_0_15px_rgba(245,178,26,0.8)]';
    
    const size = Math.random() * 45 + 15; 
    const startX = Math.random() * window.innerWidth;
    const startY = -(Math.random() * 1200 + 100); 
    
    gsap.set(logo, {
      width: size,
      x: startX,
      y: startY,
      rotation: Math.random() * 360, 
      opacity: Math.random() * 0.6 + 0.2, 
    });
    
    container.appendChild(logo);
    logos.push(logo);
  }

  // 3. Create the MASSIVE center logo
  const centerContainer = document.createElement('div');
  centerContainer.className = 'absolute inset-0 flex items-center justify-center';
  
  const centerLogo = document.createElement('img');
  centerLogo.src = '/Opentechlogo.png';
  centerLogo.className = 'relative z-10 w-32 md:w-48 drop-shadow-[0_0_40px_rgba(245,178,26,1)]';
  gsap.set(centerLogo, { scale: 0, opacity: 0, rotation: -90 });
  
  centerContainer.appendChild(centerLogo);
  container.appendChild(centerContainer);

  // ==========================================
  // 🎬 THE CHOREOGRAPHY
  // ==========================================

  // Animate the rain falling down the screen (directly over your UI!)
  gsap.to(logos, {
    y: window.innerHeight + 200, 
    rotation: "+=360", 
    duration: () => Math.random() * 2 + 1, 
    ease: "none",
  });

  // Animate the Center Logo bursting in
  gsap.to(centerLogo, {
    scale: 1.5,
    opacity: 1,
    rotation: 0,
    duration: 1,
    ease: "back.out(1.5)",
    onComplete: () => {
      // ⚡ The callback fires (snaps to top) while the giant logo distracts the user!
      if (callback) callback();
      
      // Fade everything away smoothly
      setTimeout(() => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => container.remove() 
        });
      }, 300);
    }
  });
};