import React, { useState, useEffect } from 'react';

export default function SectorHome() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Hi, I am ANIK SHAKYA.\n\n> CLASS: Lead Mobile & MERN Developer\n> EXP: Flutter (4 Years) | MERN Stack (1 Year)\n> TARGETS: Yonefu Int., NTT Data Kansai, GOATUS';

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

  // Split greeting and name targeting
  const prefixLength = "Hi, I am ".length;
  const nameLength = "ANIK SHAKYA.".length;
  
  const typedPrefix = typedText.substring(0, Math.min(typedText.length, prefixLength));
  const typedName = typedText.length > prefixLength ? typedText.substring(prefixLength, prefixLength + nameLength) : '';
  const typedTelemetry = typedText.length > (prefixLength + nameLength) ? typedText.substring(prefixLength + nameLength) : '';

  return (
    <div 
      className="home-sector-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1250px',
        padding: '100px 24px 40px 24px',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      {/* Outer Flex Container for Dual Column Layout on Desktop */}
      <div className="hud-columns-container" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch', width: '100%' }}>
        
        {/* Left Column: Greeting and Identity Deck */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div className="hud-panel animate-fade-in" style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Telemetry Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '10.5px', color: 'var(--color-cyan)' }} className="hud-monospace">
                  CAPTAIN_IDENTITY_DECK // SEC_00
                </span>
                <span className="hud-monospace" style={{ fontSize: '9.5px', padding: '3px 7px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-cyan)', borderRadius: '3px' }}>
                  ID: AS-9610
                </span>
              </div>

              {/* Typing Terminal with Custom Name Highlight */}
              <div 
                className="hud-monospace glow-box-cyan"
                style={{
                  background: 'rgba(2, 2, 8, 0.85)',
                  borderLeft: '5px solid var(--color-cyan)',
                  padding: '22px 24px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.6',
                  borderRadius: '0 6px 6px 0',
                  minHeight: '140px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 20px rgba(0, 240, 255, 0.08)'
                }}
              >
                {/* Prefix: "Hi, I am " */}
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
                  {typedPrefix}
                </span>

                {/* Highlighted Name: "ANIK SHAKYA." in Cyan */}
                <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--color-cyan)', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>
                  {typedName}
                </span>

                {/* Telemetry details */}
                <span style={{ fontSize: '14px', color: 'var(--color-cyan)' }}>
                  {typedTelemetry}
                </span>

                <span className="cursor" style={{ animation: 'blink 1s step-end infinite', fontSize: '18px', color: 'var(--color-cyan)' }}>_</span>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: 'var(--color-magenta)', marginBottom: '14px', letterSpacing: '0.5px' }}>
                Mobile Engineer & MERN Developer
              </h2>

              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-text-main)' }}>
                An interstellar developer navigating the cosmos of code. Specializing in building high-performance cross-platform mobile apps with <strong>Flutter</strong>, and expanding systems into the <strong>MERN Stack (MongoDB, Express, React, Node.js)</strong>, I bridge beautiful interfaces with scalable backend infrastructure.
              </p>
            </div>
          </div>

          {/* Social Communications Deck */}
          <div className="hud-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)' }}>
              COMMS_UPLINK: ACTIVE
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a 
                href="https://github.com/AnikShakya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '6px 12px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                GITHUB
              </a>
              <a 
                href="https://linkedin.com/in/anik-shakya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '6px 12px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                LINKEDIN
              </a>
              <a 
                href="https://instagram.com/anik_shakya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '6px 12px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                INSTAGRAM
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Mission Records (Chronology) */}
        <div className="hud-panel hud-panel-magenta" style={{ flex: '1 1 500px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '12.5px', letterSpacing: '1.5px', fontFamily: 'var(--font-header)', color: 'var(--color-magenta)', marginBottom: '18px' }}>
            MISSION RECORDS (WORK CHRONOLOGY)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', borderLeft: '2px solid rgba(255, 0, 127, 0.25)', paddingLeft: '18px', marginLeft: '4px' }}>
            
            {/* GOATUS App */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-23px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-magenta)', boxShadow: 'var(--shadow-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>GOATUS APP</h4>
                <span className="hud-monospace" style={{ fontSize: '9.5px', color: 'var(--color-magenta)' }}>CORE_FLUTTER // FIREBASE</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: '1.45', marginTop: '4px' }}>
                Engineered performance dashboard workout sync modules. Optimized offline data state persistence using Hive binary caching, reducing database sync overhead latency.
              </p>
            </div>

            {/* NTT Data Kansai */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-23px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>NTT DATA KANSAI</h4>
                <span className="hud-monospace" style={{ fontSize: '9.5px', color: 'var(--color-text-muted)' }}>MERN // WEB SYSTEMS</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: '1.45', marginTop: '4px' }}>
                Constructed dashboard portals with React/Node/Express. Optimized database compound index queries on MongoDB to compile enterprise logistics records 4.2x faster.
              </p>
            </div>

            {/* Yonefu International */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-23px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>YONEFU INTERNATIONAL</h4>
                <span className="hud-monospace" style={{ fontSize: '9.5px', color: 'var(--color-text-muted)' }}>FLUTTER MOBILE</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: '1.45', marginTop: '4px' }}>
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
            padding-bottom: 20px !important;
          }
          .hud-columns-container {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}