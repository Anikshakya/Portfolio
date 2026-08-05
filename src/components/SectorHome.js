import React, { useState, useEffect } from 'react';

export default function SectorHome() {
  const [typedText, setTypedText] = useState('');
  const fullText = '> SCANNING LIFE FORMS...\n> NAME: Anik Shakya\n> CLASS: Lead Mobile & MERN Developer\n> EXP: Flutter (4 Years) | MERN Stack (1 Year)\n> DEPLOYMENTS: Yonefu Int., NTT Data Kansai, GOATUS';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '650px',
        padding: '120px 24px 140px 24px',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left'
      }}
    >
      {/* 1. Main Greeting Panel */}
      <div className="hud-panel animate-fade-in" style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '10px', color: 'var(--color-cyan)' }} className="hud-monospace">
            CAPTAIN_IDENTITY_DECK // SEC_00
          </span>
          <span className="hud-monospace" style={{ fontSize: '9px', padding: '2px 6px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-cyan)', borderRadius: '3px' }}>
            ID: AS-9610
          </span>
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-header)', fontWeight: 900, marginBottom: '4px', letterSpacing: '-1px' }}>
          ANIK <span className="glow-text-cyan">SHAKYA</span>
        </h1>
        <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: 'var(--color-magenta)', marginBottom: '16px', letterSpacing: '1px' }}>
          Cross-Platform Mobile Engineer & Full-Stack Architect
        </h2>

        {/* Bio Text */}
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-text-main)', marginBottom: '15px' }}>
          An interstellar explorer navigating the cosmos of code. With 4 Earth-years of core specialization in <strong>Flutter</strong> and a trajectory expanded into the <strong>MERN Stack (MongoDB, Express, React, Node.js)</strong>, I construct robust, fluid applications that bridge beautiful user design with high-octane engineering systems.
        </p>

        {/* Typing Diagnostic Screen */}
        <div 
          className="hud-monospace"
          style={{
            background: 'rgba(2, 2, 8, 0.75)',
            borderLeft: '3px solid var(--color-cyan)',
            padding: '12px 16px',
            fontSize: '11px',
            color: 'var(--color-cyan)',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
            borderRadius: '0 4px 4px 0'
          }}
        >
          {typedText}
          <span className="cursor" style={{ animation: 'blink 1s step-end infinite' }}>_</span>
        </div>
      </div>

      {/* 2. Experience Chronology Panel */}
      <div className="hud-panel hud-panel-magenta" style={{ padding: '24px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '12px', letterSpacing: '2px', fontFamily: 'var(--font-header)', color: 'var(--color-magenta)', marginBottom: '16px' }}>
          MISSION RECORDS (WORK CHRONOLOGY)
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '1px solid rgba(255, 0, 127, 0.2)', paddingLeft: '16px', marginLeft: '6px' }}>
          
          {/* Mission 3: GOATUS App */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--color-magenta)', boxShadow: 'var(--shadow-magenta)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>GOATUS APP</h4>
              <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-magenta)' }}>CORE_FLUTTER // FIREBASE</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '4px 0' }}>Lead Architect & Creator</p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-main)', lineHeight: '1.4' }}>
              Engineered a performance dashboard and workout sync application using Flutter & Firebase. Optimized offline state persistence, local caching structures, and real-time state synchronization, achieving sub-100ms database latency.
            </p>
          </div>

          {/* Mission 2: NTT Data Kansai */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>NTT DATA KANSAI</h4>
              <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>MERN // WEB SYSTEMS</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '4px 0' }}>Software Engineer</p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-main)', lineHeight: '1.4' }}>
              Constructed high-security dashboard portals and web micro-frontends using React, Node.js, and Express. Optimized database indexing on MongoDB, accelerating complex spatial-query pipelines.
            </p>
          </div>

          {/* Mission 1: Yonefu International */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold' }}>YONEFU INTERNATIONAL</h4>
              <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>FLUTTER MOBILE</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: '4px 0' }}>Mobile App Engineer</p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-main)', lineHeight: '1.4' }}>
              Designed, built, and deployed high-performance cross-platform applications. Implemented deep hardware features (geolocations, camera integration, background tasks), achieving robust ratings on the Google Play & App Store.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Social Communications Deck */}
      <div className="hud-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)' }}>
          COMMUNICATIONS_UPLINK: ACTIVE
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          
          {/* GitHub */}
          <a 
            href="https://github.com/AnikShakya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hud-button"
            style={{ padding: '6px 10px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GITHUB
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/anik-shakya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hud-button"
            style={{ padding: '6px 10px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LINKEDIN
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/anik_shakya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hud-button"
            style={{ padding: '6px 10px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            INSTAGRAM
          </a>

        </div>
      </div>
      
      {/* Blinking animation style */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
