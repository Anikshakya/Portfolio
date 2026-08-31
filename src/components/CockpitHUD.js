import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function CockpitHUD({ currentSector, setSector, isWarping, triggerWarp, theme = 'dark', toggleTheme = () => { } }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const audioCtxRef = useRef(null);

  const resumeUrl = "https://drive.google.com/file/d/1DVXMgBsQ2_-sZ87uilSv-n76lRJsrCFP/view?usp=sharing";

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
    } catch (e) { }
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
      } catch (e) { }
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
    { id: 2, name: 'Skills' },
    { id: 3, name: 'Contact' }
  ];

  return (
    <>
      {/* FLOATING NAVIGATION PILL HEADER */}
      <header
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          pointerEvents: 'auto',
          width: 'calc(100% - 32px)',
          maxWidth: '890px'
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(30px) saturate(200%)',
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '9999px',
            padding: '6px 10px 6px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-card), var(--glass-specular)'
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

          {/* Actions: Download Resume, Theme Switcher, Sound & Mobile Drawer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Download Resume / CV Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial btn-primary desktop-nav-pills"
              style={{
                fontSize: '11.5px',
                padding: '6px 14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Download Anik Shakya's Resume (CV)"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume (CV)
            </a>

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
            inset: 0,
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.18)',
            backdropFilter: 'blur(30px) saturate(140%)',
            WebkitBackdropFilter: 'blur(30px) saturate(140%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            pointerEvents: 'auto',
            animation: 'drawerFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navigationItems.map((item, index) => {
              const isActive = currentSector === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSectorChange(item.id)}
                  style={{
                    width: '100%',
                    appearance: 'none',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '18px',
                    padding: '17px 20px',
                    background: isActive
                      ? 'var(--text-primary)'
                      : 'color-mix(in srgb, var(--bg-card) 88%, transparent)',
                    color: isActive
                      ? 'var(--bg-base)'
                      : 'var(--text-primary)',
                    fontFamily: 'var(--font-header)',
                    fontSize: '17px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isActive
                      ? '0 10px 30px rgba(0,0,0,0.14)'
                      : '0 6px 20px rgba(0,0,0,0.06)',
                    transform: isActive
                      ? 'scale(1.015)'
                      : 'scale(1)',
                    transition:
                      'background 0.35s ease, color 0.35s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
                    animation: `drawerItemIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${80 + index * 55
                      }ms both`
                  }}
                >
                  <span>{item.name}</span>

                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'currentColor',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1)' : 'scale(0)',
                      transition:
                        'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  />
                </button>
              );
            })}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial btn-primary"
              style={{
                marginTop: '10px',
                padding: '17px 20px',
                minHeight: '56px',
                borderRadius: '18px',
                fontSize: '16px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                animation:
                  'drawerItemIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 300ms both'
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume (CV)
            </a>
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
