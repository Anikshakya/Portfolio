import React, { useState } from 'react';

export default function SectorProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

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

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: '95px 24px 30px 24px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div className="hud-panel animate-fade-in" style={{ padding: '20px', width: '100%', maxWidth: '950px', margin: '0 auto' }}>
        
        {/* Header telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '10px', color: 'var(--color-cyan)' }} className="hud-monospace">
            CARGO_BAY_INVENTORY // SEC_01 // PROJECTS
          </span>
          <span style={{ fontSize: '9px', opacity: 0.6 }} className="hud-monospace">
            ACTIVE_CONTAINERS: 04 / 04
          </span>
        </div>

        <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '14px', letterSpacing: '1px' }}>
          COSMIC <span className="glow-text-cyan">PROJECTS</span> ARCHIVES
        </h2>

        {/* Project horizontal flex layout */}
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '10px', width: '100%', boxSizing: 'border-box' }}>
          {projects.map((proj, idx) => (
            <div 
              key={proj.id}
              className="hud-panel hud-panel-magenta"
              onClick={() => setSelectedProject(proj)}
              style={{
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '200px',
                flex: '0 0 260px',
                borderWidth: '1px',
                borderColor: 'rgba(255, 0, 127, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--color-magenta)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 0, 127, 0.2)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-magenta)' }}>
                    [{proj.category.toUpperCase()}]
                  </span>
                  <span className="hud-monospace" style={{ fontSize: '8px', color: '#00ff66' }}>
                    {proj.status}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-header)', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
                  {proj.title}
                </h3>
                
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.4', marginBottom: '12px' }}>
                  {proj.shortDesc}
                </p>
              </div>

              {/* Stack items */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                  {proj.stack.slice(0, 3).map((s, i) => (
                    <span key={i} className="hud-monospace" style={{ fontSize: '8px', padding: '2px 6px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '2px' }}>
                      {s}
                    </span>
                  ))}
                  {proj.stack.length > 3 && (
                    <span className="hud-monospace" style={{ fontSize: '8px', padding: '2px 4px', color: 'var(--color-magenta)' }}>
                      +{proj.stack.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Hologram trigger info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--color-cyan)', fontFamily: 'var(--font-hud)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  INITIALIZE_HOLOGRAM_OUTPUT
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 3. Detailed Hologram HUD Modal Overlay */}
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
              maxWidth: '600px',
              padding: '24px',
              textAlign: 'left',
              borderWidth: '1.5px',
              borderColor: 'var(--color-amber)',
              background: 'rgba(6, 12, 30, 0.95)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 170, 0, 0.2)', paddingBottom: '8px', marginBottom: '16px' }}>
              <span className="hud-monospace glow-text-amber" style={{ fontSize: '10px' }}>
                HOLOGRAM_STREAM_PORT // D-OUT
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-amber)',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontFamily: 'var(--font-hud)',
                  padding: '2px 8px'
                }}
              >
                [SHUTDOWN_HOLOGRAM X]
              </button>
            </div>

            {/* Title / Info */}
            <div style={{ marginBottom: '12px' }}>
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-header)', fontWeight: 900, color: '#fff', margin: 0 }}>
                {selectedProject.title}
              </h3>
              <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-amber)' }}>
                COSMIC_SECTOR: LOGS_BAY // STAT: {selectedProject.status}
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--color-text-main)', marginBottom: '16px' }}>
              {selectedProject.longDesc}
            </p>

            {/* Specifications metrics */}
            <div style={{ background: 'rgba(255, 170, 0, 0.05)', borderLeft: '3px solid var(--color-amber)', padding: '12px 16px', borderRadius: '0 4px 4px 0', marginBottom: '16px' }}>
              <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-amber)', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                SYSTEMS DIAGNOSTICS & TELEMETRY
              </span>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {selectedProject.metrics.map((metric, i) => (
                  <li key={i} className="hud-monospace" style={{ fontSize: '10px', color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--color-amber)' }}>✓</span> [ENG_REP] {metric}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div style={{ marginBottom: '20px' }}>
              <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
                SUBSYSTEM INTEGRATIONS:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedProject.stack.map((s, i) => (
                  <span key={i} className="hud-monospace" style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255, 170, 0, 0.1)', color: 'var(--color-amber)', border: '1px solid rgba(255, 170, 0, 0.2)', borderRadius: '3px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Uplink trigger */}
            <div style={{ display: 'flex', gap: '10px' }}>
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
                  padding: '10px 16px',
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
      
      {/* Styles for animations */}
      <style>{`
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
