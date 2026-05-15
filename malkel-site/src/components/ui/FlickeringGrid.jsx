import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * FlickeringGrid Component
 * Highly optimized canvas-based flickering grid effect.
 */
export const FlickeringGrid = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(125, 125, 125)",
  width,
  height,
  className,
  maxOpacity = 0.6,
  ...props
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    // If it's already an RGB-like string of digits
    if (color.startsWith('rgb')) {
    const rgb = color.match(/\d+/g);
      return rgb ? `${rgb[0]}, ${rgb[1]}, ${rgb[2]}` : "125, 125, 125";
    }
    
    // If it's a hex color
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }

    return "125, 125, 125";
  }, [color]);

  const setupCanvas = useCallback(
    (canvas, width, height) => {
      // Cap DPR at 1.5 — iPhone is 3x natively, which allocates a ~15MB buffer for a
      // fullscreen grid. The grid is tiny squares, so the visual quality is preserved.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      intersectionObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const { width, height } = canvasSize;
    if (width <= 0 || height <= 0) return;

    const { cols, rows, squares, dpr } = setupCanvas(canvas, width, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    let lastDrawTime = 0;
    const targetFPS = 30; // Limit FPS to save battery/reduce lag
    const frameInterval = 1000 / targetFPS;

    const draw = (time) => {
      if (!isInView) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      if (time - lastDrawTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < flickerChance) {
            squares[i * rows + j] = Math.random() * maxOpacity;
          }

          const opacity = squares[i * rows + j];
          ctx.fillStyle = `rgba(${memoizedColor}, ${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    setupCanvas,
    flickerChance,
    memoizedColor,
    squareSize,
    gridGap,
    maxOpacity,
    canvasSize,
    isInView,
  ]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full ${className}`}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
