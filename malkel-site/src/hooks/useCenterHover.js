import { useState, useEffect, useRef } from 'react';

export function useCenterHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (window.innerWidth > 1024) {
        if (isHovered) setIsHovered(false);
        return;
      }
      
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const elCenter = rect.top + (rect.height / 2);
      const viewCenter = window.innerHeight / 2;
      
      // The threshold distance. If element center is within 180px of screen center.
      // This is relatively strict to ensure only 1 (maybe 2 if small) elements trigger at once.
      const isCentered = Math.abs(elCenter - viewCenter) < 200;
      
      if (isHovered !== isCentered) {
        setIsHovered(isCentered);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Trigger immediately on mount to check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHovered]);

  return [ref, isHovered];
}
