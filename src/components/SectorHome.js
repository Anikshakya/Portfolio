import React, { useState, useEffect } from 'react';

export default function SectorHome() {
  const [typedText, setTypedText] = useState('');
  const profilePicUrl = "/icons/portfolio.jpeg";

  const fullText =
    'Hi, I am ANIK SHAKYA.\n\n> CLASS: Flutter Developer & Ex-MERN Developer\n> FOCUS: High-Performance Cross-Platform Mobile Apps';

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
            width: '50%',
            maxWidth: '800px',
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
                  style={{
                    position: 'relative',
                    width: '90px',
                    height: '90px',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      padding: '3px',
                      background:
                        'linear-gradient(135deg, var(--color-cyan), var(--color-magenta))',
                      boxShadow:
                        '0 0 16px rgba(0, 240, 255, 0.4)',
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
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Status Indicator */}
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
                      boxShadow:
                        '0 0 8px var(--color-green)',
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
                Goal-oriented Flutter & Web Developer with
                experience building high-performance,
                cross-platform mobile and web applications.
                Proficient in Flutter, Dart, state management,
                REST APIs, native platform integration, and
                responsive UI development. Focused on delivering
                scalable, maintainable solutions with strong
                performance, usability, and code quality.
              </p>
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
