import React, { useEffect, useRef } from 'react';

// Skill node data
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
  scrollY = 0, 
  selectedSkillId = null, 
  onSelectSkill = () => {} 
}) {
  const canvasRef = useRef(null);

  const scrollYRef = useRef(scrollY);
  const currentSectorRef = useRef(currentSector);
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

    // Dynamic camera parameters
    const FOV = 400;
    const MAX_DEPTH = 2200;
    const MIN_DEPTH = 20;

    let globalCameraOffsetZ = 0;

    // Helper: Seamless Modulo Projection
    const getProjectedZ = (baseZ, offsetZ) => {
      const depthSpan = MAX_DEPTH - MIN_DEPTH;
      let effectiveZ = (baseZ - offsetZ) % depthSpan;
      if (effectiveZ < 0) effectiveZ += depthSpan;
      return effectiveZ + MIN_DEPTH;
    };

    // Calculate edge alpha fade to eliminate wrap pops completely
    const calculateAlpha = (z) => {
      if (z > MAX_DEPTH - 300) return (MAX_DEPTH - z) / 300;
      if (z < MIN_DEPTH + 150) return (z - MIN_DEPTH) / 150;
      return 1.0;
    };

    // Warp Field Stars
    const STAR_COUNT = 900;
    const starField3D = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 3200,
      y: (Math.random() - 0.5) * 3200,
      baseZ: Math.random() * (MAX_DEPTH - MIN_DEPTH) + MIN_DEPTH,
      size: Math.random() * 1.8 + 0.5,
      color: Math.random() > 0.4 ? '#00f0ff' : (Math.random() > 0.5 ? '#ff007f' : '#ffffff')
    }));

    // Continuous Volumetric Nebula Clouds
    const nebulaClouds3D = [
      { x: -400, y: -200, baseZ: 400, baseRadius: 600, color: 'rgba(128, 0, 255, 0.25)' },
      { x: 500, y: 300, baseZ: 1000, baseRadius: 800, color: 'rgba(0, 240, 255, 0.20)' },
      { x: -200, y: 400, baseZ: 1600, baseRadius: 700, color: 'rgba(255, 0, 128, 0.22)' },
      { x: 300, y: -500, baseZ: 2100, baseRadius: 900, color: 'rgba(0, 100, 255, 0.18)' }
    ];

    const skillNodes = skillsData.map(node => ({
      ...node,
      x: node.px * window.innerWidth,
      y: node.py * window.innerHeight,
      vx: 0, vy: 0
    }));

    let floatTime = 0;

    const isSkillsSectorActive = () => {
      const sector = currentSectorRef.current;
      if (sector === 2) return true;
      if (sector > 0 && sector !== 2) return false;
      return scrollYRef.current >= window.innerHeight * 0.8 && scrollYRef.current < window.innerHeight * 1.8;
    };

    const isContactSectorActive = () => {
      const sector = currentSectorRef.current;
      if (sector === 3 || sector === 4) return true;
      if (sector > 0 && sector !== 3 && sector !== 4) return false;
      return scrollYRef.current >= window.innerHeight * 2.8;
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
        x: mx, y: my, radius: 0, maxRadius: 220, speed: 8
      });

      if (isSkillsSectorActive()) {
        for (let i = 0; i < skillNodes.length; i++) {
          const node = skillNodes[i];
          if (Math.hypot(node.x - mx, node.y - my) < node.radius + 15) {
            mouseRef.current.draggedSkillIndex = i;
            onSelectSkill(node.id);
            return;
          }
        }
      }

      if (isContactSectorActive()) {
        if (Math.hypot(astroPhysicsRef.current.x - mx, astroPhysicsRef.current.y - my) < 45) {
          mouseRef.current.isDraggingAstronaut = true;
          for (let p = 0; p < 10; p++) {
            signalParticlesRef.current.push({ progress: 0, speed: 0.02 + Math.random() * 0.03 });
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

    // -------------------------------------------------------------
    // WARP SPEED RENDER FUNCTION
    // -------------------------------------------------------------
    const renderWarpSpeed = (mouseOffX, mouseOffY, centerX, centerY) => {
      // Nebulae
      nebulaClouds3D.forEach(cloud => {
        const currentZ = getProjectedZ(cloud.baseZ, globalCameraOffsetZ * 0.3);
        const alpha = calculateAlpha(currentZ);
        if (alpha > 0) {
          const scale = FOV / currentZ;
          const px = (cloud.x - mouseOffX) * scale + centerX;
          const py = (cloud.y - mouseOffY) * scale + centerY;
          const rad = cloud.baseRadius * scale;

          if (px + rad > 0 && px - rad < canvas.width && py + rad > 0 && py - rad < canvas.height) {
            ctx.save();
            ctx.globalAlpha = alpha;
            const cloudGrad = ctx.createRadialGradient(px, py, 0, px, py, rad);
            cloudGrad.addColorStop(0, cloud.color);
            cloudGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = cloudGrad;
            ctx.beginPath();
            ctx.arc(px, py, rad, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      });

      // Continuous Flying Stars
      starField3D.forEach(star => {
        const currentZ = getProjectedZ(star.baseZ, globalCameraOffsetZ);
        const alpha = calculateAlpha(currentZ);

        if (alpha > 0) {
          const scale = FOV / currentZ;
          const px = (star.x - mouseOffX) * scale + centerX;
          const py = (star.y - mouseOffY) * scale + centerY;
          const drawSize = star.size * scale * 1.5;

          if (px > 0 && px < canvas.width && py > 0 && py < canvas.height) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.5, drawSize), 0, Math.PI * 2);
            ctx.fill();

            if (scale > 0.3) {
              const prevScale = FOV / (currentZ + 20);
              const prevPx = (star.x - mouseOffX) * prevScale + centerX;
              const prevPy = (star.y - mouseOffY) * prevScale + centerY;
              ctx.strokeStyle = star.color;
              ctx.lineWidth = drawSize * 0.7;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(prevPx, prevPy);
              ctx.stroke();
            }
            ctx.restore();
          }
        }
      });
    };

    // -------------------------------------------------------------
    // MAIN ANIMATION LOOP
    // -------------------------------------------------------------
    const animate = () => {
      floatTime += 0.003; 
      globalCameraOffsetZ += 1.8; // Smooth forward star velocity

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Base Black Background
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, Math.max(canvas.width, canvas.height));
      bgGrad.addColorStop(0, '#090518');
      bgGrad.addColorStop(0.5, '#04020c');
      bgGrad.addColorStop(1, '#010005');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouseOffX = (mx - centerX) * 0.15;
      const mouseOffY = (my - centerY) * 0.15;

      // Render Warp Speed background directly
      renderWarpSpeed(mouseOffX, mouseOffY, centerX, centerY);

      // Cursor Stardust
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

      // Shockwaves
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

      // Overlay UI - Skills Constellation
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

      // Overlay UI - Contact Earth/Satellite
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

        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('EARTH [HQ]', earthX, earthY - earthRadius - 12);

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

        ctx.fillStyle = mouseRef.current.isDraggingAstronaut ? '#ff007f' : '#00f0ff';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SATELLITE RELAY', ax, ay + 48);
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