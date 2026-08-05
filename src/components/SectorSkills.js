import React, { useState, useEffect } from 'react';

export default function SectorSkills() {
  const [animateMeters, setAnimateMeters] = useState(false);

  useEffect(() => {
    // Trigger meter filling animation after mount
    const timer = setTimeout(() => setAnimateMeters(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const coreSkills = [
    { name: 'Flutter & Dart Propulsion', value: 95, color: 'var(--color-cyan)', exp: '4 Years', details: 'BLoC/Provider architecture, local caches (Hive/SQLite), platform channels, performance profiling, responsive animations.' },
    { name: 'React.js Web Engines', value: 85, color: 'var(--color-magenta)', exp: '1 Year', details: 'Custom hooks state pipelines, performance profiles, HTML5 canvas integrations, SPA structures.' },
    { name: 'Node.js & Express Routing', value: 80, color: 'var(--color-green)', exp: '1 Year', details: 'REST/GraphQL routing, secure authentication vectors (JWT), middleware injectors, CORS containment.' },
    { name: 'Firebase Cloud Integrations', value: 90, color: 'var(--color-amber)', exp: '4 Years', details: 'Firestore real-time sync networks, offline persistence, serverless Cloud Functions, auth validation, Crashlytics analytics.' },
    { name: 'MongoDB Database Cores', value: 80, color: 'var(--color-green)', exp: '1 Year', details: 'Document mapping, spatial index optimization, compound indexing queries, pipeline aggregations.' }
  ];

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
      {/* 1. Core Systems Panel */}
      <div className="hud-panel animate-fade-in" style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '10px', color: 'var(--color-cyan)' }} className="hud-monospace">
            SYSTEMS_DIAGNOSTICS // SEC_02 // SKILLS
          </span>
          <span style={{ fontSize: '9px', color: 'var(--color-green)' }} className="hud-monospace">
            CORE_REACTIVE: 100%
          </span>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '6px', letterSpacing: '1px' }}>
          SKILLS <span className="glow-text-cyan">CONSTELLATION</span>
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
          Starship ANIK-01 operates on a multi-threaded reactive framework. Hover over and drag the constellation nodes in deep space to analyze link forces.
        </p>

        {/* Constellation Nodes Interactive Tip */}
        <div 
          className="hud-monospace"
          style={{
            background: 'rgba(0, 240, 255, 0.04)',
            border: '1px dashed var(--color-cyan)',
            padding: '10px 14px',
            fontSize: '10px',
            color: 'var(--color-cyan)',
            borderRadius: '4px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>INTERACTIVE FLUID MECHANICS: Try clicking and dragging skill stars in the background space layout to test spring tension constraints.</span>
        </div>

        {/* Gauges list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {coreSkills.map((skill, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-header)' }}>
                  {skill.name}
                </span>
                <div className="hud-monospace" style={{ fontSize: '10px', opacity: 0.8 }}>
                  <span>EXP: {skill.exp}</span>
                  <span style={{ marginLeft: '12px', color: skill.color }}>{skill.value}%</span>
                </div>
              </div>
              
              {/* Animated Progress bar */}
              <div 
                style={{ 
                  height: '8px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '4px', 
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div 
                  style={{
                    height: '100%',
                    width: animateMeters ? `${skill.value}%` : '0%',
                    backgroundColor: skill.color,
                    boxShadow: `0 0 8px ${skill.color}`,
                    borderRadius: '3px',
                    transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              {/* Details text */}
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                {skill.details}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* 2. Subsystems diagnostics deck */}
      <div className="hud-panel hud-panel-amber" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '11px', letterSpacing: '1px', fontFamily: 'var(--font-header)', color: 'var(--color-amber)', marginBottom: '10px' }}>
          AUXILIARY COGNITIVE NODES
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px' }} className="hud-monospace">
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.1)', padding: '8px', borderRadius: '4px', background: 'rgba(2,2,8,0.4)' }}>
            <span style={{ color: 'var(--color-amber)' }}>[PLATFORM]</span> iOS Swift integrations, Android Gradle settings, APK/IPA compilers.
          </div>
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.1)', padding: '8px', borderRadius: '4px', background: 'rgba(2,2,8,0.4)' }}>
            <span style={{ color: 'var(--color-amber)' }}>[ARCHITECT]</span> Microservices, Clean Architecture, REST endpoints, Websocket feeds.
          </div>
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.1)', padding: '8px', borderRadius: '4px', background: 'rgba(2,2,8,0.4)' }}>
            <span style={{ color: 'var(--color-amber)' }}>[VERSION]</span> Git branching models, Docker compilation tags, CI/CD runners.
          </div>
          <div style={{ border: '1px solid rgba(255, 170, 0, 0.1)', padding: '8px', borderRadius: '4px', background: 'rgba(2,2,8,0.4)' }}>
            <span style={{ color: 'var(--color-amber)' }}>[COMPILER]</span> VS Code environment variables, XCode projects, Android Studio plugins.
          </div>
        </div>
      </div>

    </div>
  );
}
