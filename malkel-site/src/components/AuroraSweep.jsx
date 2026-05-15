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
    // Seed time to a developed phase so the very first painted frame already shows
    // the aurora's curves in interesting positions instead of the flat sin(0) baseline.
    // Especially important on mobile where the user often starts scrolling immediately
    // and the throttle kicks in before the animation has time to "develop" naturally.
    let time = 50;

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

    // Trigger fade-in immediately. We used to wait for requestAnimationFrame, but on
    // a busy initial mount iOS can defer rAF for many seconds — which made the aurora
    // appear "missing" for ~15s on mobile. The first render() call below is synchronous,
    // so the canvas is already painted by the time React commits this state change.
    setIsLoaded(true);

    // On mobile, throttle canvas redraws while the user is actively scrolling.
    // iOS Safari is already recompositing the blurred layer + nav backdrop on every
    // scroll event; adding a 60fps canvas redraw on top pushes VRAM allocation past
    // the jetsam threshold and the tab is killed. We can't fully *pause* drawing —
    // iOS evicts canvas layers that stop receiving draws, which is what caused the
    // sweep to vanish during scroll. 30fps during scroll halves the allocation rate
    // vs 60fps but motion stays visually smooth. Time advances per-frame (not
    // real-time) so frame-to-frame motion is always tiny and smooth — never jumpy.
    let isScrolling = false;
    let scrollTimeout;
    let lastRenderTime = 0;
    const SCROLL_FRAME_INTERVAL = 1000 / 30; // 30fps during scroll
    const onScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => { isScrolling = false; }, 150);
    };
    if (isMobile) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const render = (now) => {
      const t = now || performance.now();
      if (isMobile && isScrolling) {
        if (t - lastRenderTime < SCROLL_FRAME_INTERVAL) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }
      }
      lastRenderTime = t;
      time += 0.0032;

      // Clear canvas cleanly
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale context down so our math calculations map correctly to the tiny optimization buffer
      ctx.save();
      ctx.scale(dpr, dpr);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerY = height / 2;

      // Wave frequencies below are pixel-based constants tuned for ~1440px desktops.
      // On a 393px iPhone screen, the visible portion of one wave is only ~10% of a
      // cycle — making the aurora look like a near-flat slope instead of sweeping
      // curves. Scale frequency inversely with viewport width so the *visible* wave
      // count stays consistent at any screen size. Scale time-speed by the same
      // factor so the apparent motion velocity (screen-widths-per-second) matches.
      const freqScale = Math.max(1, 1440 / width);

      const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.globalCompositeOperation = isLightMode ? 'source-over' : 'screen';

      const themeOpacity = isLightMode ? 0.58 : 1.0;

      const drawAbstractSweep = (hue1, hue2, amplitude, frequency, speed, verticalOffset, opacity, scale) => {
        const f = frequency * freqScale;
        const s = speed * freqScale;
        ctx.beginPath();
        for (let x = 0; x <= width + 100; x += 20) {
          const y = centerY + verticalOffset +
            Math.sin(x * f + time * s) * amplitude +
            Math.cos(x * (f * 0.4) - time * (s * 1.5)) * (amplitude * 0.8) +
            Math.sin(x * (f * 0.1) + time * 0.5) * (amplitude * 1.2);

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

      // Full 8-sweep set — now used on mobile too. The other optimizations
      // (low DPR canvas, reduced blur, freqScale tightening the curves) leave
      // enough headroom that the extra 3 sweeps don't reintroduce crashes,
      // and they add visible vibrance to the gradient mix.
      drawAbstractSweep(240, 270, height * 0.32, 0.0012, 1.3, height * 0.15, 0.24, 0.9);
      drawAbstractSweep(340, 310, height * 0.36, 0.0019, 1.7, height * -0.05, 0.25, 1.1);
      drawAbstractSweep(290, 230, height * 0.42, 0.0014, 1.1, height * 0.1, 0.22, 1.3);

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

        // GPU layer hint. We DON'T use `willChange: filter` here — on iOS Safari
        // that hint causes the heavy blurred composite layer to be rasterized
        // asynchronously, which can delay first paint by many seconds when the
        // main thread is busy with other component mounts. translateZ(0) is
        // enough to keep the canvas on its own layer for smooth scroll/animation.
        transform: 'translateZ(0)',

        // Graceful 1.5s fade-in so the aurora doesn't pop in jarringly on mount.
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
