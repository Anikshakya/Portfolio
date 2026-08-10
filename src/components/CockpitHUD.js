import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function CockpitHUD({ currentSector, setSector, isWarping, triggerWarp }) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [logs, setLogs] = useState([]);
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
      // Create context if it doesn't exist
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
        // High click sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'warp') {
        // Futuristic rising sweep
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.8);
        
        // Low pass filter sweep
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
        // Short subtle buzz
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        // Dual beep chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }, [audioEnabled]);

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
      'SYS_BOOT: Particle deflector shields: FULLY CHARGED',
      'SYS_BOOT: Navigation sub-systems active.',
      'SYS_BOOT: Anchor point established at Orbit of Genesis (Sector 0).'
    ];

    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
      }, index * 800);
    });
  }, []);

  // Monitor sector changes to push new system logs
  useEffect(() => {
    const sectorNames = [
      'Sector 0: Orbit of Genesis (Home Base)',
      'Sector 1: Nebula of Creations (Cargo Bay / Projects)',
      'Sector 2: Constellation of Expertise (System Diagnostics / Skills)',
      'Sector 3: Contact Grid (Communications)'
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
      setLogs(prev => [
        ...prev, 
        `[${new Date().toLocaleTimeString()}] [ALERT] Warp transition started. Plotting smooth scroll path.`,
        `[${new Date().toLocaleTimeString()}] [SYS] Navigation grid engaged.`
      ]);
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
    } else {
      setLogs(prev => {
        if (prev.length > 0) {
          return [
            ...prev, 
            `[${new Date().toLocaleTimeString()}] [NAV] Transition complete. HUD stabilized on destination sector.`,
            `[${new Date().toLocaleTimeString()}] [SYS] Stabilizing thrusters at destination orbit.`
          ];
        }
        return prev;
      });
      setShipStats({
        speed: '2,400 km/s',
        energy: '98.4%',
        shields: '100%',
        coordinates: getSectorCoordinates(currentSector)
      });
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
    if (sectorIdx === currentSector || isWarping) return;
    playSound('click');
    triggerWarp(sectorIdx);
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
    // Audio contexts must be resumed/created inside user gesture
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    setTimeout(() => {
      if (!audioEnabled) {
        // Play short sound to confirm
        try {
          const ctx = audioCtxRef.current;
          ctx.resume();
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        } catch (e) {}
      }
    }, 50);
  };

  return (
    <div className="hud-root" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
      <div className="crt-overlay" />
      
      {/* 1. TOP HEADER DECK */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'auto', gap: '16px', flexWrap: 'wrap' }}>
        
        {/* Ship Identity Panel */}
        <div className="hud-panel" style={{ padding: '12px 20px', flex: '1 1 250px', minWidth: '220px', borderLeftWidth: '4px' }}>
          <h1 style={{ fontSize: '18px', margin: 0, fontFamily: 'var(--font-header)', letterSpacing: '2px' }} className="glow-text-cyan">
            STARSHIP ANIK-01
          </h1>
          <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8, display: 'flex', gap: '15px' }} className="hud-monospace">
            <span>NAV_TARGET: SEC_{currentSector}</span>
            <span className={isWarping ? 'glow-text-magenta' : 'glow-text-green'}>
              STATUS: {isWarping ? 'WARPING' : 'STABLE_ORBIT'}
            </span>
          </div>
        </div>

        {/* Dynamic Sector Navigation Panels */}
        <div className="hud-panel" style={{ display: 'flex', gap: '8px', padding: '8px', alignItems: 'center' }}>
          {['GENESIS', 'CREATIONS', 'EXPERTISE', 'CONTACT'].map((secName, idx) => (
            <button
              key={idx}
              className={`hud-button ${currentSector === idx ? 'glow-text-cyan' : ''}`}
              style={{
                background: currentSector === idx ? 'rgba(0, 240, 255, 0.18)' : 'transparent',
                borderColor: currentSector === idx ? 'var(--color-cyan)' : 'rgba(0, 240, 255, 0.15)',
                fontSize: '11px',
                padding: '6px 12px'
              }}
              onClick={() => handleSectorChange(idx)}
              onMouseEnter={() => playSound('hover')}
              disabled={isWarping}
            >
              SEC_0{idx} {secName}
            </button>
          ))}
        </div>

        {/* Audio Speaker Toggle */}
        <button
          className="hud-panel hud-button"
          onClick={toggleAudio}
          style={{
            padding: '10px 14px',
            fontSize: '11px',
            borderColor: audioEnabled ? 'var(--color-green)' : 'var(--color-magenta)',
            color: audioEnabled ? 'var(--color-green)' : 'var(--color-magenta)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'auto'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          AUDIO: {audioEnabled ? 'MUTED_OFF' : 'MUTED_ON'}
        </button>
      </div>

      {/* 2. HUD RETICLE BRACKETS (Visual background flair) */}
      <div style={{ position: 'absolute', top: '15%', left: '5%', width: '150px', height: '150px', borderLeft: '1px solid rgba(0, 240, 255, 0.08)', borderTop: '1px solid rgba(0, 240, 255, 0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '15%', right: '5%', width: '150px', height: '150px', borderRight: '1px solid rgba(0, 240, 255, 0.08)', borderTop: '1px solid rgba(0, 240, 255, 0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '150px', height: '150px', borderLeft: '1px solid rgba(0, 240, 255, 0.08)', borderBottom: '1px solid rgba(0, 240, 255, 0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: '150px', height: '150px', borderRight: '1px solid rgba(0, 240, 255, 0.08)', borderBottom: '1px solid rgba(0, 240, 255, 0.08)', pointerEvents: 'none' }} />

      {/* Bottom Section*/}
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', pointerEvents: 'auto', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
        
        
        <div className="hud-panel hud-panel-amber" style={{ padding: '12px 18px', flex: '1 1 250px', minWidth: '220px' }}>
          <h2 style={{ fontSize: '11px', margin: 0, fontFamily: 'var(--font-header)', letterSpacing: '1px' }} className="glow-text-amber">
            SHIELD & RADAR TELEMETRY
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '10px', fontSize: '10px' }} className="hud-monospace">
            <div>COORDS: <span style={{ color: '#fff' }}>{shipStats.coordinates}</span></div>
            <div>VELOCITY: <span style={{ color: '#fff' }}>{shipStats.speed}</span></div>
            <div>REACTOR CORE: <span style={{ color: '#fff' }}>{shipStats.energy}</span></div>
            <div>SHIELD STRUCT: <span style={{ color: '#fff' }}>{shipStats.shields}</span></div>
          </div>
        </div>

        
        <div className="hud-panel" style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '220px' }}>
          <div style={{ fontSize: '9px', fontFamily: 'var(--font-header)', letterSpacing: '1px', marginBottom: '8px', color: 'var(--color-cyan)' }}>
            WARP SPEED INJECTOR
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
            <span style={{ fontSize: '8px', fontFamily: 'var(--font-hud)' }}>0.00c</span>
            <input 
              type="range" 
              min="0" 
              max="3" 
              value={currentSector} 
              disabled={isWarping}
              onChange={(e) => handleSectorChange(parseInt(e.target.value))}
              style={{
                flex: 1,
                cursor: isWarping ? 'not-allowed' : 'pointer',
                accentColor: 'var(--color-cyan)',
                background: 'rgba(0, 240, 255, 0.1)',
                height: '4px',
                borderRadius: '2px',
                border: 'none',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '8px', fontFamily: 'var(--font-hud)' }}>MAX_WARP</span>
          </div>
          <div style={{ fontSize: '8px', fontFamily: 'var(--font-hud)', opacity: 0.6, marginTop: '6px' }}>
            {isWarping ? 'INJECTING ANTIMATTER...' : 'THROTTLE READY'}
          </div>
        </div>

        
        <div 
          className="hud-panel" 
          style={{ 
            flex: '2 1 400px', 
            minWidth: '300px', 
            height: '110px', 
            padding: '8px 14px', 
            display: 'flex', 
            flexDirection: 'column', 
            background: 'rgba(2, 2, 8, 0.85)' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,240,255,0.1)', paddingBottom: '4px', marginBottom: '6px' }}>
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-header)', color: 'var(--color-cyan)', letterSpacing: '1.5px' }}>
              DIAGNOSTICS_PORT: TERMINAL_OUT
            </span>
            <span style={{ fontSize: '8px', fontFamily: 'var(--font-hud)', color: 'var(--color-green)' }}>
              ONLINE_REC
            </span>
          </div>
          <div 
            ref={logContainerRef} 
            className="hud-monospace" 
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              fontSize: '10px', 
              color: 'rgba(0, 240, 255, 0.85)', 
              lineHeight: '1.4', 
              textAlign: 'left' 
            }}
          >
            {logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '2px', wordBreak: 'break-all' }}>
                {log}
              </div>
            ))}
          </div>
        </div>

      </div> */}
    </div>
  );
}
