import React, { useState, useEffect } from 'react';

export default function SectorSkills() {
  const [selectedCategory, setSelectedCategory] = useState('All Skills');
  const [animateMeters, setAnimateMeters] = useState(false);

  useEffect(() => {
    // Trigger meter filling animation after mount
    const timer = setTimeout(() => setAnimateMeters(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    'All Skills',
    'Mobile & Frameworks',
    'State & Architecture',
    'Backend & APIs',
    'Native & Integrations',
    'DevOps & Tools',
  ];

  const allSkills = [
    // Mobile & Frameworks
    {
      id: 'flutter-sdk',
      name: 'Flutter SDK',
      category: 'Mobile & Frameworks',
      level: 0.95,
      levelLabel: 'Expert',
      iconKey: 'flutter',
      color: '#00f0ff', // HUD Cyan
      description: 'Cross-platform iOS & Android engineering, custom UI & responsive layouts.',
      tags: ['iOS', 'Android', 'Web', 'Dart 3'],
    },
    {
      id: 'dart-language',
      name: 'Dart Language',
      category: 'Mobile & Frameworks',
      level: 0.92,
      levelLabel: 'Expert',
      iconKey: 'code',
      color: '#00f0ff', // HUD Cyan
      description: 'Asynchronous programming, Streams, Isolates, Null Safety, OOP mastery.',
      tags: ['Async/Await', 'Streams', 'Generics', 'Null Safety'],
    },

    // State & Architecture
    {
      id: 'clean-arch',
      name: 'Clean Architecture & MVVM',
      category: 'State & Architecture',
      level: 0.88,
      levelLabel: 'Advanced',
      iconKey: 'architecture',
      color: '#ff007f', // HUD Magenta / Purple
      description: 'Decoupled domain, data, and presentation layers for maintainable codebases.',
      tags: ['SOLID', 'Dependency Injection', 'Repository Pattern', 'GetIt'],
    },
    {
      id: 'getx-provider',
      name: 'GetX / Provider',
      category: 'State & Architecture',
      level: 0.85,
      levelLabel: 'Advanced',
      iconKey: 'alt_route',
      color: '#ff007f', // HUD Magenta / Purple
      description: 'Lightweight state management, route management, and dependency injection.',
      tags: ['GetX', 'Provider', 'Dependency Injection'],
    },

    // Backend & APIs
    {
      id: 'firebase-suite',
      name: 'Firebase Suite',
      category: 'Backend & APIs',
      level: 0.88,
      levelLabel: 'Advanced',
      iconKey: 'flame',
      color: '#ffaa00', // HUD Amber
      description: 'Firestore, Auth, Cloud Messaging (FCM), Crashlytics, and Remote Config.',
      tags: ['FCM', 'Firestore', 'Auth', 'Analytics'],
    },
    {
      id: 'rest-apis',
      name: 'REST APIs & Networking',
      category: 'Backend & APIs',
      level: 0.90,
      levelLabel: 'Expert',
      iconKey: 'api',
      color: '#00ff66', // HUD Green
      description: 'HTTP / Dio client, JSON serialization, Interceptors, error handling.',
      tags: ['Dio', 'JSON Parsing', 'JWT Auth', 'WebSockets'],
    },
    {
      id: 'local-storage',
      name: 'Local Storage & Databases',
      category: 'Backend & APIs',
      level: 0.82,
      levelLabel: 'Advanced',
      iconKey: 'storage',
      color: '#00f0ff', // HUD Cyan
      description: 'Offline-first data caching with Hive, Shared Preferences, and SQLite.',
      tags: ['SharedPreferences', 'SQLite', 'Get Storage'],
    },

    // Native & Integrations
    {
      id: 'payments',
      name: 'In-App Subscriptions & Payments',
      category: 'Native & Integrations',
      level: 0.85,
      levelLabel: 'Advanced',
      iconKey: 'payments',
      color: '#00ff66', // HUD Green
      description: 'App Store & Play Store subscription engines, gifting systems, and receipt validation.',
      tags: ['In-App Purchase', 'Subscriptions'],
    },
    {
      id: 'qr-scanning',
      name: 'QR Scanning & Loyalty Rewards',
      category: 'Native & Integrations',
      level: 0.88,
      levelLabel: 'Advanced',
      iconKey: 'qr_code',
      color: '#ffaa00', // HUD Amber
      description: 'Bulk product scanning, warranty verification, and loyalty point calculators.',
      tags: ['QR Code', 'Camera Engine'],
    },
    {
      id: 'maps-geo',
      name: 'Maps & Geo-Data Services',
      category: 'Native & Integrations',
      level: 0.82,
      levelLabel: 'Advanced',
      iconKey: 'map',
      color: '#00f0ff', // HUD Cyan
      description: 'Location services, property geo-data valuation, and public facility search.',
      tags: ['Google Maps', 'Geolocation', 'Geo-Data Matrix'],
    },

    // DevOps & Tools
    {
      id: 'deployment',
      name: 'App Store & Play Store Deployment',
      category: 'DevOps & Tools',
      level: 0.90,
      levelLabel: 'Expert',
      iconKey: 'storefront',
      color: '#00ff66', // HUD Green
      description: 'Full lifecycle release management on Google Play Store & Apple App Store.',
      tags: ['App Store Connect', 'Play Console', 'Release Lifecycle'],
    },
    {
      id: 'git-control',
      name: 'Git & Version Control',
      category: 'DevOps & Tools',
      level: 0.88,
      levelLabel: 'Advanced',
      iconKey: 'merge',
      color: '#ff007f', // HUD Magenta
      description: 'Branching strategies (GitFlow), pull requests, code reviews, and versioning.',
      tags: ['Git', 'GitHub', 'Code Reviews', 'GitFlow'],
    },
    {
      id: 'push-i18n',
      name: 'Push Notifications & i18n',
      category: 'DevOps & Tools',
      level: 0.85,
      levelLabel: 'Advanced',
      iconKey: 'notifications',
      color: '#ffaa00', // HUD Amber
      description: 'Real-time notification feeds, disaster alerts, and multi-language internationalization.',
      tags: ['Push Alerts', 'i18n Localization', 'Bilingual UI'],
    },
  ];

  const filteredSkills = selectedCategory === 'All Skills'
    ? allSkills
    : allSkills.filter(skill => skill.category === selectedCategory);

  const renderIcon = (key, color) => {
    switch (key) {
      case 'flutter':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill={color}>
            <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zM14.314 11.274l-5.614 5.614 3.686 3.686 9.3-9.3h-7.372zM12.386 24h7.372l-3.686-3.686-3.686 3.686z" />
          </svg>
        );
      case 'code':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'architecture':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="2" />
            <path d="m12 7-6 13" />
            <path d="m12 7 6 13" />
            <path d="M9 16h6" />
          </svg>
        );
      case 'alt_route':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="2" />
            <circle cx="18" cy="18" r="2" />
            <path d="M6 8v4a2 2 0 0 0 2 2h6a2 2 0 0 1 2 2v2" />
            <circle cx="18" cy="6" r="2" />
            <path d="M18 8v2a2 2 0 0 1-2 2H8a2 2 0 0 0-2 2v2" />
          </svg>
        );
      case 'flame':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill={color}>
            <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.08 1.83-6.22 4.41-8.73.43-.42 1.14-.14 1.18.45.26 3.79 3.01 4.54 3.78 2.06.31-.99 1.17-3.78-1.57-7.61-.26-.36.08-.85.49-.73 4.14 1.25 9.21 6.54 9.21 12.56 0 4.42-3.53 8-8.5 8z" />
          </svg>
        );
      case 'api':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="8" height="8" rx="2" />
            <rect x="14" y="2" width="8" height="8" rx="2" />
            <rect x="14" y="14" width="8" height="8" rx="2" />
            <rect x="2" y="14" width="8" height="8" rx="2" />
            <path d="M6 10v4" />
            <path d="M18 10v4" />
            <path d="M10 6h4" />
            <path d="M10 18h4" />
          </svg>
        );
      case 'storage':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        );
      case 'payments':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        );
      case 'qr_code':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <circle cx="6.5" cy="6.5" r="1" fill={color} />
            <circle cx="17.5" cy="6.5" r="1" fill={color} />
            <circle cx="6.5" cy="17.5" r="1" fill={color} />
          </svg>
        );
      case 'map':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
        );
      case 'storefront':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'merge':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M6 9v12" />
            <path d="M18 15V9a9 9 0 0 0-9-9" />
          </svg>
        );
      case 'notifications':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="hud-skills-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '100%',
        padding: '50px 12px 10px 12px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Sci-Fi HUD Panel Container */}
      <div
        className="hud-panel animate-fade-in"
        style={{
          padding: '16px 18px',
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px', flexShrink: 0 }}>
          <span style={{ fontSize: '10.5px', color: 'var(--color-cyan)' }} className="hud-monospace">
            SYSTEMS_DIAGNOSTICS // SEC_02 // SKILLS_MATRIX
          </span>
          <span style={{ fontSize: '9.5px', opacity: 0.9 }} className="hud-monospace">
            ACTIVE NODES: <strong style={{ color: 'var(--color-cyan)' }}>{filteredSkills.length} SKILLS</strong> | TOTAL: {allSkills.length} NODES
          </span>
        </div>

        {/* Section Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '1px' }}>
            TECHNICAL <span className="glow-text-cyan">SKILLS & STACK</span>
          </h2>
        </div>

        {/* Category Navigation Tabs */}
        <div className="skills-hud-tabs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="hud-monospace skill-chip-btn"
                style={{
                  background: isActive ? 'var(--color-cyan)' : 'rgba(2, 2, 12, 0.7)',
                  color: isActive ? '#020208' : 'var(--color-cyan)',
                  border: isActive ? '1px solid var(--color-cyan)' : '1px solid rgba(0, 240, 255, 0.25)',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 10px rgba(0, 240, 255, 0.4)' : 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {isActive && <span style={{ fontSize: '10px' }}>⚡</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Wrapper - padded so top row hover effect is 100% visible */}
        <div className="skills-cards-wrapper">
          <div className="skills-cards-grid">
            {filteredSkills.map((skill) => {
              const isExpert = skill.levelLabel === 'Expert';
              return (
                <div key={skill.id} className="hud-skill-card">
                  {/* Top Header: Icon, Name, Badge */}
                  <div className="hud-skill-header">
                    <div
                      className="hud-skill-icon-box"
                      style={{
                        backgroundColor: `${skill.color}15`,
                        borderColor: `${skill.color}40`
                      }}
                    >
                      {renderIcon(skill.iconKey, skill.color)}
                    </div>

                    <div className="hud-skill-title-container">
                      <h3 className="hud-skill-name">{skill.name}</h3>
                    </div>

                    <span
                      className={`hud-skill-badge ${isExpert ? 'badge-expert' : 'badge-advanced'}`}
                    >
                      {skill.levelLabel}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="hud-skill-desc">{skill.description}</p>

                  {/* Progress Bar & Percentage */}
                  <div className="hud-skill-progress-row">
                    <div className="hud-skill-track">
                      <div
                        className="hud-skill-fill"
                        style={{
                          width: animateMeters ? `${skill.level * 100}%` : '0%',
                          backgroundColor: skill.color,
                          boxShadow: `0 0 8px ${skill.color}`
                        }}
                      />
                    </div>
                    <span className="hud-monospace hud-skill-percentage">
                      {Math.round(skill.level * 100)}%
                    </span>
                  </div>

                  {/* Tags List */}
                  <div className="hud-skill-tags">
                    {skill.tags.map((tag, idx) => (
                      <span key={idx} className="hud-monospace hud-skill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Strict CSS Styles with padding for top hover visibility and no scrollbar flashing */}
      <style>{`
        .skills-hud-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .skills-cards-wrapper {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          padding: 8px 3px 6px 3px;
          flex: 1;
        }

        .skills-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          align-items: start;
          align-content: start;
          min-height: 350px;
          transition: opacity 0.2s ease;
        }

        .hud-skill-card {
          background: rgba(2, 2, 12, 0.5);
          border: 1px solid rgba(0, 240, 255, 0.15);
          border-radius: 6px;
          padding: 10px 12px;
          min-height: 110px;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          position: relative;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .hud-skill-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-cyan);
          box-shadow: 0 0 16px rgba(0, 240, 255, 0.35), inset 0 0 8px rgba(0, 240, 255, 0.1);
          background: rgba(4, 8, 24, 0.65);
          z-index: 2;
        }

        .hud-skill-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
          min-width: 0;
        }

        .hud-skill-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 5px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hud-skill-title-container {
          flex: 1;
          min-width: 0;
        }

        .hud-skill-name {
          font-size: 12.5px;
          font-family: var(--font-header);
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.1px;
        }

        .hud-skill-badge {
          font-size: 8.5px;
          font-family: var(--font-hud);
          font-weight: bold;
          padding: 2px 5px;
          border-radius: 4px;
          flex-shrink: 0;
          text-transform: uppercase;
        }

        .badge-expert {
          background: rgba(0, 240, 255, 0.1);
          color: var(--color-cyan);
          border: 1px solid rgba(0, 240, 255, 0.35);
        }

        .badge-advanced {
          background: rgba(255, 0, 127, 0.12);
          color: var(--color-magenta);
          border: 1px solid rgba(255, 0, 127, 0.35);
        }

        .hud-skill-desc {
          font-size: 11px;
          color: var(--color-text-muted);
          line-height: 1.35;
          margin: 0 0 6px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hud-skill-progress-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .hud-skill-track {
          flex: 1;
          height: 5px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .hud-skill-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hud-skill-percentage {
          font-size: 10px;
          font-weight: bold;
          color: var(--color-text-main);
          min-width: 26px;
          text-align: right;
        }

        .hud-skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .hud-skill-tag {
          background: rgba(0, 240, 255, 0.05);
          border: 1px solid rgba(0, 240, 255, 0.15);
          color: var(--color-cyan);
          font-size: 9px;
          padding: 2px 5px;
          border-radius: 3px;
          white-space: nowrap;
        }

        @media (max-width: 1280px) {
          .skills-cards-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .skills-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 550px) {
          .skills-cards-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}