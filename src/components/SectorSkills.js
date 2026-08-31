import React, { useState, useEffect } from 'react';

export default function SectorSkills() {
  const [animateMeters, setAnimateMeters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateMeters(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const coreSkills = [
    { name: 'Flutter & Dart Engine', value: 90, color: 'var(--accent-primary)', exp: '4 Years', details: 'GetX/Provider architecture, local caches (SQLite), platform channels, responsive animations.' },
    { name: 'Firebase Cloud Infrastructure', value: 90, color: 'var(--accent-amber)', exp: '4 Years', details: 'Firestore real-time sync networks, auth validation, Crashlytics analytics, Firebase Analytics' },
    { name: 'React.js Web Client', value: 75, color: 'var(--accent-secondary)', exp: '1 Year', details: 'Custom hooks state pipelines, performance profiles, HTML5 canvas integrations, SPA structures.' },
    { name: 'Node.js & Express API', value: 50, color: 'var(--accent-emerald)', exp: '1 Year', details: 'REST routing, secure authentication vectors (JWT), middleware injectors' },
    { name: 'MongoDB Database', value: 50, color: 'var(--accent-emerald)', exp: '1 Year', details: 'Document mapping, compound indexing queries, pipeline aggregations.' }
  ];

  return (
    <div
      className="hud-skills-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1080px',
        padding: '90px 20px 30px 20px',
        maxHeight: 'calc(100vh - 65px)',
        overflowY: 'auto',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      {/* Core Panel */}
      <div className="editorial-card" style={{ padding: '30px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            ENGINEERING METRICS
          </span>
          <span style={{ fontSize: '10px', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 10px', borderRadius: '9999px', fontWeight: 600 }}>
            PRODUCTION READY
          </span>
        </div>

        <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.04em' }} className="headline-gradient">
          ARCHITECTURE & SKILLS
        </h2>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
          Proven mastery in cross-platform mobile frameworks, real-time cloud infrastructure, and full-stack web API architectures.
        </p>

        {/* Gauges Grid */}
        <div className="skills-gauges-grid">
          {coreSkills.map((skill, idx) => (
            <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.04)', padding: '16px 18px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'var(--font-header)', color: 'var(--text-primary)' }}>
                  {skill.name}
                </span>
                <div className="hud-monospace" style={{ fontSize: '11px' }}>
                  <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>EXP: {skill.exp}</span>
                  <span style={{ fontWeight: 'bold', color: skill.color }}>{skill.value}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: '6px',
                  background: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '10px'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: animateMeters ? `${skill.value}%` : '0%',
                    backgroundColor: skill.color,
                    borderRadius: '9999px',
                    transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                {skill.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Specs */}
      <div className="editorial-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '12px', letterSpacing: '0.08em', fontFamily: 'var(--font-header)', color: 'var(--text-muted)', marginBottom: '14px', fontWeight: 600 }}>
          ADDITIONAL SPECS & TOOLING
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '12px' }} className="hud-monospace">
          <div style={{ border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', lineHeight: '1.45' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>[PLATFORM]</span> iOS Swift integrations, Android Gradle settings, APK/IPA compilers.
          </div>
          <div style={{ border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', lineHeight: '1.45' }}>
            <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>[ARCHITECT]</span> Clean Architecture, REST endpoints, Websocket feeds.
          </div>
          <div style={{ border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', lineHeight: '1.45' }}>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>[VERSION]</span> Git branching models, Docker containers, CI/CD runners.
          </div>
          <div style={{ border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', lineHeight: '1.45' }}>
            <span style={{ color: 'var(--accent-amber)', fontWeight: 'bold' }}>[COMPILER]</span> VS Code environment variables, Xcode projects, Android Studio profiling.
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
          width: 5px;
        }
        .hud-skills-wrapper::-webkit-scrollbar-track {
          background: var(--bg-base);
        }
        .hud-skills-wrapper::-webkit-scrollbar-thumb {
          background: var(--border-hover);
          border-radius: 9999px;
        }

        @media (max-width: 820px) {
          .skills-gauges-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .hud-skills-wrapper {
            padding-top: 80px !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
}