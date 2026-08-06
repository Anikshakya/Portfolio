import React, { useState, useEffect } from 'react';

export default function SectorHome() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Hi, i Am Anik Shakya.\n\n> CLASS: Lead Mobile & MERN Developer\n> EXP: Flutter (4 Years) | MERN Stack (1 Year)\n> TARGETS: Yonefu Int., NTT Data Kansai, GOATUS';

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
      className="home-sector-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1100px',
        padding: '95px 24px 30px 24px',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      {/* Outer Flex Container for Dual Column Layout on Desktop */}
      <div className="hud-columns-container" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch', width: '100%' }}>
        
        {/* Left Column: Greeting and Identity Deck */}
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div className="hud-panel animate-fade-in" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', color: 'var(--color-cyan)' }} className="hud-monospace">
                  CAPTAIN_IDENTITY_DECK // SEC_00
                </span>
                <span className="hud-monospace" style={{ fontSize: '8px', padding: '2px 5px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-cyan)', borderRadius: '3px' }}>
                  ID: AS-9610
                </span>
              </div>
              
              <h1 style={{ fontSize: '2.1rem', fontFamily: 'var(--font-header)', fontWeight: 900, marginBottom: '2px', letterSpacing: '-0.5px', lineHeight: '1.1' }}>
                ANIK <span className="glow-text-cyan">SHAKYA</span>
              </h1>
              <h2 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: 'var(--color-magenta)', marginBottom: '12px', letterSpacing: '0.5px' }}>
                Mobile Engineer & MERN Developer
              </h2>

              <p style={{ fontSize: '12.5px', lineHeight: '1.5', color: 'var(--color-text-main)', marginBottom: '12px' }}>
                An interstellar developer navigating the cosmos of code. Specializing in building high-performance cross-platform mobile apps with <strong>Flutter</strong>, and expanding systems into the <strong>MERN Stack (MongoDB, Express, React, Node.js)</strong>, I bridge beautiful interfaces with scalable backend infrastructure.
              </p>
            </div>

            {/* Typing Diagnostic Screen */}
            <div 
              className="hud-monospace"
              style={{
                background: 'rgba(2, 2, 8, 0.75)',
                borderLeft: '3px solid var(--color-cyan)',
                padding: '10px 14px',
                fontSize: '10.5px',
                color: 'var(--color-cyan)',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.4',
                borderRadius: '0 4px 4px 0',
                minHeight: '75px'
              }}
            >
              {typedText}
              <span className="cursor" style={{ animation: 'blink 1s step-end infinite' }}>_</span>
            </div>
          </div>

          {/* Social Communications Deck */}
          <div className="hud-panel" style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-cyan)' }}>
              COMMS_UPLINK: ACTIVE
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <a 
                href="https://github.com/AnikShakya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '4px 8px', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                GITHUB
              </a>
              <a 
                href="https://linkedin.com/in/anik-shakya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '4px 8px', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                LINKEDIN
              </a>
              <a 
                href="https://instagram.com/anik_shakya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '4px 8px', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                INSTAGRAM
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Mission Records (Chronology) */}
        <div className="hud-panel hud-panel-magenta" style={{ flex: '1 1 450px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '11px', letterSpacing: '1.5px', fontFamily: 'var(--font-header)', color: 'var(--color-magenta)', marginBottom: '14px' }}>
            MISSION RECORDS (WORK CHRONOLOGY)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '1px solid rgba(255, 0, 127, 0.2)', paddingLeft: '14px', marginLeft: '4px' }}>
            
            {/* GOATUS App */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-19px', top: '3px', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-magenta)', boxShadow: 'var(--shadow-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>GOATUS APP</h4>
                <span className="hud-monospace" style={{ fontSize: '8px', color: 'var(--color-magenta)' }}>CORE_FLUTTER // FIREBASE</span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-main)', lineHeight: '1.3', marginTop: '2px' }}>
                Engineered performance dashboard workout sync modules. Optimized offline data state persistence using Hive binary caching, reducing database sync overhead latency.
              </p>
            </div>

            {/* NTT Data Kansai */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-19px', top: '3px', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>NTT DATA KANSAI</h4>
                <span className="hud-monospace" style={{ fontSize: '8px', color: 'var(--color-text-muted)' }}>MERN // WEB SYSTEMS</span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-main)', lineHeight: '1.3', marginTop: '2px' }}>
                Constructed dashboard portals with React/Node/Express. Optimized database compound index queries on MongoDB to compile enterprise logistics records 4.2x faster.
              </p>
            </div>

            {/* Yonefu International */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-19px', top: '3px', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>YONEFU INTERNATIONAL</h4>
                <span className="hud-monospace" style={{ fontSize: '8px', color: 'var(--color-text-muted)' }}>FLUTTER MOBILE</span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--color-text-main)', lineHeight: '1.3', marginTop: '2px' }}>
                Designed and deployed robust, cross-platform logistics transport clients. Integrated background geolocation trackers and WebSocket sync loops.
              </p>
            </div>

          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          .home-sector-wrapper {
            padding-top: 85px !important;
            padding-bottom: 10px !important;
          }
          .hud-columns-container {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .home-sector-wrapper h1 {
            font-size: 1.7rem !important;
          }
        }
      `}</style>
    </div>
  );
}
