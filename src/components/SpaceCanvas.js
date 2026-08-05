import React, { useEffect, useRef } from 'react';

// Skills constellation configuration
const skillsData = [
  { id: 'flutter', label: 'Flutter', px: 0.35, py: 0.35, radius: 25, color: '#00f0ff', connections: ['dart', 'firebase', 'ios', 'android'] },
  { id: 'dart', label: 'Dart', px: 0.20, py: 0.45, radius: 18, color: '#00f0ff', connections: ['flutter'] },
  { id: 'firebase', label: 'Firebase', px: 0.50, py: 0.50, radius: 22, color: '#ffaa00', connections: ['flutter', 'node'] },
  { id: 'ios', label: 'iOS App Dev', px: 0.25, py: 0.20, radius: 15, color: '#00f0ff', connections: ['flutter'] },
  { id: 'android', label: 'Android Dev', px: 0.45, py: 0.20, radius: 15, color: '#00f0ff', connections: ['flutter'] },
  { id: 'react', label: 'React.js', px: 0.65, py: 0.35, radius: 25, color: '#ff007f', connections: ['node', 'express', 'mongodb'] },
  { id: 'node', label: 'Node.js', px: 0.65, py: 0.65, radius: 22, color: '#00ff66', connections: ['react', 'express', 'mongodb', 'firebase'] },
  { id: 'express', label: 'Express.js', px: 0.80, py: 0.50, radius: 18, color: '#00ff66', connections: ['node', 'react'] },
  { id: 'mongodb', label: 'MongoDB', px: 0.80, py: 0.70, radius: 18, color: '#00ff66', connections: ['node', 'react'] }
];

