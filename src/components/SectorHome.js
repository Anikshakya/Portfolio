import React, { useState, useEffect } from 'react';

export default function SectorHome({ onContactClick }) {
  const [typedText, setTypedText] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const profilePicUrl = "/icons/portfolio.jpeg";

  // Lock background outer page scrolling when profile photo modal is open
  useEffect(() => {
    const appEl = document.querySelector('.App');
    if (isImageModalOpen) {
      document.body.style.overflow = 'hidden';
      if (appEl) appEl.style.overflowY = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (appEl) appEl.style.overflowY = '';
    }
    return () => {
      document.body.style.overflow = '';
      if (appEl) appEl.style.overflowY = '';
    };
  }, [isImageModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isImageModalOpen) {
        setIsImageModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen]);

  const fullText =
    'Hi, I am ANIK SHAKYA.\n\n> CLASS: Flutter Developer & Ex-MERN Developer\n> FOCUS: High-Performance Cross-Platform Apps';

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

  const typedPrefix = typedText.substring(
    0,
    Math.min(typedText.length, prefixLength)
  );

  const typedName =
    typedText.length > prefixLength
      ? typedText.substring(
        prefixLength,
        prefixLength + nameLength
      )
      : '';

  const typedTelemetry =
    typedText.length > prefixLength + nameLength
      ? typedText.substring(prefixLength + nameLength)
      : '';

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
        boxSizing: 'border-box',
      }}
    >
      {/* Centered Profile Column */}
      <div
        className="hud-columns-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '55%',
            maxWidth: '850px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >

          {/* Profile / Identity Panel */}
          <div
            className="hud-panel animate-fade-in"
            style={{
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>

              {/* Telemetry Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}
              >
                <span
                  className="hud-monospace"
                  style={{
                    fontSize: '10.5px',
                    color: 'var(--color-cyan)',
                  }}
                >
                  PROFILE OVERVIEW // ANIK SHAKYA
                </span>

                <span
                  className="hud-monospace"
                  style={{
                    fontSize: '9.5px',
                    padding: '3px 7px',
                    background: 'rgba(0, 240, 255, 0.1)',
                    color: 'var(--color-cyan)',
                    borderRadius: '3px',
                  }}
                >
                  ID: AS-9610
                </span>
              </div>

              {/* Profile Avatar & Identity */}
              <div
                className="hud-avatar-row"
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Profile Image */}
                <div
                  className="hud-avatar-box clickable-avatar"
                  onClick={() => setIsImageModalOpen(true)}
                  title="Click to view full photo & fun crew intel"
                  style={{
                    position: 'relative',
                    width: '140px',
                    height: '140px',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      padding: '4px',
                      background:
                        'linear-gradient(135deg, var(--color-cyan), var(--color-magenta))',
                      boxShadow:
                        '0 0 24px rgba(0, 240, 255, 0.5), 0 0 12px rgba(255, 0, 127, 0.4)',
                      position: 'relative',
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
                        background: '#0a0a16',
                      }}
                      onError={(e) => {
                        e.target.src = '/icons/portfolio.png';
                      }}
                    />
                    {/* Hover Hint Overlay */}
                    <div
                      className="avatar-hover-hint hud-monospace"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: 'rgba(2, 8, 22, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-cyan)',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                      }}
                    >
                      🔍 EXPAND
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      right: '6px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--color-green)',
                      border: '2.5px solid #020208',
                      boxShadow:
                        '0 0 10px var(--color-green)',
                    }}
                  />
                </div>

                {/* Identity */}
                <div>
                  <h1
                    style={{
                      fontSize: '1.9rem',
                      fontFamily: 'var(--font-header)',
                      fontWeight: 800,
                      margin: 0,
                      letterSpacing: '1px',
                    }}
                  >
                    ANIK{' '}
                    <span className="glow-text-cyan">
                      SHAKYA
                    </span>
                  </h1>

                  <span
                    className="hud-monospace"
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-cyan)',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    FLUTTER DEVELOPER & EX-MERN DEVELOPER
                  </span>
                </div>
              </div>

              {/* Typing Terminal */}
              <div
                className="hud-monospace glow-box-cyan"
                style={{
                  background: 'rgba(2, 2, 8, 0.85)',
                  padding: '14px',
                  borderRadius: '6px',
                  border:
                    '1px solid rgba(0, 240, 255, 0.25)',
                  marginBottom: '16px',
                  minHeight: '75px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                <span
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--color-text-main)',
                  }}
                >
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
                    margin: '0 2px',
                  }}
                >
                  {typedName}
                </span>

                <span
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--color-cyan)',
                  }}
                >
                  {typedTelemetry}
                </span>

                <span
                  className="cursor"
                  style={{
                    animation:
                      'blink 1s step-end infinite',
                    fontSize: '16px',
                    color: 'var(--color-cyan)',
                  }}
                >
                  _
                </span>
              </div>

              {/* About Me */}
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-header)',
                  fontWeight: 600,
                  color: 'var(--color-magenta)',
                  marginBottom: '10px',
                  letterSpacing: '0.5px',
                }}
              >
                ABOUT ME
              </h2>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: '1.55',
                  color: 'var(--color-text-main)',
                  margin: 0,
                }}
              >
                Flutter & Web Developer with
                experience building high-performance,
                cross-platform mobile and web applications.
                Proficient in Flutter, Dart, state management,
                REST APIs, native platform integration, and
                responsive UI development. Focused on delivering
                scalable, maintainable solutions with strong
                performance, usability, and code quality.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '18px',
                }}
              >
                {[
                  ['+4 YRS', 'EXPERIENCE'],
                  ['16+', 'PROJECTS'],
                  ['100%', 'CLIENT SATISFACTION'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="hud-monospace"
                    style={{
                      flex: '1 1 135px',
                      minWidth: '135px',
                      padding: '10px 12px',
                      border: '1px solid rgba(255, 0, 127, 0.3)',
                      borderRadius: '4px',
                      background: 'rgba(255, 0, 127, 0.07)',
                    }}
                  >
                    <strong className="glow-text-magenta" style={{ display: 'block', fontSize: '16px' }}>
                      {value}
                    </strong>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '9px', letterSpacing: '0.7px' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Communications Deck */}
          <div
            className="hud-panel"
            style={{
              padding: '14px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <span
              className="hud-monospace"
              style={{
                fontSize: '10px',
                color: 'var(--color-cyan)',
              }}
            >
              CONNECT WITH ME
            </span>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >

              {/* Phone */}
              <a
                href="tel:+9779863021878"
                className="hud-button"
                style={{
                  padding: '5px 10px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                +977 9863021878
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AnikShakya"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-button"
                style={{
                  padding: '5px 10px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                GITHUB
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/anik-shakya-67141b192/"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-button"
                style={{
                  padding: '5px 10px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                LINKEDIN
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/anik_shakya_"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-button"
                style={{
                  padding: '5px 10px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                INSTAGRAM
              </a>

              <button
                type="button"
                className="hud-button"
                onClick={onContactClick}
                style={{
                  padding: '5px 10px',
                  fontSize: '10px',
                }}
              >
                GET IN TOUCH ↗
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Expanded Profile Image & Intel Modal */}
      {isImageModalOpen && (
        <div
          className="hud-modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(2, 2, 8, 0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box'
          }}
          onClick={() => setIsImageModalOpen(false)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            className="hud-panel hud-panel-cyan animate-scale-in"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '24px',
              textAlign: 'left',
              borderWidth: '1.5px',
              borderColor: 'var(--color-cyan)',
              background: 'rgba(6, 14, 34, 0.96)',
              boxShadow: '0 0 35px rgba(0, 240, 255, 0.35)',
              maxHeight: '88vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Close Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 240, 255, 0.2)', paddingBottom: '10px', marginBottom: '16px' }}>
              <span className="hud-monospace glow-text-cyan" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                CREW_DOSSIER // PILOT_IDENTIFICATION
              </span>
              <button
                onClick={() => setIsImageModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-cyan)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'var(--font-hud)',
                  padding: '2px 8px'
                }}
              >
                [CLOSE_DOSSIER X]
              </button>
            </div>

            {/* Enlarged Photo Container */}
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div
                style={{
                  width: '210px',
                  height: '210px',
                  margin: '0 auto',
                  borderRadius: '50%',
                  padding: '5px',
                  background: 'linear-gradient(135deg, var(--color-cyan), var(--color-magenta))',
                  boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 15px rgba(255, 0, 127, 0.4)',
                  position: 'relative'
                }}
              >
                <img
                  src="/icons/portfolio.jpeg"
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
                    e.target.src = profilePicUrl;
                  }}
                />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-header)', fontWeight: 800, color: '#fff', marginTop: '14px', marginBottom: '2px' }}>
                ANIK SHAKYA
              </h3>
              <span className="hud-monospace glow-text-cyan" style={{ fontSize: '11px' }}>
                FLUTTER & CROSS-PLATFORM ARCHITECT
              </span>
            </div>

            {/* Fun Info / Intel Section */}
            <div
              style={{
                background: 'rgba(0, 240, 255, 0.05)',
                borderLeft: '3px solid var(--color-cyan)',
                padding: '14px 16px',
                borderRadius: '0 6px 6px 0',
                marginBottom: '4px'
              }}
            >
              <span className="hud-monospace glow-text-cyan" style={{ fontSize: '10.5px', display: 'block', marginBottom: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>
                ⚡ FUN CREW INTEL & TRIVIA:
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li className="hud-monospace" style={{ fontSize: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>☕</span> <span><strong>Primary Fuel:</strong> Moscow Mule -  H20</span>
                </li>
                <li className="hud-monospace" style={{ fontSize: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚡</span> <span><strong>Superpower:</strong> Crafting 120 FPS Flutter widgets, fun animations, native integrations, playing with sockets and mongoDB/express</span>
                </li>
                <li className="hud-monospace" style={{ fontSize: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎮</span> <span><strong>Off-Duty Mode:</strong> Hiking, Thriller movies, gaming & exploring animations, logics </span>
                </li>
                <li className="hud-monospace" style={{ fontSize: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🚀</span> <span><strong>Mission Goal:</strong> Shipping top-ranked production apps for global users</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .clickable-avatar {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .clickable-avatar:hover {
          transform: scale(1.06) !important;
        }

        .clickable-avatar:hover .avatar-hover-hint {
          opacity: 1 !important;
        }

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
          50% {
            opacity: 0;
          }
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

          .hud-columns-container > div {
            width: 100% !important;
            max-width: none !important;
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
