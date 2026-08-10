import React, { useState, useRef, useEffect } from 'react';

export default function SectorProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    {
      id: 'goatus',
      title: 'GOATUS App',
      category: 'Mobile Application',
      stack: ['Flutter', 'Dart', 'Firebase', 'BLoC', 'Hive DB'],
      shortDesc: 'Premium lifestyle and performance tracker featuring offline-first sync and custom analytical gauges.',
      longDesc: 'GOATUS is a lifestyle optimization platform engineered for high-performance scheduling, routines, and telemetry. Built in Flutter utilizing clean architecture with the BLoC pattern, it relies on Hive for high-speed local persistence and triggers background sync with Firebase when network streams are restored. App store deployments serve 10,000+ active interstellar users.',
      status: 'MISSION_ACTIVE',
      github: 'https://github.com/AnikShakya/goatus-app-flutter',
      metrics: [
        'Render Speed: 60 FPS stable',
        'Offline Synchronization: Sub-50ms delta merge',
        'Firebase Stream Latency: < 120ms',
        'Database Weight: Minimal (Binary Hive serialize)'
      ]
    },
    {
      id: 'cargo-tracker',
      title: 'Yonefu Cargo Tracker',
      category: 'Logistics System',
      stack: ['Flutter', 'Node.js', 'WebSockets', 'Google Maps API'],
      shortDesc: 'Real-time multi-agent transport telemetry mapping and tracking mobile package logistics.',
      longDesc: 'Developed at Yonefu International, this mobile client tracks logistics transport vehicles across land routes. Integrates maps with real-time location vectors via Node.js WebSocket pipelines, optimizing geo-ping rates to reduce user battery consumption by 35% without losing coordinate fidelity.',
      status: 'DEPLOYMENT_SUCCESS',
      github: 'https://github.com/AnikShakya/yonefu-cargo-telemetry',
      metrics: [
        'Geo-ping Optimization: +35% battery savings',
        'WebSocket Broadcasts: 1 ping / 3 seconds',
        'Map Refresh Rate: 60Hz vector transition',
        'Asset Integrity: 99.98% transmission success'
      ]
    },
    {
      id: 'crm-portal',
      title: 'NTT Data Kansai Portal',
      category: 'Enterprise CRM Web',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Docker'],
      shortDesc: 'High-security CRM dashboard for role-based internal logistics auditing and report compilations.',
      longDesc: 'A secure CRM administration dashboard designed for enterprise management. Features role-based token validation mechanisms, automated MongoDB indexing optimization that accelerated report query compiling by 4.2x, and a fully Dockerized deployment architecture for smooth cluster hosting.',
      status: 'STANDBY_MODE',
      github: 'https://github.com/AnikShakya/ntt-kansai-crm-core',
      metrics: [
        'Compilation Time: -40% build compression',
        'DB Index Speedup: 4.2x faster query reports',
        'JWT Key Validation: Cryptographically secure RSA-256',
        'Shield Containment: OWASP Top 10 Audited'
      ]
    },
    {
      id: 'astrodev-terminal',
      title: 'AstroDev Editor Theme',
      category: 'Developer Utility',
      stack: ['Javascript', 'VS Code API', 'CSS Grid', 'JSON Scheme'],
      shortDesc: 'A retro-futuristic dark mode theme for VS Code featuring custom particle glows and scanline shaders.',
      longDesc: 'Designed to simulate a command cockpit for developers. This extension replaces editor colors with HSL-tailored cosmic shadows, highlighting imports as stars and syntax components as active system logs. Includes glowing neon variables matching modern space HUD aesthetics.',
      status: 'STABLE_VERSION',
      github: 'https://github.com/AnikShakya/astrodev-terminal-theme',
      metrics: [
        'Active VSCode Downlinks: 2.5k developers',
        'Contrast Ratio: 7.2:1 AAA accessibility compliant',
        'Memory Footprint: < 5MB overhead',
        'Glow Render Pass: WebGL shaders optional'
      ]
    }
  ];

  // Monitor scroll positioning to toggle nav buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: '95px 24px 40px 24px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Expanded panel container width */}
      <div className="hud-panel animate-fade-in" style={{ padding: '28px', width: '100%', maxWidth: '1150px', margin: '0 auto' }}>
        
        {/* Header telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-cyan)' }} className="hud-monospace">
            CARGO_BAY_INVENTORY // SEC_01 // PROJECTS
          </span>
          <span style={{ fontSize: '10px', opacity: 0.6 }} className="hud-monospace">
            ACTIVE_CONTAINERS: 04 / 04
          </span>
        </div>

        <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '20px', letterSpacing: '1px' }}>
          COSMIC <span className="glow-text-cyan">PROJECTS</span> ARCHIVES
        </h2>

        {/* Carousel Wrapper for absolute buttons */}
        <div style={{ position: 'relative', width: '100%' }}>
          
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="hud-nav-btn"
              style={{
                position: 'absolute',
                left: '-16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(6, 12, 30, 0.95)',
                border: '1px solid var(--color-cyan)',
                color: 'var(--color-cyan)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                transition: 'all 0.2s ease'
              }}
              aria-label="Scroll Left"
            >
              &#10094;
            </button>
          )}

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="hud-nav-btn"
              style={{
                position: 'absolute',
                right: '-16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(6, 12, 30, 0.95)',
                border: '1px solid var(--color-cyan)',
                color: 'var(--color-cyan)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                transition: 'all 0.2s ease'
              }}
              aria-label="Scroll Right"
            >
              &#10095;
            </button>
          )}

          {/* Project horizontal flex layout */}
          <div 
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            style={{ 
              display: 'flex', 
              gap: '20px', 
              overflowX: 'auto', 
              padding: '8px 4px 16px 4px', 
              width: '100%', 
              boxSizing: 'border-box',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none'  // IE/Edge
            }}
          >
            {projects.map((proj) => (
              <div 
                key={proj.id}
                className="hud-panel hud-panel-magenta"
                onClick={() => setSelectedProject(proj)}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '250px',
                  flex: '0 0 310px',
                  borderWidth: '1px',
                  borderColor: 'rgba(255, 0, 127, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--color-magenta)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 0, 127, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 127, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-magenta)' }}>
                      [{proj.category.toUpperCase()}]
                    </span>
                    <span className="hud-monospace" style={{ fontSize: '9px', color: '#00ff66' }}>
                      {proj.status}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-header)', fontWeight: 'bold', marginBottom: '10px', color: '#fff' }}>
                    {proj.title}
                  </h3>
                  
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.45', marginBottom: '16px' }}>
                    {proj.shortDesc}
                  </p>
                </div>

                {/* Stack items */}
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {proj.stack.slice(0, 3).map((s, i) => (
                      <span key={i} className="hud-monospace" style={{ fontSize: '9px', padding: '3px 8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '2px' }}>
                        {s}
                      </span>
                    ))}
                    {proj.stack.length > 3 && (
                      <span className="hud-monospace" style={{ fontSize: '9px', padding: '3px 6px', color: 'var(--color-magenta)' }}>
                        +{proj.stack.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Hologram trigger info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--color-cyan)', fontFamily: 'var(--font-hud)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    INITIALIZE_HOLOGRAM_OUTPUT
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Hologram HUD Modal Overlay */}
      {selectedProject && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(2, 2, 8, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="hud-panel hud-panel-amber animate-scale-in"
            style={{
              width: '100%',
              maxWidth: '650px',
              padding: '28px',
              textAlign: 'left',
              borderWidth: '1.5px',
              borderColor: 'var(--color-amber)',
              background: 'rgba(6, 12, 30, 0.95)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 170, 0, 0.2)', paddingBottom: '10px', marginBottom: '18px' }}>
              <span className="hud-monospace glow-text-amber" style={{ fontSize: '11px' }}>
                HOLOGRAM_STREAM_PORT // D-OUT
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-amber)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'var(--font-hud)',
                  padding: '2px 8px'
                }}
              >
                [SHUTDOWN_HOLOGRAM X]
              </button>
            </div>

            {/* Title / Info */}
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-header)', fontWeight: 900, color: '#fff', margin: 0 }}>
                {selectedProject.title}
              </h3>
              <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--color-amber)' }}>
                COSMIC_SECTOR: LOGS_BAY // STAT: {selectedProject.status}
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '14px', lineHeight: '1.55', color: 'var(--color-text-main)', marginBottom: '18px' }}>
              {selectedProject.longDesc}
            </p>

            {/* Specifications metrics */}
            <div style={{ background: 'rgba(255, 170, 0, 0.05)', borderLeft: '3px solid var(--color-amber)', padding: '14px 18px', borderRadius: '0 4px 4px 0', marginBottom: '18px' }}>
              <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-amber)', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                SYSTEMS DIAGNOSTICS & TELEMETRY
              </span>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {selectedProject.metrics.map((metric, i) => (
                  <li key={i} className="hud-monospace" style={{ fontSize: '11px', color: '#fff', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-amber)' }}>✓</span> [ENG_REP] {metric}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div style={{ marginBottom: '22px' }}>
              <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
                SUBSYSTEM INTEGRATIONS:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.stack.map((s, i) => (
                  <span key={i} className="hud-monospace" style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255, 170, 0, 0.1)', color: 'var(--color-amber)', border: '1px solid rgba(255, 170, 0, 0.2)', borderRadius: '3px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Uplink trigger */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-button-amber"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontSize: '11px',
                  padding: '10px 18px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-amber)',
                  background: 'rgba(255, 170, 0, 0.1)',
                  color: 'var(--color-amber)',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-hud)',
                  cursor: 'pointer'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                ESTABLISH_UPLINK_REPOSITORY (GITHUB)
              </a>
              <button 
                onClick={() => setSelectedProject(null)}
                className="hud-button"
                style={{
                  background: 'transparent',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'var(--color-text-muted)',
                  fontSize: '11px'
                }}
              >
                DISMISS
              </button>
            </div>

          </div>
        </div>
      )}
      
      {/* Styles for scrollbar hiding & button hover */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        .hud-nav-btn:hover {
          background: var(--color-cyan) !important;
          color: #020208 !important;
          box-shadow: 0 0 16px var(--color-cyan) !important;
        }
        .animate-fade-in {
          animation: pageFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: modalScaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes pageFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalScaleIn {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}