import React, { useState, useEffect } from 'react';

export default function SectorHome() {
  const [typedText, setTypedText] = useState('');
  const profilePicUrl = "/icons/portfolio.png";
  const fullText = 'Hi, I am ANIK SHAKYA.\n\n> CLASS: Flutter Developer & Ex-MERN Developer\n> FOCUS: High-Performance Cross-Platform Mobile Apps';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [fullText]);

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
        padding: '65px 20px 20px 20px',
        maxHeight: 'calc(100vh - 75px)',
        overflowY: 'auto',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      {/* Outer Flex Container for Dual Column Layout on Desktop */}
      <div className="hud-columns-container" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch', width: '100%' }}>

        {/* Left Column: Greeting, Picture and Identity Deck */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>

          <div className="hud-panel animate-fade-in" style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Telemetry Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '10.5px', color: 'var(--color-cyan)' }} className="hud-monospace">
                  PROFILE OVERVIEW // ANIK SHAKYA
                </span>
                <span className="hud-monospace" style={{ fontSize: '9.5px', padding: '3px 7px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-cyan)', borderRadius: '3px' }}>
                  ID: AS-9610
                </span>
              </div>

              {/* Profile Avatar & Intro Layout */}
              <div className="hud-avatar-row" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                {/* HUD Profile Image Container */}
                <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      padding: '3px',
                      background: 'linear-gradient(135deg, var(--color-cyan), var(--color-magenta))',
                      boxShadow: '0 0 16px rgba(0, 240, 255, 0.4)',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={profilePicUrl}
                      alt="Anik Shakya"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block',
                        background: '#0a0a16'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  {/* Glowing Status Radar Dot */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'var(--color-green)',
                      border: '2px solid #020208',
                      boxShadow: '0 0 8px var(--color-green)'
                    }}
                  />
                </div>

                <div>
                  <h1 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '1px' }}>
                    ANIK <span className="glow-text-cyan">SHAKYA</span>
                  </h1>
                  <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--color-cyan)', display: 'block', marginTop: '4px' }}>
                    FLUTTER DEVELOPER & EX-MERN DEVELOPER
                  </span>
                </div>
              </div>

              {/* Typing Terminal with Custom Name Highlight */}
              <div
                className="hud-monospace glow-box-cyan"
                style={{
                  background: 'rgba(2, 2, 8, 0.85)',
                  padding: '14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  marginBottom: '16px',
                  minHeight: '75px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                <span style={{ fontSize: '12.5px', color: 'var(--color-text-main)' }}>
                  {typedPrefix}
                </span>

                <span
                  className="glow-text-cyan"
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: 'var(--color-cyan)',
                    background: 'rgba(0, 240, 255, 0.1)',
                    padding: '2px 5px',
                    borderRadius: '3px',
                    margin: '0 2px'
                  }}
                >
                  {typedName}
                </span>

                <span style={{ fontSize: '12.5px', color: 'var(--color-cyan)' }}>
                  {typedTelemetry}
                </span>

                <span className="cursor" style={{ animation: 'blink 1s step-end infinite', fontSize: '16px', color: 'var(--color-cyan)' }}>_</span>
              </div>

              <h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: 'var(--color-magenta)', marginBottom: '10px', letterSpacing: '0.5px' }}>
                ABOUT ME
              </h2>

              <p style={{ fontSize: '13.5px', lineHeight: '1.55', color: 'var(--color-text-main)', margin: 0 }}>
                Goal-oriented Flutter & Web Developer with experience building high-performance, cross-
platform mobile and web applications. Proficient in Flutter, Dart, state management, REST
APIs, native platform integration, and responsive UI development. Focused on delivering
scalable, maintainable solutions with strong performance, usability, and code quality.
              </p>
            </div>
          </div>

          {/* Social Communications Deck */}
          <div className="hud-panel" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-cyan)' }}>
              CONNECT WITH ME
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href="https://github.com/AnikShakya"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '5px 10px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/anik-shakya-67141b192/"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '5px 10px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                LINKEDIN
              </a>
              <a
                href="https://www.instagram.com/anik_shakya_"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-button"
                style={{ padding: '5px 10px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                INSTAGRAM
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Mission Records (Chronology & Core Specialties) */}
        <div className="hud-panel hud-panel-magenta" style={{ flex: '1 1 300px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
          <h3 style={{ fontSize: '12px', letterSpacing: '1.5px', fontFamily: 'var(--font-header)', color: 'var(--color-magenta)', marginBottom: '14px' }}>
            HIGHLIGHTS & FEATURED WORK
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '2px solid rgba(255, 0, 127, 0.25)', paddingLeft: '16px', marginLeft: '4px' }}>

            {/* GOATUS App */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-magenta)', boxShadow: 'var(--shadow-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>GOATUS APP (JAPAN)</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-magenta)' }}>PRODUCTION // FLUTTER</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: '1.4', marginTop: '3px', marginBottom: 0 }}>
                Japanese fan-athlete platform with subscriptions, activity feeds, and gifting live on Play Store & App Store.
              </p>
            </div>

            {/* Pecon App */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-cyan)', boxShadow: 'var(--shadow-cyan)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>PECON APP</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-cyan)' }}>PRODUCTION // WHOLESALE E-COM</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: '1.4', marginTop: '3px', marginBottom: 0 }}>
                Wholesale e-commerce app for electronics with QR code scanning for bulk ordering and reward points.
              </p>
            </div>

            {/* Trandz Vistaar App */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-amber)', boxShadow: 'var(--shadow-amber)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>TRANDZ VISTAAR</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-amber)' }}>PRODUCTION // APPLIANCES E-COM</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: '1.4', marginTop: '3px', marginBottom: 0 }}>
                Home appliances e-commerce platform featuring QR scanning for product authenticity, warranty registration, and rewards.
              </p>
            </div>

            {/* Durga Bhagawati Gaupalika App */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>DURGA BHAGAWATI GAUPALIKA</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-cyan)' }}>PRODUCTION // CIVIC TECH</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: '1.4', marginTop: '3px', marginBottom: 0 }}>
                Civic assistance application for municipal ward situational awareness, announcements, and direct user assistance in Nepal.
              </p>
            </div>

            {/* Mobile Architecture & Native Platform Channels */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>CROSS-PLATFORM ARCHITECTURE</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>FLUTTER & NATIVE</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: '1.4', marginTop: '3px', marginBottom: 0 }}>
                Expertise in native platform channels (iOS/Android), state management (GetX/Provider/BLoC), polylines, and Stripe SDKs.
              </p>
            </div>

            {/* Ex MERN Stack */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-magenta)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>EX-MERN STACK DEVELOPER</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>FULL-STACK WEB</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: '1.4', marginTop: '3px', marginBottom: 0 }}>
                Background in MongoDB, Express.js, React, and Node.js for constructing scalable backend APIs and web admin portals.
              </p>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .home-sector-wrapper::-webkit-scrollbar {
          width: 5px;
        }
        .home-sector-wrapper::-webkit-scrollbar-track {
          background: rgba(2, 2, 8, 0.5);
        }
        .home-sector-wrapper::-webkit-scrollbar-thumb {
          background: var(--color-cyan);
          border-radius: 3px;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          .home-sector-wrapper {
            padding-top: 75px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: 20px !important;
            max-height: none !important;
          }
          .hud-columns-container {
            flex-direction: column !important;
            gap: 14px !important;
          }
        }
        @media (max-width: 480px) {
          .hud-avatar-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}