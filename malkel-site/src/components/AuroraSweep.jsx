import { useEffect, useRef, useState } from 'react';

export default function AuroraSweep() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Performance: Provide low-latency context hints
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let time = 0;

    // Performance: Render at 30% resolution. 
    // Because we heavily blur the output anyway, rendering fewer pixels reduces GPU load by roughly 90%
    // and stops the initial page load from freezing.
    const dpr = 0.3;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', resize);
    resize();

    // Trigger smooth fade-in after mounting
    requestAnimationFrame(() => setIsLoaded(true));

    const render = () => {
      time += 0.004;

      // Clear canvas cleanly
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale context down so our math calculations map correctly to the tiny optimization buffer
      ctx.save();
      ctx.scale(dpr, dpr);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerY = height / 2;

      const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.globalCompositeOperation = isLightMode ? 'multiply' : 'screen';
      
      // In light mode, bump the opacity to make the colors punch through the white background
      const themeOpacity = isLightMode ? 2.0 : 1.0;

      const drawAbstractSweep = (hue1, hue2, amplitude, frequency, speed, verticalOffset, opacity, scale) => {
        ctx.beginPath();
        for (let x = 0; x <= width + 100; x += 20) {
          const y = centerY + verticalOffset +
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.cos(x * (frequency * 0.4) - time * (speed * 1.5)) * (amplitude * 0.8) +
            Math.sin(x * (frequency * 0.1) + time * 0.5) * (amplitude * 1.2);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width + 100, height + 200);
        ctx.lineTo(-100, height + 200);
        ctx.closePath();

        const baseOpacity = opacity * themeOpacity;
        const gradient = ctx.createLinearGradient(0, centerY - amplitude, width * scale, height);
        gradient.addColorStop(0, `hsla(${hue1}, 100%, 40%, ${baseOpacity * 1.8})`);
        gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 30%, ${baseOpacity * 1.4})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fill();
      };

      // Original 5 Sweeps
      drawAbstractSweep(220, 190, height * 0.35, 0.0015, 1.5, height * -0.1, 0.25, 0.8);
      drawAbstractSweep(280, 320, height * 0.4, 0.001, 1.2, height * 0.05, 0.20, 1.2);
      drawAbstractSweep(350, 15, height * 0.3, 0.002, 1.8, height * -0.15, 0.22, 0.5);
      drawAbstractSweep(140, 90, height * 0.25, 0.0018, 1.4, height * 0.1, 0.18, 1.0);
      drawAbstractSweep(170, 200, height * 0.38, 0.0022, 1.6, height * 0.0, 0.20, 0.7);

      // New vibrant sweeps
      drawAbstractSweep(240, 270, height * 0.32, 0.0012, 1.3, height * 0.15, 0.24, 0.9);
      drawAbstractSweep(340, 310, height * 0.36, 0.0019, 1.7, height * -0.05, 0.25, 1.1);
      drawAbstractSweep(290, 230, height * 0.42, 0.0014, 1.1, height * 0.1, 0.22, 1.3);

      // Hole Punch Mask
      ctx.globalCompositeOperation = 'destination-out';
      const maskY = height * 0.5;
      const maskGradient = ctx.createRadialGradient(width / 2, maskY, 0, width / 2, maskY, height * 0.75);
      maskGradient.addColorStop(0, 'rgba(0,0,0,1)');
      maskGradient.addColorStop(0.35, 'rgba(0,0,0,0.85)');
      maskGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = maskGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',

        // Performance Fixes:
        // Hardware accelerates the massive blur layer to unblock the main thread
        willChange: 'filter, opacity',
        transform: 'translateZ(0)',

        // Aesthetic Fixes:
        // Gracefully fades in over 1.5 seconds instead of jarring the screen on mount
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)',

        filter: 'blur(50px)'
      }}
    />
  );
}
