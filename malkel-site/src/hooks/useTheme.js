import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // WebKit/Safari Repaint invalidation fix:
    // Forces WebKit to instantly discard stale GPU layers and repaint layout
    const body = document.body;
    if (body) {
      body.classList.add('theme-changing');
      const _ = body.offsetHeight; // Forces synchronous layout recalculation
      requestAnimationFrame(() => {
        body.classList.remove('theme-changing');
      });
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
