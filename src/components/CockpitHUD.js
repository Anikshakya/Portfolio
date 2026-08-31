import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function CockpitHUD({ currentSector, setSector, isWarping, triggerWarp }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [shipStats, setShipStats] = useState({
    speed: '2,400 km/s',
    energy: '98.4%',
    shields: '100%',
    coordinates: 'RA 04h 35m / DEC +16° 30\''
  });
  const audioCtxRef = useRef(null);
  const logContainerRef = useRef(null);

  // Web Audio API Synthesizer wrapped in useCallback
  const playSound = useCallback((type) => {
    if (!audioEnabled) return;

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'warp') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.8);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(2000, now + 0.8);
        
        osc.disconnect(gainNode);
        osc.connect(filter);
        filter.connect(gainNode);

        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.linearRampToValueAtTime(0.12, now + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
        
        osc.start(now);
        osc.stop(now + 0.9);
      } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }, [audioEnabled]);

  // First user interaction listener to auto-resume AudioContext for browser policies
  useEffect(() => {
    const handleFirstInteraction = () => {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      } catch (e) {}
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const getSectorCoordinates = (sector) => {
    switch (sector) {
      case 0: return 'RA 04h 35m / DEC +16° 30\'';
      case 1: return 'RA 18h 53m / DEC -33° 01\'';
      case 2: return 'RA 05h 25m / DEC +06° 25\'';
      case 3: return 'RA 19h 20m / DEC +22° 41\'';
      default: return 'RA 00h 00m / DEC +00° 00\'';
    }
  };

  // Initial boot-up sequence
  useEffect(() => {
    const bootLogs = [
      'SYS_BOOT: Initiating starship HUD v4.8...',
      'SYS_BOOT: Quantum reactor core: ONLINE',
      'SYS_BOOT: Sound Audio Engine: ENABLED',
      'SYS_BOOT: Particle deflector shields: FULLY CHARGED',
      'SYS_BOOT: Navigation sub-systems active.',
      'SYS_BOOT: Anchor point established at Sector 0.'
    ];

    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
      }, index * 600);
    });
  }, []);

  // Monitor sector changes
  useEffect(() => {
    const sectorNames = [
      'Sector 0: Genesis (Home)',
      'Sector 1: Creations (Work Showcase & Projects)',
      'Sector 2: Expertise (Skills Constellation)',
      'Sector 3: Contact Grid'
    ];

    setLogs(prev => {
      if (prev.length > 0) {
        return [
          ...prev,
          `[${new Date().toLocaleTimeString()}] [NAV] Target coordinate locked: ${sectorNames[currentSector]}.`,
          `[${new Date().toLocaleTimeString()}] [SYS] Calibration complete. Orbit path projected.`
        ];
      }
      return prev;
    });
  }, [currentSector]);

  // Adjust telemetry based on warping state
  useEffect(() => {
    let interval;
    if (isWarping) {
      playSound('warp');
      interval = setInterval(() => {
        setShipStats(prev => ({
          ...prev,
          speed: `2,400 km/s`,
          energy: `${(97.8 - Math.random() * 0.5).toFixed(1)}%`,
          shields: `${(98 + Math.random() * 2).toFixed(0)}%`,
          coordinates: getSectorCoordinates(currentSector)
        }));
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isWarping, currentSector, playSound]);

  // Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSectorChange = (sectorIdx) => {
    setDrawerOpen(false);
    if (sectorIdx === currentSector || isWarping) return;
    playSound('click');
    triggerWarp(sectorIdx);
  };

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    if (nextState) {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        audioCtxRef.current.resume();
        playSound('click');
      } catch (e) {}
    }
  };

  const sectorLabels = [
    { title: 'GENESIS', label: 'Home Base', desc: 'Identity, Bio & Highlights' },
    { title: 'CREATIONS', label: 'Work Showcase & Projects', desc: 'Deployed Apps & Repos' },
    { title: 'EXPERTISE', label: 'Skills Constellation', desc: 'Flutter & Native Engine' },
    { title: 'CONTACT', label: 'Comms Uplink', desc: 'Signal Deck & Inquiry' }
  ];

  return (
    <div className="hud-root" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px' }}>
      <div className="crt-overlay" />
      
      {/* 1. TOP HEADER DECK */}
      <div className="hud-top-deck" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto', gap: '10px', width: '100%' }}>
        
        {/* Ship Identity Panel */}
        <div className="hud-panel" style={{ padding: '8px 14px', borderLeftWidth: '4px' }}>
          <h1 style={{ fontSize: '15px', margin: 0, fontFamily: 'var(--font-header)', letterSpacing: '1.5px' }} className="glow-text-cyan">
            STARSHIP ANIK-01
          </h1>
          <div style={{ fontSize: '9.5px', marginTop: '2px', opacity: 0.8, display: 'flex', gap: '10px' }} className="hud-monospace">
            <span>NAV: SEC_0{currentSector}</span>
            <span className={isWarping ? 'glow-text-magenta' : 'glow-text-green'}>
              STAT: {isWarping ? 'WARPING' : 'STABLE'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Deck (Hidden on Mobile) */}
        <div className="hud-panel hud-desktop-nav" style={{ display: 'flex', gap: '6px', padding: '6px', alignItems: 'center' }}>
          {sectorLabels.map((sec, idx) => (
            <button
              key={idx}
              className={`hud-button ${currentSector === idx ? 'glow-text-cyan' : ''}`}
              style={{
                background: currentSector === idx ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                borderColor: currentSector === idx ? 'var(--color-cyan)' : 'rgba(0, 240, 255, 0.15)',
                fontSize: '10px',
                padding: '5px 10px'
              }}
              onClick={() => handleSectorChange(idx)}
              onMouseEnter={() => playSound('hover')}
              disabled={isWarping}
            >
              SEC_0{idx} {sec.title}
            </button>
          ))}
        </div>

        {/* Right Header Actions: Audio Toggle & Mobile Hamburger Drawer Button */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Audio Toggle */}
          <button
            className="hud-panel hud-button"
            onClick={toggleAudio}
            style={{
              padding: '8px 12px',
              fontSize: '10px',
              borderColor: audioEnabled ? 'var(--color-green)' : 'var(--color-magenta)',
              color: audioEnabled ? 'var(--color-green)' : 'var(--color-magenta)',
              background: audioEnabled ? 'rgba(0, 255, 102, 0.08)' : 'rgba(255, 0, 127, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'auto'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {audioEnabled ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </>
              )}
            </svg>
            <span className="hud-desktop-only">AUDIO: {audioEnabled ? 'ON' : 'MUTED'}</span>
          </button>

          {/* Mobile Drawer Trigger Button */}
          <button
            className="hud-panel hud-button hud-mobile-drawer-btn"
            onClick={() => {
              playSound('click');
              setDrawerOpen(prev => !prev);
            }}
            style={{
              padding: '8px 12px',
              fontSize: '11px',
              borderColor: 'var(--color-cyan)',
              color: 'var(--color-cyan)',
              background: 'rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'auto',
              fontWeight: 'bold'
            }}
            aria-label="Toggle Mobile Menu Drawer"
          >
            {drawerOpen ? '✕ CLOSE' : '☰ NAV MENU'}
          </button>
        </div>
      </div>

      {/* 2. MOBILE NAVIGATION DRAWER OVERLAY */}
      {drawerOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(2, 2, 8, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 16px',
            pointerEvents: 'auto',
            animation: 'drawerSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div 
            className="hud-panel hud-panel-cyan"
            style={{
              padding: '20px',
              width: '100%',
              maxWidth: '480px',
              margin: '0 auto',
              background: 'rgba(6, 14, 34, 0.96)',
              borderWidth: '1.5px',
              borderColor: 'var(--color-cyan)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 240, 255, 0.25)', paddingBottom: '12px' }}>
              <div>
                <span className="hud-monospace glow-text-cyan" style={{ fontSize: '11px', display: 'block' }}>
                  NAV_COMPUTER // SEC_SELECT
                </span>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-header)', fontWeight: 'bold', color: '#fff' }}>
                  STARSHIP NAVIGATION DECK
                </span>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="hud-button"
                style={{ padding: '4px 10px', fontSize: '11px', color: 'var(--color-magenta)', borderColor: 'var(--color-magenta)' }}
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Sector Select Buttons List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sectorLabels.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSectorChange(idx)}
                  className="hud-panel"
                  style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    background: currentSector === idx ? 'rgba(0, 240, 255, 0.2)' : 'rgba(2, 6, 20, 0.8)',
                    borderColor: currentSector === idx ? 'var(--color-cyan)' : 'rgba(0, 240, 255, 0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    borderRadius: '6px'
                  }}
                >
                  <div>
                    <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)', display: 'block' }}>
                      SEC_0{idx} - {sec.title}
                    </span>
                    <span style={{ fontSize: '15px', fontFamily: 'var(--font-header)', fontWeight: 'bold', color: '#fff', display: 'block', marginTop: '2px' }}>
                      {sec.label}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '2px' }}>
                      {sec.desc}
                    </span>
                  </div>

                  {currentSector === idx && (
                    <span className="glow-text-cyan hud-monospace" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                      ▶ ACTIVE
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Footer Telemetry */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                ORBIT_STABILITY: 100%
              </span>
              <span className="hud-monospace glow-text-green" style={{ fontSize: '10px' }}>
                WARP_ENGINE: READY
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Styles for mobile responsive nav & drawer animation */}
      <style>{`
        @keyframes drawerSlideDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Responsive layout switching */
        @media (min-width: 769px) {
          .hud-mobile-drawer-btn {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .hud-desktop-nav {
            display: none !important;
          }
          .hud-desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
