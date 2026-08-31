import React from 'react';

export default function SectorHome({ triggerWarp = () => {} }) {
  const profilePicUrl = "/icons/portfolio.png";

  return (
    <div 
      className="home-sector-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1240px',
        padding: '90px 20px 30px 20px',
        maxHeight: 'calc(100vh - 65px)',
        overflowY: 'auto',
        zIndex: 5,
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      <div className="hud-columns-container" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch', width: '100%' }}>

        {/* Left Column: Hero Identity & Actions */}
        <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>

          <div className="editorial-card fade-in-up" style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Status Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  MOBILE ARCHITECT
                </span>
                <span style={{ fontSize: '11px', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
                  Available for Projects
                </span>
              </div>

              {/* Profile Avatar & Hero Headline */}
              <div className="hud-avatar-row" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '84px', height: '84px', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '22px',
                      padding: '2px',
                      background: 'linear-gradient(135deg, var(--border-hover), var(--border-subtle))',
                      boxShadow: 'var(--shadow-card)'
                    }}
                  >
                    <img
                      src={profilePicUrl}
                      alt="Anik Shakya"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '20px',
                        objectFit: 'cover',
                        display: 'block',
                        background: 'var(--bg-base)'
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>

                <div>
                  <h1 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '-0.04em', lineHeight: '1.15' }} className="headline-gradient">
                    ANIK SHAKYA
                  </h1>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginTop: '6px', fontWeight: 500 }}>
                    Cross-Platform Mobile Engineer & Ex-MERN Developer
                  </span>
                </div>
              </div>

              {/* Editorial Description */}
              <p style={{ fontSize: '14.5px', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 400 }}>
                Senior Flutter Developer specializing in high-performance, production-ready cross-platform mobile apps. Experienced in mobile architecture, native platform channels, state management, complex UI components, and API integrations. Skilled at leading mobile strategies and delivering scalable solutions. Also an ex MERN developer.
              </p>

              {/* Primary & Secondary CTAs */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <button 
                  onClick={() => triggerWarp(1)} 
                  className="btn-editorial btn-primary"
                >
                  View Selected Work →
                </button>
                <button 
                  onClick={() => triggerWarp(3)} 
                  className="btn-editorial"
                >
                  Get In Touch
                </button>
              </div>

              {/* Stats Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid var(--border-subtle)', padding: '12px 10px', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', color: 'var(--accent-primary)' }}>6+</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Deployed Apps</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid var(--border-subtle)', padding: '12px 10px', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', color: 'var(--accent-secondary)' }}>4+ Yrs</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Experience</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid var(--border-subtle)', padding: '12px 10px', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', color: 'var(--accent-emerald)' }}>100%</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Quality</span>
                </div>
              </div>

            </div>
          </div>

          {/* Social Links Card */}
          <div className="editorial-card" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
              CONNECT DIRECTLY
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href="https://github.com/AnikShakya" target="_blank" rel="noopener noreferrer" className="btn-editorial">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/anik-shakya-67141b192/" target="_blank" rel="noopener noreferrer" className="btn-editorial">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/anik_shakya_" target="_blank" rel="noopener noreferrer" className="btn-editorial">
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Featured Highlights Timeline */}
        <div className="editorial-card" style={{ flex: '1 1 360px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
          <h3 style={{ fontSize: '12px', letterSpacing: '0.08em', fontFamily: 'var(--font-header)', color: 'var(--text-muted)', marginBottom: '20px', fontWeight: 600 }}>
            HIGHLIGHTS & FEATURED WORK
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* GOATUS App */}
            <div style={{ background: 'rgba(0, 0, 0, 0.04)', border: '1px solid var(--border-subtle)', padding: '14px 16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>GOATUS APP (JAPAN)</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--accent-secondary)', padding: '2px 8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '9999px' }}>PRODUCTION // FLUTTER</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginTop: '4px', marginBottom: 0 }}>
                Japanese fan-athlete platform with subscriptions, activity feeds, and gifting live on Google Play & Apple App Store.
              </p>
            </div>

            {/* Pecon App */}
            <div style={{ background: 'rgba(0, 0, 0, 0.04)', border: '1px solid var(--border-subtle)', padding: '14px 16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>PECON APP</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--accent-primary)', padding: '2px 8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '9999px' }}>PRODUCTION // WHOLESALE E-COM</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginTop: '4px', marginBottom: 0 }}>
                Wholesale e-commerce app for electronics with QR code scanning for bulk ordering and buyer reward programs.
              </p>
            </div>

            {/* Trandz Vistaar App */}
            <div style={{ background: 'rgba(0, 0, 0, 0.04)', border: '1px solid var(--border-subtle)', padding: '14px 16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>TRANDZ VISTAAR</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--accent-amber)', padding: '2px 8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '9999px' }}>PRODUCTION // APPLIANCES E-COM</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginTop: '4px', marginBottom: 0 }}>
                Home appliances e-commerce platform featuring QR scanning for product authenticity, warranty registration, and rewards.
              </p>
            </div>

            {/* Durga Bhagawati Gaupalika App */}
            <div style={{ background: 'rgba(0, 0, 0, 0.04)', border: '1px solid var(--border-subtle)', padding: '14px 16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>DURGA BHAGAWATI GAUPALIKA</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--accent-emerald)', padding: '2px 8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '9999px' }}>PRODUCTION // CIVIC TECH</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginTop: '4px', marginBottom: 0 }}>
                Civic assistance application for municipal ward situational awareness, announcements, and direct user assistance in Nepal.
              </p>
            </div>

            {/* Mobile Architecture & Native Platform Channels */}
            <div style={{ background: 'rgba(0, 0, 0, 0.04)', border: '1px solid var(--border-subtle)', padding: '14px 16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>CROSS-PLATFORM ARCHITECTURE</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--text-muted)', padding: '2px 8px', background: 'rgba(0,0,0,0.06)', borderRadius: '9999px' }}>FLUTTER & NATIVE</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginTop: '4px', marginBottom: 0 }}>
                Expertise in native platform channels (iOS/Android), state management (GetX/Provider/BLoC), polylines, and Stripe SDKs.
              </p>
            </div>

            {/* Ex MERN Stack */}
            <div style={{ background: 'rgba(0, 0, 0, 0.04)', border: '1px solid var(--border-subtle)', padding: '14px 16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>EX-MERN STACK DEVELOPER</h4>
                <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--text-muted)', padding: '2px 8px', background: 'rgba(0,0,0,0.06)', borderRadius: '9999px' }}>FULL-STACK WEB</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginTop: '4px', marginBottom: 0 }}>
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
          background: var(--bg-base);
        }
        .home-sector-wrapper::-webkit-scrollbar-thumb {
          background: var(--border-hover);
          border-radius: 9999px;
        }
        @media (max-width: 768px) {
          .home-sector-wrapper {
            padding-top: 80px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: 20px !important;
            max-height: none !important;
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