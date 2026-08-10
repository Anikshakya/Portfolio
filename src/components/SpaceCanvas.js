import React, { useEffect, useRef } from 'react';

// Shifted percentages (px) to the right half of the canvas (0.55 - 0.92 range)
const skillsData = [
  { id: 'flutter', label: 'Flutter', px: 0.72, py: 0.35, radius: 28, color: '#00f0ff', connections: ['dart', 'firebase', 'ios', 'android'] },
  { id: 'dart', label: 'Dart', px: 0.62, py: 0.48, radius: 20, color: '#00f0ff', connections: ['flutter'] },
  { id: 'firebase', label: 'Firebase', px: 0.82, py: 0.50, radius: 24, color: '#ffaa00', connections: ['flutter', 'node'] },
  { id: 'ios', label: 'iOS App Dev', px: 0.66, py: 0.22, radius: 18, color: '#00f0ff', connections: ['flutter'] },
  { id: 'android', label: 'Android Dev', px: 0.80, py: 0.22, radius: 18, color: '#00f0ff', connections: ['flutter'] },
  { id: 'react', label: 'React.js', px: 0.90, py: 0.38, radius: 24, color: '#ff007f', connections: ['node', 'express', 'mongodb'] },
  { id: 'node', label: 'Node.js', px: 0.85, py: 0.68, radius: 22, color: '#00ff66', connections: ['react', 'express', 'mongodb', 'firebase'] },
  { id: 'express', label: 'Express.js', px: 0.93, py: 0.55, radius: 18, color: '#00ff66', connections: ['node', 'react'] },
  { id: 'mongodb', label: 'MongoDB', px: 0.93, py: 0.75, radius: 18, color: '#00ff66', connections: ['node', 'react'] }
];