export default function SpaceCanvas({ currentSector, isWarping }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, draggedNode: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize Starfield (shared across sectors)
    const starCount = 200;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        color: `hsl(${200 + Math.random() * 40}, 100%, ${70 + Math.random() * 30}%)`,
        size: 0.5 + Math.random() * 1.5
      });
    }

    // Initialize Asteroid Belt for Sector 1 (Index 1)
    const asteroidCount = 15;
    const asteroids = [];
    const createAsteroid = () => {
      const radius = 15 + Math.random() * 25;
      const points = [];
      const numPoints = 6 + Math.floor(Math.random() * 6);
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const offset = radius * (0.8 + Math.random() * 0.4);
        points.push({
          x: Math.cos(angle) * offset,
          y: Math.sin(angle) * offset
        });
      }
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        points,
        radius,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        glow: 0
      };
    };
    for (let i = 0; i < asteroidCount; i++) {
      asteroids.push(createAsteroid());
    }

    // Initialize Constellation Physics Nodes for Sector 2 (Index 2)
    const nodes = skillsData.map(node => ({
      ...node,
      x: node.px * canvas.width,
      y: node.py * canvas.height,
      vx: 0,
      vy: 0,
      glow: 0
    }));

    // Black Hole Vortex particles for Sector 3 (Index 3)
    const bhParticlesCount = 300;
    const bhParticles = [];
    for (let i = 0; i < bhParticlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 400;
      bhParticles.push({
        angle,
        dist,
        speed: 0.01 + (3 / dist), // closer particles rotate faster
        size: 1 + Math.random() * 2,
        color: `hsl(${260 + Math.random() * 60}, 100%, ${60 + Math.random() * 40}%)`
      });
    }

    // General animation variables
    let planetRotation = 0;
    let warpFactor = isWarping ? 1.0 : 0.05;
    const warpMax = 25.0;
    const warpStep = 0.5;

    // Mouse event listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      if (currentSector === 2 && mouseRef.current.draggedNode !== null) {
        const node = nodes[mouseRef.current.draggedNode];
        node.x = mouseRef.current.x;
        node.y = mouseRef.current.y;
        node.vx = 0;
        node.vy = 0;
      }
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
      if (currentSector === 2) {
        // Check if cursor clicked on a node
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dist = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
          if (dist < node.radius + 15) {
            mouseRef.current.draggedNode = i;
            break;
          }
        }
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
      mouseRef.current.draggedNode = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Dynamic sizing helper for node target calculations
    const getResponsiveResting = (node) => {
      return {
        x: node.px * canvas.width,
        y: node.py * canvas.height
      };
    };

    // Render loop
    const animate = () => {
      // Clear background
      ctx.fillStyle = 'rgba(2, 2, 8, 0.2)'; // trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Warp Factor Lerp
      if (isWarping) {
        if (warpFactor < warpMax) warpFactor += warpStep;
      } else {
        if (warpFactor > 0.05) warpFactor -= warpStep;
        if (warpFactor < 0.05) warpFactor = 0.05;
      }

      // 2. Render Starfield
      ctx.strokeStyle = '#ffffff';
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Stars project outward from center
        star.z -= warpFactor * 8;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
          // Draw star trail if warping, else tiny dots
          if (warpFactor > 1.5) {
            const trailLength = warpFactor * 1.5;
            const prevK = 128.0 / (star.z + trailLength);
            const prevPx = star.x * prevK + canvas.width / 2;
            const prevPy = star.y * prevK + canvas.height / 2;

            ctx.beginPath();
            ctx.strokeStyle = star.color;
            ctx.lineWidth = star.size * (warpFactor / 5);
            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.arc(px, py, star.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Skip sector-specific drawing if warping at high speed
      if (warpFactor > 4) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // 3. Sector-Specific Background Elements
      if (currentSector === 0) {
        // --- SECTOR 0: Rotating Wireframe Hologram Planet ---
        planetRotation += 0.003;
        const cx = canvas.width > 768 ? canvas.width * 0.75 : canvas.width * 0.5;
        const cy = canvas.height * 0.5;
        const radius = Math.min(canvas.width, canvas.height) * 0.28;

        // Draw planet background glow
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.4);
        glowGrad.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
        glowGrad.addColorStop(0.5, 'rgba(189, 0, 255, 0.05)');
        glowGrad.addColorStop(1, 'rgba(2, 2, 8, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Draw latitude circles (rotated)
        ctx.lineWidth = 1;
        for (let lat = -Math.PI / 2 + 0.2; lat < Math.PI / 2; lat += Math.PI / 8) {
          const latRadius = radius * Math.cos(lat);
          const yOffset = radius * Math.sin(lat);
          
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
          // Project ellipse for rotated circle
          ctx.ellipse(cx, cy + yOffset * 0.9, latRadius, latRadius * 0.35, 0.1, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw longitude ellipses rotating
        for (let lon = 0; lon < Math.PI; lon += Math.PI / 6) {
          const rotLon = lon + planetRotation;
          const ellipseWidth = radius * Math.sin(rotLon);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(189, 0, 255, 0.25)';
          ctx.ellipse(cx, cy, Math.abs(ellipseWidth), radius, 0.15, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Outer horizon ring
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw glowing scanner grid details
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let x = cx - radius * 1.5; x <= cx + radius * 1.5; x += 30) {
          ctx.moveTo(x, cy - radius * 1.2);
          ctx.lineTo(x, cy + radius * 1.2);
        }
        for (let y = cy - radius * 1.2; y <= cy + radius * 1.2; y += 30) {
          ctx.moveTo(cx - radius * 1.5, y);
          ctx.lineTo(cx + radius * 1.5, y);
        }
        ctx.stroke();

      } else if (currentSector === 1) {
        // --- SECTOR 1: Interactive Asteroid Belt ---
        asteroids.forEach(ast => {
          // Physics
          ast.x += ast.vx;
          ast.y += ast.vy;
          ast.rotation += ast.rotationSpeed;

          // Wrap screen boundaries
          if (ast.x < -ast.radius) ast.x = canvas.width + ast.radius;
          if (ast.x > canvas.width + ast.radius) ast.x = -ast.radius;
          if (ast.y < -ast.radius) ast.y = canvas.height + ast.radius;
          if (ast.y > canvas.height + ast.radius) ast.y = -ast.radius;

          // Mouse gravity interactiveness
          const dx = mouseRef.current.x - ast.x;
          const dy = mouseRef.current.y - ast.y;
          const dist = Math.hypot(dx, dy);
          const gravityRange = 180;

          if (dist < gravityRange) {
            // Apply push away force
            const force = (gravityRange - dist) / gravityRange;
            const angle = Math.atan2(dy, dx);
            ast.vx -= Math.cos(angle) * force * 0.15;
            ast.vy -= Math.sin(angle) * force * 0.15;
            ast.glow = Math.min(1.0, ast.glow + 0.05);
          } else {
            ast.glow = Math.max(0, ast.glow - 0.02);
            // Cap velocities
            ast.vx *= 0.99;
            ast.vy *= 0.99;
          }

          // Draw asteroid
          ctx.save();
          ctx.translate(ast.x, ast.y);
          ctx.rotate(ast.rotation);

          ctx.beginPath();
          ctx.moveTo(ast.points[0].x, ast.points[0].y);
          for (let k = 1; k < ast.points.length; k++) {
            ctx.lineTo(ast.points[k].x, ast.points[k].y);
          }
          ctx.closePath();

          // Glow coloring
          ctx.fillStyle = `rgba(10, 20, 40, 0.7)`;
          ctx.fill();
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 + ast.glow * 0.6})`;
          ctx.shadowBlur = ast.glow * 15;
          ctx.shadowColor = 'rgba(0, 240, 255, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Draw micro HUD elements on hovered asteroids
          if (ast.glow > 0.4) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
            ctx.font = '9px "Share Tech Mono"';
            ctx.fillText(`ROCK-${Math.floor(ast.x % 100)}`, ast.radius + 5, 0);
            ctx.fillText(`M: ${Math.floor(ast.radius * 2)}T`, ast.radius + 5, 10);
            
            // Reticle bracket
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(0, 0, ast.radius + 8, -Math.PI / 4, Math.PI / 4);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, ast.radius + 8, Math.PI * 0.75, Math.PI * 1.25);
            ctx.stroke();
          }
          ctx.restore();
        });

      } else if (currentSector === 2) {
        // --- SECTOR 2: Interactive Constellation Graph ---
        // Constellation nodes spring physics
        nodes.forEach((node, idx) => {
          const rest = getResponsiveResting(node);

          if (idx !== mouseRef.current.draggedNode) {
            // Spring back to target resting position
            const ax = (rest.x - node.x) * 0.03;
            const ay = (rest.y - node.y) * 0.03;
            node.vx += ax;
            node.vy += ay;

            // Apply friction
            node.vx *= 0.82;
            node.vy *= 0.82;

            node.x += node.vx;
            node.y += node.vy;
          }

          // Hover check
          const distToMouse = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
          if (distToMouse < node.radius + 15) {
            node.glow = Math.min(1.0, node.glow + 0.1);
          } else {
            node.glow = Math.max(0, node.glow - 0.05);
          }
        });

        // Resolve connection spring forces between linked nodes
        nodes.forEach((node) => {
          node.connections.forEach(connId => {
            const targetNode = nodes.find(n => n.id === connId);
            if (!targetNode) return;

            const dx = targetNode.x - node.x;
            const dy = targetNode.y - node.y;
            const dist = Math.hypot(dx, dy);
            const restLength = 140; // spring length

            if (dist > 5) {
              const diff = (dist - restLength) * 0.002;
              const fx = (dx / dist) * diff;
              const fy = (dy / dist) * diff;

              node.vx += fx;
              node.vy += fy;
              targetNode.vx -= fx;
              targetNode.vy -= fy;
            }
          });
        });

        // Draw connections
        ctx.lineWidth = 1;
        nodes.forEach((node) => {
          node.connections.forEach(connId => {
            const targetNode = nodes.find(n => n.id === connId);
            if (!targetNode) return;

            const grad = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y);
            grad.addColorStop(0, node.color);
            grad.addColorStop(1, targetNode.color);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = 0.25 + Math.max(node.glow, targetNode.glow) * 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          });
        });

        // Draw nodes
        nodes.forEach((node) => {
          // Node glowing background
          ctx.beginPath();
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 0.05 + node.glow * 0.15;
          ctx.arc(node.x, node.y, node.radius + 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Core circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#060a1a';
          ctx.fill();
          ctx.lineWidth = 2 + node.glow * 2;
          ctx.strokeStyle = node.color;
          ctx.shadowBlur = node.glow * 15;
          ctx.shadowColor = node.color;
          ctx.stroke();
          ctx.shadowBlur = 0; // reset

          // Inner mini node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          // Label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px "Orbitron"';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, node.x, node.y + node.radius + 18);

          // Telemetry details on hover
          if (node.glow > 0.3) {
            ctx.fillStyle = node.color;
            ctx.font = '9px "Share Tech Mono"';
            ctx.fillText(`SYS_NODE: ${node.id.toUpperCase()}`, node.x, node.y - node.radius - 20);
            ctx.fillText(`COORD: [${Math.floor(node.x)}, ${Math.floor(node.y)}]`, node.x, node.y - node.radius - 10);
            
            // Reticle bracket around node
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 6, -Math.PI / 3, Math.PI / 3);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 6, Math.PI * 0.66, Math.PI * 1.33);
            ctx.stroke();
          }
        });

      } else if (currentSector === 3) {
        // --- SECTOR 3: Event Horizon / Black Hole ---
        const cx = canvas.width > 768 ? canvas.width * 0.75 : canvas.width * 0.5;
        const cy = canvas.height * 0.5;

        // Core shadow vortex
        const vortexGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
        vortexGlow.addColorStop(0, '#000000');
        vortexGlow.addColorStop(0.1, '#050110');
        vortexGlow.addColorStop(0.2, 'rgba(189, 0, 255, 0.4)');
        vortexGlow.addColorStop(0.4, 'rgba(0, 240, 255, 0.1)');
        vortexGlow.addColorStop(1, 'rgba(2, 2, 8, 0)');
        ctx.fillStyle = vortexGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, 300, 0, Math.PI * 2);
        ctx.fill();

        // Singularity disk
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Animate particles spiraling in
        bhParticles.forEach(p => {
          p.angle -= p.speed;
          // Slowly pull particles closer to center
          p.dist -= 0.6;
          if (p.dist <= 40) {
            p.dist = 300 + Math.random() * 200;
            p.speed = 0.01 + (3 / p.dist);
          }

          const px = cx + Math.cos(p.angle) * p.dist;
          const py = cy + Math.sin(p.angle) * p.dist;

          // Draw particle trail
          const prevPx = cx + Math.cos(p.angle + p.speed * 2.5) * (p.dist + 1.2);
          const prevPy = cy + Math.sin(p.angle + p.speed * 2.5) * (p.dist + 1.2);

          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.globalAlpha = Math.min(1.0, (p.dist - 40) / 100);
          ctx.moveTo(px, py);
          ctx.lineTo(prevPx, prevPy);
          ctx.stroke();
        });
        ctx.globalAlpha = 1.0;

        // Circular sweep line representing warp horizon
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentSector, isWarping]);

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
        pointerEvents: currentSector === 2 || currentSector === 1 ? 'auto' : 'none',
        display: 'block'
      }}
    />
  );
}
