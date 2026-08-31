import React, { useState, useEffect } from 'react';

export default function SectorSkills() {
  const [animateMeters, setAnimateMeters] = useState(false);

  useEffect(() => {
    // Trigger meter filling animation after mount
    const timer = setTimeout(() => setAnimateMeters(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const coreSkills = [
    { name: 'Flutter & Dart Propulsion', value: 90, color: 'var(--color-cyan)', exp: '4 Years', details: 'GetX/Provider architecture, local caches (SQLite), platform channels, responsive animations.' },
    { name: 'Firebase Cloud Integrations', value: 90, color: 'var(--color-amber)', exp: '4 Years', details: 'Firestore real-time sync networks, auth validation, Crashlytics analytics, Firebase Analytics' },
    { name: 'React.js Web Engines', value: 75, color: 'var(--color-magenta)', exp: '1 Year', details: 'Custom hooks state pipelines, performance profiles, HTML5 canvas integrations, SPA structures.' },
    { name: 'Node.js & Express Routing', value: 50, color: 'var(--color-green)', exp: '1 Year', details: 'REST routing, secure authentication vectors (JWT), middleware injectors' },
    { name: 'MongoDB Database Cores', value: 50, color: 'var(--color-green)', exp: '1 Year', details: 'Document mapping, compound indexing queries, pipeline aggregations.' }
  ];

  return (
    <div
      className="hud-skills-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1050px',
        padding: '80px 20px 20px 20px',
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Core Systems Panel */}
      <div className="hud-panel animate-fade-in" style={{ padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-cyan)' }} className="hud-monospace">
            SYSTEMS_DIAGNOSTICS // SEC_02 // SKILLS
          </span>
          <span style={{ fontSize: '10px', color: 'var(--color-green)', background: 'rgba(0, 255, 128, 0.1)', padding: '2px 8px', borderRadius: '3px' }} className="hud-monospace">
            CORE_REACTIVE: 100%
          </span>
        </div>

        <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '6px', letterSpacing: '1px' }}>
          SKILLS <span className="glow-text-cyan">CONSTELLATION</span>
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
          Starship ANIK-01 operates on a multi-threaded reactive framework. Hover over and drag the constellation nodes in deep space to analyze link forces.
        </p>

        {/* Constellation Nodes Interactive Tip */}
        <div
          className="hud-monospace"
          style={{
            background: 'rgba(0, 240, 255, 0.05)',
            border: '1px dashed var(--color-cyan)',
            padding: '10px 14px',
            fontSize: '11px',
            color: 'var(--color-cyan)',
            borderRadius: '4px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>INTERACTIVE FLUID MECHANICS: Try clicking and dragging skill stars in the background space layout to test spring tension constraints.</span>
        </div>

        {/* Gauges Grid Layout */}
        <div className="skills-gauges-grid">
          {coreSkills.map((skill, idx) => (
            <div key={idx} style={{ background: 'rgba(2, 2, 12, 0.4)', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'var(--font-header)', letterSpacing: '0.5px' }}>
                  {skill.name}
                </span>
                <div className="hud-monospace" style={{ fontSize: '11px', opacity: 0.9 }}>
                  <span style={{ color: 'var(--color-text-muted)', marginRight: '8px' }}>EXP: {skill.exp}</span>
                  <span style={{ fontWeight: 'bold', color: skill.color }}>{skill.value}%</span>
                </div>
              </div>

              {/* Animated Progress bar */}
              <div
                style={{
                  height: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '8px'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: animateMeters ? `${skill.value}%` : '0%',
                    backgroundColor: skill.color,
                    boxShadow: `0 0 10px ${skill.color}`,
                    borderRadius: '4px',
                    transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              {/* Details text */}
              <p style={{ fontSize: '12px', color: 'var(--color-text-main)', lineHeight: '1.4', margin: 0 }}>
                {skill.details}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* 2. Subsystems diagnostics deck */}
      <div className="hud-panel hud-panel-amber" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '12px', letterSpacing: '1.2px', fontFamily: 'var(--font-header)', color: 'var(--color-amber)', marginBottom: '12px' }}>
          AUXILIARY COGNITIVE NODES
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '12px' }} className="hud-monospace">
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.15)', padding: '10px', borderRadius: '4px', background: 'rgba(2,2,8,0.5)', lineHeight: '1.4' }}>
            <span style={{ color: 'var(--color-amber)', fontWeight: 'bold' }}>[PLATFORM]</span> iOS Swift integrations, Android Gradle settings, APK/IPA compilers.
          </div>
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.15)', padding: '10px', borderRadius: '4px', background: 'rgba(2,2,8,0.5)', lineHeight: '1.4' }}>
            <span style={{ color: 'var(--color-amber)', fontWeight: 'bold' }}>[ARCHITECT]</span> Microservices, Clean Architecture, REST endpoints, Websocket feeds.
          </div>
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.15)', padding: '10px', borderRadius: '4px', background: 'rgba(2,2,8,0.5)', lineHeight: '1.4' }}>
            <span style={{ color: 'var(--color-amber)', fontWeight: 'bold' }}>[VERSION]</span> Git branching models, Docker compilation tags, CI/CD runners.
          </div>
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.15)', padding: '10px', borderRadius: '4px', background: 'rgba(2,2,8,0.5)', lineHeight: '1.4' }}>
            <span style={{ color: 'var(--color-amber)', fontWeight: 'bold' }}>[COMPILER]</span> VS Code environment variables, Xcode projects, Android Studio plugins.
          </div>
        </div>
      </div>

      <style>{`
        .skills-gauges-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .hud-skills-wrapper::-webkit-scrollbar {
          width: 6px;
        }
        .hud-skills-wrapper::-webkit-scrollbar-track {
          background: rgba(2, 2, 8, 0.6);
        }
        .hud-skills-wrapper::-webkit-scrollbar-thumb {
          background: var(--color-cyan);
          border-radius: 3px;
          box-shadow: 0 0 6px var(--color-cyan);
        }

        @media (max-width: 820px) {
          .skills-gauges-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .hud-skills-wrapper {
            padding-top: 75px !important;
            max-height: none !important;
            overflow-y: visible !important;
          }
        }
      `}</style>
    </div>
  );
}