export default function SpaceCanvas({ 
  currentSector = 0, 
  isWarping = false, 
  scrollY = 0, 
  selectedSkillId = null, 
  onSelectSkill = () => {} 
}) {
  const canvasRef = useRef(null);

  const scrollYRef = useRef(scrollY);
  const currentSectorRef = useRef(currentSector);
  const isWarpingRef = useRef(isWarping);
  const selectedSkillIdRef = useRef(selectedSkillId);
  const mouseRef = useRef({ 
    x: -1000, 
    y: -1000, 
    isDown: false, 
    draggedSkillIndex: null, 
    isDraggingAstronaut: false 
  });

  const shockwavesRef = useRef([]);
  const stardustRef = useRef([]);
  const signalParticlesRef = useRef([]);

  const astroPhysicsRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  useEffect(() => { scrollYRef.current = scrollY; }, [scrollY]);
  useEffect(() => { currentSectorRef.current = currentSector; }, [currentSector]);
  useEffect(() => { isWarpingRef.current = isWarping; }, [isWarping]);
  useEffect(() => { selectedSkillIdRef.current = selectedSkillId; }, [selectedSkillId]);

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

    // Interactive Stars
    const backgroundStars = Array.from({ length: 400 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      baseX: Math.random() * window.innerWidth,
      baseY: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      color: Math.random() > 0.3 ? 'rgba(0, 240, 255, 0.7)' : 'rgba(255, 0, 127, 0.6)',
      alpha: Math.random() * 0.8 + 0.2
    }));

    const skillNodes = skillsData.map(node => ({
      ...node,
      x: node.px * window.innerWidth,
      y: node.py * window.innerHeight,
      vx: 0, vy: 0
    }));

    let floatTime = 0;

    // Strict Sector Check for Skills (Sector 2)
    const isSkillsSectorActive = () => {
      const sector = currentSectorRef.current;
      
      // Explicit sector matches
      if (sector === 2) return true;
      
      // Hard block if explicitly in another sector (e.g., Sector 1, 3, or 4)
      if (sector > 0 && sector !== 2) return false;

      // Fallback scroll bounds for Skills (between ~0.8x and 1.8x window height)
      const h = window.innerHeight;
      const currentY = scrollYRef.current;
      return currentY >= h * 0.8 && currentY < h * 1.8;
    };

    // Strict Sector Check for Contact (Sector 3 or 4 depending on setup)
    const isContactSectorActive = () => {
      const sector = currentSectorRef.current;
      
      // Matches either index convention for Contact (Sector 3 or 4)
      if (sector === 3 || sector === 4) return true;
      
      // Hard block if explicitly in an earlier sector
      if (sector > 0 && sector !== 3 && sector !== 4) return false;

      // Fallback scroll bounds for Contact section (>2.8x window height)
      const h = window.innerHeight;
      return scrollYRef.current >= h * 2.8;
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;

      if (Math.random() > 0.3) {
        stardustRef.current.push({
          x: mx + (Math.random() - 0.5) * 10,
          y: my + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1.0,
          color: Math.random() > 0.5 ? '#00f0ff' : '#ff007f'
        });
      }

      if (isSkillsSectorActive() && mouseRef.current.draggedSkillIndex !== null) {
        const node = skillNodes[mouseRef.current.draggedSkillIndex];
        node.x = mx;
        node.y = my;
      }

      if (isContactSectorActive() && mouseRef.current.isDraggingAstronaut) {
        astroPhysicsRef.current.x = mx;
        astroPhysicsRef.current.y = my;
        astroPhysicsRef.current.vx = 0;
        astroPhysicsRef.current.vy = 0;
      }
    };

    const handlePointerDown = (e) => {
      mouseRef.current.isDown = true;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      shockwavesRef.current.push({
        x: mx,
        y: my,
        radius: 0,
        maxRadius: 220,
        speed: 8
      });

      if (isSkillsSectorActive()) {
        for (let i = 0; i < skillNodes.length; i++) {
          const node = skillNodes[i];
          const dist = Math.hypot(node.x - mx, node.y - my);
          if (dist < node.radius + 15) {
            mouseRef.current.draggedSkillIndex = i;
            onSelectSkill(node.id);
            return;
          }
        }
      }

      if (isContactSectorActive()) {
        const distAstro = Math.hypot(astroPhysicsRef.current.x - mx, astroPhysicsRef.current.y - my);
        if (distAstro < 45) {
          mouseRef.current.isDraggingAstronaut = true;
          for (let p = 0; p < 10; p++) {
            signalParticlesRef.current.push({
              progress: 0,
              speed: 0.02 + Math.random() * 0.03
            });
          }
        }
      }
    };

    const handlePointerUp = () => {
      mouseRef.current.isDown = false;
      mouseRef.current.draggedSkillIndex = null;
      mouseRef.current.isDraggingAstronaut = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 2, 8, 0.28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      floatTime += 0.02;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Interactive Background Field
      backgroundStars.forEach(star => {
        const dx = mx - star.x;
        const dy = my - star.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - dist) * 0.08;
          star.x -= Math.cos(angle) * force;
          star.y -= Math.sin(angle) * force;
        } else {
          star.x += (star.baseX - star.x) * 0.05;
          star.y += (star.baseY - star.y) * 0.05;
        }

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Cursor Stardust
      stardustRef.current = stardustRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
          return true;
        }
        return false;
      });

      // 3. Shockwaves
      shockwavesRef.current = shockwavesRef.current.filter(wave => {
        wave.radius += wave.speed;
        if (wave.radius < wave.maxRadius) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - wave.radius / wave.maxRadius)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.stroke();
          return true;
        }
        return false;
      });

      // 4. Skills Constellation (Strictly active only in Skills Sector)
      if (isSkillsSectorActive()) {
        skillNodes.forEach((node, idx) => {
          const targetX = node.px * canvas.width;
          const targetY = node.py * canvas.height;

          if (mouseRef.current.draggedSkillIndex !== idx) {
            const dx = targetX - node.x;
            const dy = targetY - node.y;
            node.vx = (node.vx + dx * 0.03) * 0.88;
            node.vy = (node.vy + dy * 0.03) * 0.88;
            node.x += node.vx;
            node.y += node.vy;
          }

          const isDragging = mouseRef.current.draggedSkillIndex === idx;
          const isSelected = selectedSkillIdRef.current === node.id;

          node.connections.forEach((connId) => {
            const target = skillNodes.find(n => n.id === connId);
            if (target) {
              const isConnActive = isSelected || selectedSkillIdRef.current === target.id;
              ctx.strokeStyle = isConnActive ? '#00f0ff' : 'rgba(0, 240, 255, 0.25)';
              ctx.lineWidth = isConnActive ? 2.5 : 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(target.x, target.y);
              ctx.stroke();
            }
          });

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + (isDragging ? 5 : 0), 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? node.color : (isDragging ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 240, 255, 0.18)');
          ctx.fill();
          ctx.strokeStyle = isSelected ? '#ffffff' : node.color;
          ctx.lineWidth = isSelected ? 3 : 1.8;
          ctx.stroke();

          ctx.fillStyle = isSelected ? '#00f0ff' : '#ffffff';
          ctx.font = isSelected ? 'bold 14px monospace' : 'bold 12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y - node.radius - 10);
        });
      }

      // 5. Contact Sector Elements
      if (isContactSectorActive()) {
        const earthX = canvas.width * 0.15;
        const earthY = canvas.height * 0.25;
        const earthRadius = 42;

        const targetAstroX = canvas.width * 0.22 + Math.sin(floatTime * 0.8) * 14;
        const targetAstroY = canvas.height * 0.60 + Math.cos(floatTime * 1.2) * 20;

        if (astroPhysicsRef.current.x === 0) {
          astroPhysicsRef.current.x = targetAstroX;
          astroPhysicsRef.current.y = targetAstroY;
        }

        if (!mouseRef.current.isDraggingAstronaut) {
          const dx = targetAstroX - astroPhysicsRef.current.x;
          const dy = targetAstroY - astroPhysicsRef.current.y;
          astroPhysicsRef.current.vx = (astroPhysicsRef.current.vx + dx * 0.02) * 0.90;
          astroPhysicsRef.current.vy = (astroPhysicsRef.current.vy + dy * 0.02) * 0.90;
          astroPhysicsRef.current.x += astroPhysicsRef.current.vx;
          astroPhysicsRef.current.y += astroPhysicsRef.current.vy;
        }

        const ax = astroPhysicsRef.current.x;
        const ay = astroPhysicsRef.current.y;

        const beamPulse = (Math.sin(floatTime * 4) + 1) * 0.5;
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 + beamPulse * 0.45})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(ax, ay - 15);
        ctx.lineTo(earthX + 20, earthY + 20);
        ctx.stroke();
        ctx.setLineDash([]);

        signalParticlesRef.current = signalParticlesRef.current.filter(p => {
          p.progress += p.speed;
          if (p.progress < 1) {
            const px = ax + (earthX + 20 - ax) * p.progress;
            const py = (ay - 15) + (earthY + 20 - (ay - 15)) * p.progress;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ff007f';
            ctx.fill();
            return true;
          }
          return false;
        });

        // Draw Earth
        ctx.beginPath();
        ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
        const earthGrad = ctx.createRadialGradient(earthX - 10, earthY - 10, 5, earthX, earthY, earthRadius);
        earthGrad.addColorStop(0, '#00f0ff');
        earthGrad.addColorStop(0.6, '#0044ff');
        earthGrad.addColorStop(1, '#001133');
        ctx.fillStyle = earthGrad;
        ctx.fill();
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label: Earth
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('EARTH [HQ]', earthX, earthY - earthRadius - 12);

        // Subtext / Indicator dot for Earth
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText('● SIGNAL RECEIVER', earthX, earthY - earthRadius - 2);

        // Draw Satellite / Astronaut
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(Math.sin(floatTime * 0.5) * 0.12);

        ctx.beginPath();
        ctx.arc(0, 0, 32 + Math.sin(floatTime * 3) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = mouseRef.current.isDraggingAstronaut ? '#ff007f' : 'rgba(0, 240, 255, 0.35)';
        ctx.lineWidth = mouseRef.current.isDraggingAstronaut ? 2.5 : 1;
        ctx.stroke();

        ctx.fillStyle = '#112233';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-20, -20, 40, 40);
        ctx.fillRect(-20, -20, 40, 40);

        ctx.beginPath();
        ctx.arc(0, -10, 15, 0, Math.PI * 2);
        const visorGrad = ctx.createLinearGradient(-10, -18, 10, 0);
        visorGrad.addColorStop(0, '#ffaa00');
        visorGrad.addColorStop(1, '#00f0ff');
        ctx.fillStyle = visorGrad;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();

        // Label: Satellite / Orbital Relay Node
        ctx.fillStyle = mouseRef.current.isDraggingAstronaut ? '#ff007f' : '#00f0ff';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SATELLITE RELAY', ax, ay + 48);

        // Status indicator text for Satellite
        ctx.fillStyle = mouseRef.current.isDraggingAstronaut ? '#ff007f' : '#00ff66';
        ctx.font = '10px monospace';
        ctx.fillText(
          mouseRef.current.isDraggingAstronaut ? 'TRANSMITTING...' : '● LINK ACTIVE', 
          ax, 
          ay + 62
        );
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [onSelectSkill]);

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
        pointerEvents: 'auto',
        display: 'block'
      }}
    />
  );
}