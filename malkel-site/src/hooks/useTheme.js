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

    // iOS Safari composite invalidation: layout flush alone leaves cached GPU
    // tiles intact, so composited descendants (backdrop-filter, mix-blend-mode,
    // will-change, translateZ) keep showing the previous theme until they
    // scroll off-screen. Applying a non-identity filter to <html> forces the
    // compositor to evict descendant tiles; removing it next frame restores
    // normal rendering against the new variable values. <html> is chosen
    // (not body) so position: fixed descendants stay anchored to the viewport.
    const root = document.documentElement;
    root.style.filter = 'contrast(1.0001)';
    void root.offsetHeight;
    requestAnimationFrame(() => {
      root.style.filter = '';
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
