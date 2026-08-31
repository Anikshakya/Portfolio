import React, { useEffect, useRef } from 'react';

export default function SpaceCanvas({ currentSector = 0, scrollY = 0, theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const animate = () => {
      time += 0.003;
      const width = canvas.width;
      const height = canvas.height;
      const isDark = theme === 'dark';

      // Base background color
      ctx.fillStyle = isDark ? '#0c0c0e' : '#f5f5f7';
      ctx.fillRect(0, 0, width, height);

      const scrollOffset = scrollY * 0.12;

      // Ambient Mesh Aura 1
      const aura1X = width * 0.3 + Math.sin(time * 0.3) * 120;
      const aura1Y = height * 0.3 + Math.cos(time * 0.25) * 80 - scrollOffset;
      const grad1 = ctx.createRadialGradient(aura1X, aura1Y, 0, aura1X, aura1Y, width * 0.45);
      grad1.addColorStop(0, isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.04)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(aura1X, aura1Y, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Ambient Mesh Aura 2
      const aura2X = width * 0.7 + Math.cos(time * 0.35) * 100;
      const aura2Y = height * 0.7 + Math.sin(time * 0.3) * 90 + scrollOffset * 0.5;
      const grad2 = ctx.createRadialGradient(aura2X, aura2Y, 0, aura2X, aura2Y, width * 0.4);
      grad2.addColorStop(0, isDark ? 'rgba(139, 92, 246, 0.04)' : 'rgba(139, 92, 246, 0.03)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(aura2X, aura2Y, width * 0.4, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [scrollY, theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
}