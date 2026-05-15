import { useEffect, useRef, useState } from 'react';

export default function AuroraSweep() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // iOS Safari kills tabs that exceed ~250MB of GPU memory. Detect mobile/tablet
  // class devices and render a lighter version that's visually indistinguishable.
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Performance: Provide low-latency context hints
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let time = 0;

    // Performance: Render at low resolution.
    // Because we heavily blur the output anyway, rendering fewer pixels reduces GPU load by roughly 90%
    // and stops the initial page load from freezing. Mobile gets an even smaller buffer.
    const dpr = isMobile ? 0.2 : 0.3;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', resize);
    resize();

    // Trigger smooth fade-in after mounting
    requestAnimationFrame(() => setIsLoaded(true));

    // On mobile, pause canvas redraws while the user is actively scrolling.
    // iOS Safari is already recompositing the blurred layer + nav backdrop on every
    // scroll event; adding a 60fps canvas redraw on top pushes VRAM allocation past
    // the jetsam threshold and the tab is killed. Freezing the background during
    // scroll is invisible to the user (their eye is on the moving content).
    let isScrolling = false;
    let scrollTimeout;
    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => { isScrolling = false; }, 150);
    };
    if (isMobile) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const render = () => {
      if (isMobile && isScrolling) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
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
      ctx.globalCompositeOperation = isLightMode ? 'source-over' : 'screen';

      const themeOpacity = isLightMode ? 0.58 : 1.0;

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
        const saturation = isLightMode ? 86 : 100;
        const firstLightness = isLightMode ? 68 : 40;
        const secondLightness = isLightMode ? 74 : 30;
        const firstAlpha = isLightMode ? baseOpacity * 0.8 : baseOpacity * 1.8;
        const secondAlpha = isLightMode ? baseOpacity * 0.62 : baseOpacity * 1.4;
        gradient.addColorStop(0, `hsla(${hue1}, ${saturation}%, ${firstLightness}%, ${firstAlpha})`);
        gradient.addColorStop(0.5, `hsla(${hue2}, ${saturation}%, ${secondLightness}%, ${secondAlpha})`);
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

      // New vibrant sweeps — desktop only. On mobile the 5 sweeps above already
      // saturate the gradients post-blur; adding 3 more is invisible but doubles fill cost.
      if (!isMobile) {
        drawAbstractSweep(240, 270, height * 0.32, 0.0012, 1.3, height * 0.15, 0.24, 0.9);
        drawAbstractSweep(340, 310, height * 0.36, 0.0019, 1.7, height * -0.05, 0.25, 1.1);
        drawAbstractSweep(290, 230, height * 0.42, 0.0014, 1.1, height * 0.1, 0.22, 1.3);
      }

      if (!isLightMode) {
        // Hole Punch Mask
        ctx.globalCompositeOperation = 'destination-out';
        const maskY = height * 0.5;
        const maskGradient = ctx.createRadialGradient(width / 2, maskY, 0, width / 2, maskY, height * 0.75);
        maskGradient.addColorStop(0, 'rgba(0,0,0,1)');
        maskGradient.addColorStop(0.35, 'rgba(0,0,0,0.85)');
        maskGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = maskGradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (isMobile) window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

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

        // Mobile uses a smaller blur radius — iOS Safari allocates a GPU layer
        // proportional to blur size, and 56px on a full-viewport fixed element is the
        // single biggest VRAM cost on the page. 28px reads identically once composited.
        filter: isMobile ? 'blur(28px) saturate(1.08)' : 'blur(56px) saturate(1.08)'
      }}
    />
  );
}
