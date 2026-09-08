import React, { useState } from 'react';

export default function SectorExperience() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const experiences = [
    {
      id: 'exp-1',
      title: 'Flutter Developer',
      company: 'Miracle Interface',
      location: 'Kathmandu, Nepal',
      startDate: 'Feb 2023',
      endDate: 'Present',
      isCurrent: true,
      description:
        'Architecting and shipping high-performance cross-platform Flutter applications for international clients in Japan and Nepal.',
      achievements: [
        'Developed and released 7+ production mobile apps on App Store and Google Play.',
        'Implemented Inapp Purchase systems, billing systems, Open Street Maps, Google Maps, offline-first sync, REST API integrations, Push Notificaitons, Deeplinkings, and much more',
        'Engineered specialized native hardware features including NFC My Number Card and QR scanner engines.',
      ],
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST API', 'NFC', 'In-App Purchase', 'Maps', 'Deeplinking', 'Native Platform Channels'],
    },
    {
      id: 'exp-2',
      title: 'Flutter Trainee',
      company: 'Miracle Interface',
      location: 'Kathmandu, Nepal',
      startDate: 'Aug 2022',
      endDate: 'Feb 2023',
      isCurrent: false,
      description:
        'Strengthened mobile application engineering skills and contributed to commercial client mobile projects.',
      achievements: [
        'Built responsive mobile UIs and reusable component widget libraries.',
        'Integrated Firebase authentication, push notifications, and analytics.',
      ],
      technologies: ['Flutter', 'Dart', 'Firebase', 'GetX', 'Git'],
    },
    {
      id: 'exp-3',
      title: 'Flutter Intern',
      company: 'Miracle Interface',
      location: 'Kathmandu, Nepal',
      startDate: 'Apr 2022',
      endDate: 'Aug 2022',
      isCurrent: false,
      description:
        'Gained hands-on commercial experience in cross-platform mobile development and Dart fundamental patterns.',
      achievements: [
        'Assisted senior developers in UI bug fixes and feature development.',
        'Mastered Flutter layouts, REST API consumption, and Git version control.',
      ],
      technologies: ['Flutter', 'Dart', 'REST API', 'Git'],
    },
    {
      id: 'exp-4',
      title: 'Web Intern',
      company: 'YIT',
      location: 'Lalitpur, Nepal',
      startDate: 'Feb 2018',
      endDate: 'Apr 2018',
      isCurrent: false,
      description:
        'Gained hands-on experience in Html, Css, JavaScript',
      achievements: [
        'Web Apps, Javascripts techniques',
        'Mastered web UI, responsiveness',
      ],
      technologies: ['Html', 'Css', 'React', 'JavaScript'],
    },
  ];

  const currentExp = experiences[selectedIndex] || experiences[0];

  return (
    <div
      className="hud-experience-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1150px',
        padding: '75px 20px 20px 20px',
        maxHeight: 'calc(100vh - 20px)',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Banner */}
      <div
        className="hud-panel animate-fade-in"
        style={{
          padding: '14px 20px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          flexShrink: 0,
        }}
      >
        <div>
          <span
            className="hud-monospace glow-text-cyan"
            style={{ fontSize: '10.5px', letterSpacing: '1.5px', display: 'block', marginBottom: '2px' }}
          >
            CAREER LOGS // ORBIT TIMELINE
          </span>
          <h2
            style={{
              fontSize: '1.5rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '1px',
            }}
          >
            WORK <span className="glow-text-cyan">EXPERIENCE</span>
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span
            className="hud-monospace glow-text-green"
            style={{
              fontSize: '10px',
              padding: '4px 10px',
              background: 'rgba(0, 255, 102, 0.08)',
              border: '1px solid rgba(0, 255, 102, 0.3)',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-green)',
                boxShadow: '0 0 8px var(--color-green)',
                animation: 'pulse 1.5s infinite',
              }}
            />
            ACTIVE: FLUTTER DEVELOPER @ MIRACLE INTERFACE
          </span>
        </div>
      </div>

      {/* Main Split View: Left Timeline List + Right Telemetry Deck */}
      <div
        className="exp-split-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '16px',
          alignItems: 'stretch',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* LEFT COLUMN: Timeline Selector Nodes */}
        <div
          className="hud-panel"
          style={{
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            position: 'relative',
            background: 'rgba(4, 10, 26, 0.75)',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="hud-monospace glow-text-cyan"
            style={{
              fontSize: '10px',
              letterSpacing: '1px',
              borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
              paddingBottom: '8px',
              marginBottom: '4px',
            }}
          >
            TIMELINE NODES [{experiences.length}]
          </div>

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
            {/* Vertical timeline connecting line */}
            <div
              style={{
                position: 'absolute',
                left: '18px',
                top: '16px',
                bottom: '16px',
                width: '2px',
                background: 'linear-gradient(180deg, var(--color-green) 0%, var(--color-cyan) 60%, rgba(0, 240, 255, 0.15) 100%)',
                zIndex: 1,
              }}
            />

            {experiences.map((exp, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedIndex(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    position: 'relative',
                    paddingLeft: '38px',
                    paddingRight: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: isSelected
                      ? 'rgba(0, 240, 255, 0.12)'
                      : 'rgba(2, 6, 20, 0.5)',
                    border: `1px solid ${isSelected
                      ? 'var(--color-cyan)'
                      : 'rgba(0, 240, 255, 0.12)'
                      }`,
                    boxShadow: isSelected ? '0 0 15px rgba(0, 240, 255, 0.2), inset 0 0 8px rgba(0, 240, 255, 0.1)' : 'none',
                    transition: 'all 0.25s ease',
                    zIndex: 2,
                  }}
                >
                  {/* Node Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '18px',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: exp.isCurrent ? '14px' : '10px',
                      height: exp.isCurrent ? '14px' : '10px',
                      borderRadius: '50%',
                      background: exp.isCurrent
                        ? 'var(--color-green)'
                        : isSelected
                          ? 'var(--color-cyan)'
                          : '#060e22',
                      border: `2px solid ${exp.isCurrent
                        ? '#fff'
                        : isSelected
                          ? 'var(--color-cyan)'
                          : 'rgba(0, 240, 255, 0.4)'
                        }`,
                      boxShadow: exp.isCurrent
                        ? '0 0 10px var(--color-green)'
                        : isSelected
                          ? '0 0 10px var(--color-cyan)'
                          : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontFamily: 'var(--font-header)',
                        fontWeight: isSelected ? 700 : 600,
                        color: isSelected ? '#fff' : 'var(--color-text-main)',
                      }}
                    >
                      {exp.title}
                    </span>
                    {isSelected && (
                      <span style={{ color: 'var(--color-cyan)', fontSize: '10px' }}>▶</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: isSelected ? 'var(--color-cyan)' : 'var(--color-text-muted)' }}>
                      {exp.company}
                    </span>
                    <span className="hud-monospace" style={{ fontSize: '9.5px', color: 'var(--color-text-muted)' }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selector Navigation Tip */}
          <div
            className="hud-monospace"
            style={{
              fontSize: '9.5px',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              borderTop: '1px dashed rgba(0, 240, 255, 0.15)',
              paddingTop: '8px',
            }}
          >
            SELECT NODE TO VIEW TELEMETRY
          </div>
        </div>

        {/* RIGHT COLUMN: Active Role Detail Deck */}
        <div
          className="hud-panel"
          style={{
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(6, 14, 34, 0.85)',
            borderColor: currentExp.isCurrent ? 'var(--color-green)' : 'var(--color-cyan)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(0, 240, 255, 0.1)',
          }}
        >
          <div>
            {/* Header: Title & Company info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px',
                borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
                paddingBottom: '12px',
                marginBottom: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontFamily: 'var(--font-header)',
                      fontWeight: 700,
                      color: '#fff',
                      margin: 0,
                    }}
                  >
                    {currentExp.title}
                  </h3>

                  {currentExp.isCurrent && (
                    <span
                      className="hud-monospace"
                      style={{
                        fontSize: '9px',
                        fontWeight: 'bold',
                        padding: '2px 8px',
                        background: 'rgba(0, 255, 102, 0.15)',
                        color: 'var(--color-green)',
                        border: '1px solid var(--color-green)',
                        borderRadius: '3px',
                        letterSpacing: '0.8px',
                      }}
                    >
                      ACTIVE ROLE
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '4px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    className="glow-text-cyan"
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                    }}
                  >
                    🏢 {currentExp.company}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    📍 {currentExp.location}
                  </span>
                </div>
              </div>

              {/* Dates Badge */}
              <div
                className="hud-monospace"
                style={{
                  fontSize: '11px',
                  padding: '5px 12px',
                  background: 'rgba(0, 240, 255, 0.08)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  borderRadius: '4px',
                  color: 'var(--color-cyan)',
                  fontWeight: 'bold',
                }}
              >
                🗓️ {currentExp.startDate} — {currentExp.endDate}
              </div>
            </div>

            {/* Role Overview */}
            <p
              style={{
                fontSize: '13.5px',
                lineHeight: '1.55',
                color: 'var(--color-text-main)',
                margin: '0 0 14px 0',
              }}
            >
              {currentExp.description}
            </p>

            {/* Key Achievements */}
            <div style={{ marginBottom: '16px' }}>
              <span
                className="hud-monospace"
                style={{
                  fontSize: '10px',
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '8px',
                  letterSpacing: '1px',
                }}
              >
                KEY MILESTONES & ACHIEVEMENTS:
              </span>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {currentExp.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      lineHeight: '1.45',
                    }}
                  >
                    <span style={{ color: 'var(--color-cyan)', fontSize: '11px', marginTop: '2px' }}>
                      ▶
                    </span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Deck: Tech Stack & Previous/Next Controls */}
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                alignItems: 'center',
                borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                paddingTop: '12px',
                marginBottom: '14px',
              }}
            >
              <span
                className="hud-monospace"
                style={{
                  fontSize: '9.5px',
                  color: 'var(--color-text-muted)',
                  marginRight: '4px',
                }}
              >
                STACK:
              </span>
              {currentExp.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="hud-monospace"
                  style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    background: 'rgba(2, 6, 20, 0.8)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    color: 'var(--color-cyan)',
                    borderRadius: '3px',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Quick Cycle Controls */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button
                className="hud-button"
                style={{
                  fontSize: '9.5px',
                  padding: '4px 10px',
                  opacity: selectedIndex === 0 ? 0.4 : 1,
                  cursor: selectedIndex === 0 ? 'default' : 'pointer',
                }}
                disabled={selectedIndex === 0}
                onClick={() => setSelectedIndex(prev => Math.max(0, prev - 1))}
              >
                ◄ NEXT
              </button>

              <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                LOG {selectedIndex + 1} OF {experiences.length}
              </span>

              <button
                className="hud-button"
                style={{
                  fontSize: '9.5px',
                  padding: '4px 10px',
                  opacity: selectedIndex === experiences.length - 1 ? 0.4 : 1,
                  cursor: selectedIndex === experiences.length - 1 ? 'default' : 'pointer',
                }}
                disabled={selectedIndex === experiences.length - 1}
                onClick={() => setSelectedIndex(prev => Math.min(experiences.length - 1, prev + 1))}
              >
                PREVIOUS ►
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.3);
          }
        }

        @media (max-width: 820px) {
          .hud-experience-wrapper {
            padding-top: 75px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: 30px !important;
            max-height: none !important;
          }
          .exp-split-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

