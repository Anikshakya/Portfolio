import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function CockpitHUD({ currentSector, setSector, isWarping, triggerWarp, theme = 'dark', toggleTheme = () => {} }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const audioCtxRef = useRef(null);

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
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  }, [audioEnabled]);

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
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  const handleSectorChange = (sectorIdx) => {
    setDrawerOpen(false);
    if (sectorIdx === currentSector || isWarping) return;
    playSound('click');
    triggerWarp(sectorIdx);
  };

  const navigationItems = [
    { id: 0, name: 'Overview' },
    { id: 1, name: 'Projects' },
    { id: 2, name: 'Architecture' },
    { id: 3, name: 'Contact' }
  ];

  return (
    <>
      {/* FLOATING NAVIGATION PILL */}
      <header
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          pointerEvents: 'auto',
          width: 'calc(100% - 32px)',
          maxWidth: '820px'
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '9999px',
            padding: '6px 10px 6px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          {/* Brand Monogram */}
          <div
            onClick={() => handleSectorChange(0)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-primary)',
                boxShadow: '0 0 10px var(--accent-primary)'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '-0.3px',
                color: 'var(--text-primary)'
              }}
            >
              ANIK SHAKYA
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="desktop-nav-pills" style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.08)', padding: '3px', borderRadius: '9999px' }}>
            {navigationItems.map((item) => {
              const isActive = currentSector === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectorChange(item.id)}
                  style={{
                    background: isActive ? 'var(--text-primary)' : 'transparent',
                    color: isActive ? 'var(--bg-base)' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '6px 16px',
                    fontSize: '12.5px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    outline: 'none'
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Switcher, Sound & Mobile Drawer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Dark / Light Theme Toggle Switcher */}
            <button
              onClick={() => {
                playSound('click');
                toggleTheme();
              }}
              title="Toggle Dark / Light Mode"
              style={{
                background: 'rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                borderRadius: '9999px',
                width: '32px',
                height: '32px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setAudioEnabled(prev => !prev)}
              style={{
                background: 'rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: audioEnabled ? 'var(--accent-emerald)' : 'var(--text-muted)',
                borderRadius: '9999px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {audioEnabled ? <path d="M19.07 4.93a10 10 0 0 1 0 14.14" /> : <line x1="22" y1="9" x2="16" y2="15" />}
              </svg>
              <span className="desktop-nav-pills">{audioEnabled ? 'Sound' : 'Muted'}</span>
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              className="mobile-drawer-btn"
              onClick={() => {
                playSound('click');
                setDrawerOpen(prev => !prev);
              }}
              style={{
                background: 'rgba(0, 0, 0, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                borderRadius: '9999px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {drawerOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'var(--bg-base)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            pointerEvents: 'auto'
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '360px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navigationItems.map((item) => {
              const isActive = currentSector === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectorChange(item.id)}
                  style={{
                    background: isActive ? 'var(--text-primary)' : 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    color: isActive ? 'var(--bg-base)' : 'var(--text-primary)',
                    fontFamily: 'var(--font-header)',
                    fontSize: '18px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {item.name}
                  {isActive && <span>●</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-pills {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-drawer-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
