import React, { useEffect, useRef } from 'react';

// Skills constellation configuration (static coordinates)
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

export default function SpaceCanvas({ currentSector, isWarping, scrollY = 0, blackHoleTransition = null }) {
  const canvasRef = useRef(null);

  // Sync parameters in refs to avoid resetting the simulation loop
  const scrollYRef = useRef(scrollY);
  const transitionRef = useRef(blackHoleTransition);
  const currentSectorRef = useRef(currentSector);
  const isWarpingRef = useRef(isWarping);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, draggedNode: null });

  // Shockwave ripples coordinates triggered on user clicks
  const shockwavesRef = useRef([]);

  // Dynamic drag physics settings
  const dragPhysicsRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    camYaw: 0,
    camPitch: 0,
    camTargetYaw: 0,
    camTargetPitch: 0,
    wellX: 0,
    wellY: 0,
    bhOffsetX: 0,
    bhOffsetY: 0,
    bhTargetOffsetX: 0,
    bhTargetOffsetY: 0,
    grabbedAsteroid: null
  });

  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    transitionRef.current = blackHoleTransition;
  }, [blackHoleTransition]);

  useEffect(() => {
    currentSectorRef.current = currentSector;
  }, [currentSector]);

  useEffect(() => {
    isWarpingRef.current = isWarping;
  }, [isWarping]);

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

    // Initialize 3D Spiral Galaxy Particles (instead of plain starfields)
    const galaxyStarsCount = 1600;
    const galaxyStars = [];
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.75;

    for (let i = 0; i < galaxyStarsCount; i++) {
      const arm = i % 4; // 4-armed spiral galaxy
      // Dense clustering near center core
      const r = Math.pow(Math.random(), 2.2) * maxRadius + 10;
      const baseAngle = (arm * Math.PI) / 2;
      const spiralAngle = r * 0.006; // spiral wrap multiplier
      const scatter = (Math.random() - 0.5) * (20 / r + 0.22);
      const z = (Math.random() - 0.5) * (maxRadius * 0.15) * (1.0 - r / maxRadius); // Core disk thickness
      
      // Color map based on radius
      let color;
      if (r < maxRadius * 0.12) {
        color = `rgba(255, 240, 210, ${0.85 + Math.random() * 0.15})`; // Glowing hot core stars
      } else if (r < maxRadius * 0.42) {
        color = `rgba(0, 240, 255, ${0.5 + Math.random() * 0.4})`; // Cyan inner arms
      } else {
        color = Math.random() > 0.4 
          ? `rgba(189, 0, 255, ${0.4 + Math.random() * 0.4})` // Violet arms
          : `rgba(255, 0, 127, ${0.4 + Math.random() * 0.3})`; // Pink arms
      }

      galaxyStars.push({
        r,
        baseAngle,
        spiralAngle,
        scatter,
        z,
        color,
        size: 0.6 + Math.random() * 1.5,
        speed: 0.002 + (0.015 / (r + 5)) // Inner stars orbit faster
      });
    }

    // Initialize Asteroid Belt for Sector 1
    const asteroidCount = 15;
    const asteroids = [];
    const createAsteroid = () => {
      const radius = 15 + Math.random() * 22;
      const points = [];
      const numPoints = 6 + Math.floor(Math.random() * 5);
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const offset = radius * (0.85 + Math.random() * 0.3);
        points.push({ x: Math.cos(angle) * offset, y: Math.sin(angle) * offset });
      }
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        points,
        radius,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        glow: 0,
        depth: 0.35 + Math.random() * 0.55 // Parallax depth coefficient
      };
    };
    for (let i = 0; i < asteroidCount; i++) {
      asteroids.push(createAsteroid());
    }

    // Dynamic sizing helper for node target calculations
    const getResponsiveResting = (node) => {
      return {
        x: node.px * canvas.width,
        y: node.py * canvas.height
      };
    };

    // Initialize Skills Constellation Nodes
    const nodes = skillsData.map(node => ({
      ...node,
      x: node.px * canvas.width,
      y: node.py * canvas.height,
      vx: 0,
      vy: 0,
      glow: 0
    }));

    // Local black hole event horizon particles
    const bhParticlesCount = 200;
    const bhParticles = [];
    for (let i = 0; i < bhParticlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 350;
      bhParticles.push({
        angle,
        dist,
        speed: 0.01 + (3.0 / dist),
        size: 1 + Math.random() * 2,
        color: `hsl(${260 + Math.random() * 60}, 100%, ${65% + Math.random() * 35}%)`
      });
    }

    // Transition black hole particles
    const transBhParticlesCount = 120;
    const transBhParticles = [];
    for (let i = 0; i < transBhParticlesCount; i++) {
      transBhParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: 10 + Math.random() * 280,
        speed: 0.02 + Math.random() * 0.02,
        size: 1.2 + Math.random() * 2,
        color: Math.random() > 0.55 ? '#ff007f' : '#00f0ff'
      });
    }

    // Animation variables
    let galaxyRotation = 0;
    let planetRotation = 0;
    let bhSize = 0; // Transition black hole scale size

    // Drag and Click event listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      const drag = dragPhysicsRef.current;

      // Grab and move skill nodes
      if (currentSectorRef.current === 2 && mouseRef.current.draggedNode !== null) {
        const node = nodes[mouseRef.current.draggedNode];
        node.x = mouseRef.current.x;
        node.y = mouseRef.current.y + scrollYRef.current * 0.3;
        node.vx = 0;
        node.vy = 0;
        return;
      }

      if (drag.isDragging) {
        const dx = mouseRef.current.x - drag.startX;
        const dy = mouseRef.current.y - drag.startY;

        // Camera yaw/pitch tilt targets
        drag.camTargetYaw = dx * 0.005;
        drag.camTargetPitch = dy * 0.005;

        if (currentSectorRef.current === 1 && drag.grabbedAsteroid !== null) {
          const ast = asteroids[drag.grabbedAsteroid];
          ast.x = mouseRef.current.x;
          ast.y = mouseRef.current.y + scrollYRef.current * ast.depth;
        } else if (currentSectorRef.current === 3) {
          drag.bhTargetOffsetX = dx * 0.8;
          drag.bhTargetOffsetY = dy * 0.8;
        }
      }
    };

    const handleMouseDown = (e) => {
      mouseRef.current.isDown = true;
      const drag = dragPhysicsRef.current;
      drag.isDragging = true;
      drag.startX = mouseRef.current.x;
      drag.startY = mouseRef.current.y;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Trigger a click shockwave ripple in galaxy coordinates
      shockwavesRef.current.push({
        x: mouseX,
        y: mouseY,
        radius: 0,
        maxRadius: 160,
        speed: 5.5,
        strength: 32
      });

      if (currentSectorRef.current === 1) {
        let clickedIdx = -1;
        for (let i = 0; i < asteroids.length; i++) {
          const ast = asteroids[i];
          const drawY = ast.y - scrollYRef.current * ast.depth;
          const dist = Math.hypot(ast.x - mouseX, drawY - mouseY);
          if (dist < ast.radius + 12) {
            clickedIdx = i;
            break;
          }
        }
        if (clickedIdx !== -1) {
          drag.grabbedAsteroid = clickedIdx;
        }
      } else if (currentSectorRef.current === 2) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const drawY = node.y - scrollYRef.current * 0.3;
          const dist = Math.hypot(node.x - mouseX, drawY - mouseY);
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
      
      const drag = dragPhysicsRef.current;
      drag.isDragging = false;
      drag.grabbedAsteroid = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Render Loop
    const animate = () => {
      // Clear with trail
      ctx.fillStyle = 'rgba(2, 2, 8, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scrollYVal = scrollYRef.current;
      const transition = transitionRef.current;
      const drag = dragPhysicsRef.current;

      // Decay camera/telemetry drag variables back to center if not actively dragging
      if (!drag.isDragging) {
        drag.camTargetYaw *= 0.94;
        drag.camTargetPitch *= 0.94;
        drag.bhTargetOffsetX *= 0.94;
        drag.bhTargetOffsetY *= 0.94;
      }

      // Smooth camera yaw/pitch transitions
      drag.camYaw += (drag.camTargetYaw - drag.camYaw) * 0.08;
      drag.camPitch += (drag.camTargetPitch - drag.camPitch) * 0.08;
      drag.bhOffsetX += (drag.bhTargetOffsetX - drag.bhOffsetX) * 0.08;
      drag.bhOffsetY += (drag.bhTargetOffsetY - drag.bhOffsetY) * 0.08;

      // Increment orbit rotations
      galaxyRotation += 0.0012;
      planetRotation += 0.0032;

      // Base tilting properties for galaxy
      const basePitch = 60 * Math.PI / 180; // 60 degrees tilt
      const tiltPitch = basePitch + drag.camPitch;

      // 1. Update and draw click shockwave ripples
      const activeShockwaves = shockwavesRef.current;
      shockwavesRef.current = activeShockwaves.filter(wave => {
        wave.radius += wave.speed;
        if (wave.radius < wave.maxRadius) {
          // Draw wave ring
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 * (1 - wave.radius / wave.maxRadius)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.stroke();
          return true;
        }
        return false;
      });

      // 2. Render 3D Parallax Logarithmic Spiral Galaxy
      // Center coordinates offset by Y scroll parallax
      const galCx = canvas.width * 0.5 + drag.camYaw * 100;
      // Parallax center moves up/down with scrolling
      const galCy = canvas.height * 0.5 - (scrollYVal - canvas.height * 1.5) * 0.2 + drag.camPitch * 100;

      for (let i = 0; i < galaxyStarsCount; i++) {
        const star = galaxyStars[i];

        // Orbit rotation calculation
        const rotAngle = star.baseAngle + star.spiralAngle + star.scatter - (galaxyRotation * (star.r * 0.002 + 0.5));
        
        // 3D coordinates relative to galaxy center
        const rx = star.r * Math.cos(rotAngle);
        const ry = star.r * Math.sin(rotAngle);
        const rz = star.z;

        // Apply pitch tilt rotation (around X axis)
        const px = rx;
        const py = ry * Math.cos(tiltPitch) - rz * Math.sin(tiltPitch);

        // Project coordinate location
        let drawX = galCx + px;
        let drawY = galCy + py;

        // Apply interactive shockwave push force calculations
        shockwavesRef.current.forEach(wave => {
          const dx = drawX - wave.x;
          const dy = drawY - wave.y;
          const dist = Math.hypot(dx, dy);
          
          if (Math.abs(dist - wave.radius) < 18) {
            const pushForce = (1 - wave.radius / wave.maxRadius) * wave.strength;
            const pushAngle = Math.atan2(dy, dx);
            drawX += Math.cos(pushAngle) * pushForce;
            drawY += Math.sin(pushAngle) * pushForce;
          }
        });

        // Render star particle
        if (drawX >= 0 && drawX < canvas.width && drawY >= 0 && drawY < canvas.height) {
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Sector-Specific Brackets
      // --- SECTOR 0: Wireframe Hologram Globe (Parallax + camera drags) ---
      if (scrollYVal < canvas.height * 1.2) {
        const cx = (canvas.width > 768 ? canvas.width * 0.75 : canvas.width * 0.5) + drag.camYaw * 40;
        const cy = canvas.height * 0.5 - scrollYVal * 0.4 + drag.camPitch * 40; // Parallax
        const radius = Math.min(canvas.width, canvas.height) * 0.28;

        // Globe background glow
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.4);
        glowGrad.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
        glowGrad.addColorStop(0.5, 'rgba(189, 0, 255, 0.04)');
        glowGrad.addColorStop(1, 'rgba(2, 2, 8, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Latitudes
        ctx.lineWidth = 1;
        for (let lat = -Math.PI / 2 + 0.2; lat < Math.PI / 2; lat += Math.PI / 8) {
          const latRadius = radius * Math.cos(lat);
          const yOffset = radius * Math.sin(lat) + drag.camPitch * 12;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
          ctx.ellipse(cx, cy + yOffset * 0.9, latRadius, latRadius * 0.35, 0.1 + drag.camYaw * 0.05, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Longitudes
        for (let lon = 0; lon < Math.PI; lon += Math.PI / 6) {
          const rotLon = lon + planetRotation + drag.camYaw * 0.5;
          const ellipseWidth = radius * Math.sin(rotLon);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(189, 0, 255, 0.2)';
          ctx.ellipse(cx, cy, Math.abs(ellipseWidth), radius, 0.15 + drag.camPitch * 0.04, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Outer bracket ring
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // --- SECTOR 1: Interactive Asteroid Belt (Parallax depth + gravity grab) ---
      if (scrollYVal > 50 && scrollYVal < canvas.height * 2.2) {
        asteroids.forEach((ast, idx) => {
          const drawY = ast.y - scrollYVal * ast.depth; // parallax Y

          if (idx !== drag.grabbedAsteroid) {
            ast.x += ast.vx;
            ast.y += ast.vy;
            ast.rotation += ast.rotationSpeed;
            ast.vx *= 0.99;
            ast.vy *= 0.99;

            // Hover gravity pull
            const dx = mouseRef.current.x - ast.x;
            const dy = mouseRef.current.y - drawY;
            const dist = Math.hypot(dx, dy);

            if (dist < 120) {
              const force = (120 - dist) / 120 * 0.06;
              const angle = Math.atan2(dy, dx);
              ast.vx -= Math.cos(angle) * force;
              ast.vy -= Math.sin(angle) * force;
              ast.glow = Math.min(1.0, ast.glow + 0.05);
            } else {
              ast.glow = Math.max(0, ast.glow - 0.02);
            }
          }

          // Screen wrap
          if (ast.x < -ast.radius) ast.x = canvas.width + ast.radius;
          if (ast.x > canvas.width + ast.radius) ast.x = -ast.radius;
          if (ast.y < -ast.radius) ast.y = canvas.height + ast.radius;
          if (ast.y > canvas.height + ast.radius) ast.y = -ast.radius;

          ctx.save();
          ctx.translate(ast.x, drawY);
          ctx.rotate(ast.rotation);

          ctx.beginPath();
          ctx.moveTo(ast.points[0].x, ast.points[0].y);
          for (let k = 1; k < ast.points.length; k++) {
            ctx.lineTo(ast.points[k].x, ast.points[k].y);
          }
          ctx.closePath();

          ctx.fillStyle = `rgba(10, 20, 40, 0.75)`;
          ctx.fill();

          const isGrabbed = idx === drag.grabbedAsteroid;
          ctx.strokeStyle = isGrabbed ? 'var(--color-amber)' : `rgba(0, 240, 255, ${0.22 + ast.glow * 0.6})`;
          ctx.lineWidth = isGrabbed ? 2 : 1.5;
          ctx.shadowBlur = (isGrabbed ? 1.0 : ast.glow) * 15;
          ctx.shadowColor = isGrabbed ? 'var(--color-amber)' : 'var(--color-cyan)';
          ctx.stroke();
          ctx.restore();
        });
      }

      // --- SECTOR 2: Interactive Constellation Graph (Parallax & sway drags) ---
      if (scrollYVal > canvas.height * 1.0 && scrollYVal < canvas.height * 3.2) {
        const swayX = drag.isDragging && mouseRef.current.draggedNode === null && currentSectorRef.current === 2
          ? (mouseRef.current.x - drag.startX) * 0.4
          : 0;
        const swayY = drag.isDragging && mouseRef.current.draggedNode === null && currentSectorRef.current === 2
          ? (mouseRef.current.y - drag.startY) * 0.4
          : 0;

        // node spring loops
        nodes.forEach((node, idx) => {
          const rest = getResponsiveResting(node);
          rest.x += swayX;
          rest.y += swayY;

          const drawY = node.y - scrollYVal * 0.3;

          if (idx !== mouseRef.current.draggedNode) {
            const ax = (rest.x - node.x) * 0.035;
            const ay = (rest.y - node.y) * 0.035;
            node.vx += ax;
            node.vy += ay;
            node.vx *= 0.82;
            node.vy *= 0.82;
            node.x += node.vx;
            node.y += node.vy;
          }

          // Hover checks
          const distToMouse = Math.hypot(node.x - mouseRef.current.x, drawY - mouseRef.current.y);
          if (distToMouse < node.radius + 15) {
            node.glow = Math.min(1.0, node.glow + 0.1);
          } else {
            node.glow = Math.max(0, node.glow - 0.05);
          }
        });

        // Spring connection pull
        nodes.forEach((node) => {
          node.connections.forEach(connId => {
            const targetNode = nodes.find(n => n.id === connId);
            if (!targetNode) return;

            const dx = targetNode.x - node.x;
            const dy = targetNode.y - node.y;
            const dist = Math.hypot(dx, dy);
            const restLength = 140;

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

        // Draw node links
        nodes.forEach((node) => {
          node.connections.forEach(connId => {
            const targetNode = nodes.find(n => n.id === connId);
            if (!targetNode) return;

            const drawY1 = node.y - scrollYVal * 0.3;
            const drawY2 = targetNode.y - scrollYVal * 0.3;

            ctx.beginPath();
            ctx.moveTo(node.x, drawY1);
            ctx.lineTo(targetNode.x, drawY2);
            
            const grad = ctx.createLinearGradient(node.x, drawY1, targetNode.x, drawY2);
            grad.addColorStop(0, node.color);
            grad.addColorStop(1, targetNode.color);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.2 + Math.max(node.glow, targetNode.glow) * 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          });
        });

        // Draw nodes
        nodes.forEach((node) => {
          const drawY = node.y - scrollYVal * 0.3;

          ctx.beginPath();
          ctx.arc(node.x, drawY, node.radius + 10, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 0.05 + node.glow * 0.15;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          ctx.beginPath();
          ctx.arc(node.x, drawY, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#060a1a';
          ctx.fill();
          ctx.lineWidth = 2 + node.glow * 2;
          ctx.strokeStyle = node.color;
          ctx.shadowBlur = node.glow * 15;
          ctx.shadowColor = node.color;
          ctx.stroke();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(node.x, drawY, node.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px "Orbitron"';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, node.x, drawY + node.radius + 18);
        });
      }

      // --- SECTOR 3: Event Horizon / Black Hole (Parallax + drag shift) ---
      if (scrollYVal > canvas.height * 2.0) {
        const cx = (canvas.width > 768 ? canvas.width * 0.75 : canvas.width * 0.5) + drag.bhOffsetX;
        const cy = canvas.height * 0.5 - (scrollYVal - canvas.height * 3.0) * 0.5 + drag.bhOffsetY;

        // Draw event horizon glow
        const vortexGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
        vortexGlow.addColorStop(0, '#000000');
        vortexGlow.addColorStop(0.12, '#060114');
        vortexGlow.addColorStop(0.24, 'rgba(189, 0, 255, 0.42)');
        vortexGlow.addColorStop(0.45, 'rgba(0, 240, 255, 0.12)');
        vortexGlow.addColorStop(1, 'rgba(2, 2, 8, 0)');
        ctx.fillStyle = vortexGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, 300, 0, Math.PI * 2);
        ctx.fill();

        // Core singularity
        ctx.beginPath();
        ctx.arc(cx, cy, 42, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Event horizon particles
        bhParticles.forEach(p => {
          p.angle -= p.speed;
          p.dist -= 0.65;
          if (p.dist <= 42) {
            p.dist = 300 + Math.random() * 200;
            p.speed = 0.015 + (3.0 / p.dist);
          }

          const px = cx + Math.cos(p.angle) * p.dist;
          const py = cy + Math.sin(p.angle) * p.dist;

          const prevPx = cx + Math.cos(p.angle + p.speed * 2.5) * (p.dist + 1.2);
          const prevPy = cy + Math.sin(p.angle + p.speed * 2.5) * (p.dist + 1.2);

          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.globalAlpha = Math.min(1.0, (p.dist - 42) / 100);
          ctx.moveTo(px, py);
          ctx.lineTo(prevPx, prevPy);
          ctx.stroke();
        });
        ctx.globalAlpha = 1.0;
      }

      // --- 4. Page-Eating Transition Black Hole (NO WRAP TRAILS) ---
      if (transition) {
        const targetSize = transition.stage === 'implode' ? 1.0 : 0.0;
        bhSize += (targetSize - bhSize) * 0.09;
      } else {
        bhSize += (0.0 - bhSize) * 0.09;
      }

      if (bhSize > 0.015 && transition) {
        const tbx = transition.bx;
        const tby = transition.by;

        const transGlow = ctx.createRadialGradient(tbx, tby, 0, tbx, tby, 220 * bhSize);
        transGlow.addColorStop(0, '#000000');
        transGlow.addColorStop(0.12, '#04000c');
        transGlow.addColorStop(0.3, 'rgba(255, 0, 127, 0.42)');
        transGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.15)');
        transGlow.addColorStop(1, 'rgba(2, 2, 8, 0)');
        
        ctx.fillStyle = transGlow;
        ctx.beginPath();
        ctx.arc(tbx, tby, 220 * bhSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tbx, tby, 25 * bhSize, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = 'var(--color-magenta)';
        ctx.lineWidth = 2 * bhSize;
        ctx.stroke();

        transBhParticles.forEach(p => {
          p.angle -= p.speed * 1.5;
          p.dist -= 1.8 * bhSize;
          if (p.dist <= 15 * bhSize) {
            p.dist = 180 + Math.random() * 120;
          }

          const px = tbx + Math.cos(p.angle) * p.dist * bhSize;
          const py = tby + Math.sin(p.angle) * p.dist * bhSize;

          const prevPx = tbx + Math.cos(p.angle + p.speed * 2.0) * (p.dist + 2.0) * bhSize;
          const prevPy = tby + Math.sin(p.angle + p.speed * 2.0) * (p.dist + 2.0) * bhSize;

          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.globalAlpha = Math.min(1.0, p.dist / 100);
          ctx.moveTo(px, py);
          ctx.lineTo(prevPx, prevPy);
          ctx.stroke();
        });
        ctx.globalAlpha = 1.0;
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
  }, []);

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
        pointerEvents: 'auto', // Always active to capture clicks & drags on background
        display: 'block'
      }}
    />
  );
}
