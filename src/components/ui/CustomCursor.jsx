import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-6 h-6 bg-primary rounded-full pointer-events-none z-[100] mix-blend-difference"
      animate={{ 
        x: mousePosition.x - 12, 
        y: mousePosition.y - 12  
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 28, 
        mass: 0.5 
      }}
    />
  );
}