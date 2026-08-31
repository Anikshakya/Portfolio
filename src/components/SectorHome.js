import React from 'react';

export default function SectorHome({ triggerWarp = () => {} }) {
  const profilePicUrl = "/icons/portfolio.png";

  const featuredHighlights = [
    { title: 'GOATUS APP (JAPAN)', cat: 'PRODUCTION // FLUTTER', tagColor: 'var(--accent-secondary)', desc: 'Japanese fan-athlete platform with subscriptions, activity feeds, and gifting live on Play Store & App Store.' },
    { title: 'PECON APP', cat: 'PRODUCTION // WHOLESALE E-COM', tagColor: 'var(--accent-primary)', desc: 'Wholesale e-commerce app for electronics with QR code scanning for bulk ordering and reward programs.' },
    { title: 'TRANDZ VISTAAR', cat: 'PRODUCTION // APPLIANCES E-COM', tagColor: 'var(--accent-amber)', desc: 'Home appliances e-commerce platform featuring QR scanning for product authenticity and warranty registration.' },
    { title: 'DURGA BHAGAWATI GAUPALIKA', cat: 'PRODUCTION // CIVIC TECH', tagColor: 'var(--accent-emerald)', desc: 'Civic assistance application for municipal ward situational awareness, announcements, and direct user assistance.' },
    { title: 'MULYANKAN APP', cat: 'PRODUCTION // FINTECH & MAPS', tagColor: 'var(--accent-primary)', desc: 'Official property and land valuation engine widely used in Nepal with map rate algorithms.' },
    { title: 'CROSS-PLATFORM ARCHITECTURE', cat: 'FLUTTER & NATIVE', tagColor: 'var(--accent-secondary)', desc: 'Expertise in native platform channels (iOS/Android), state management (GetX/Provider/BLoC), polylines, and Stripe SDKs.' }
  ];

  return (
    <div 
      className="home-sector-wrapper apple-reveal"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '110px 20px 60px 20px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. CINEMATIC HERO HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }} className="apple-reveal apple-reveal-delay-1">
        
        {/* Availability & Direct Phone Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '6px 18px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '9999px', marginBottom: '22px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 10px var(--accent-emerald)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-emerald)', letterSpacing: '0.02em' }}>
              Available for Selected Mobile Architecture Projects
            </span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>|</span>
          <a href="tel:+9779863021878" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>📞 +977 9863021878</span>
          </a>
        </div>

        {/* Giant Headline */}
        <h1 
          style={{ 
            fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', 
            fontFamily: 'var(--font-header)', 
            fontWeight: 800, 
            lineHeight: '1.08', 
            letterSpacing: '-0.04em', 
            marginBottom: '16px',
            maxWidth: '960px',
            margin: '0 auto 16px auto'
          }} 
          className="headline-gradient"
        >
          Crafting High-Performance Mobile Applications.
        </h1>

        {/* Identity & Subtitle */}
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-header)', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
            ANIK SHAKYA
          </h2>
          <span className="hud-monospace" style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.08em' }}>
            MOBILE ARCHITECT & FULL-STACK ENGINEER
          </span>
        </div>

        {/* Exact Bio Text Requested */}
        <p 
          style={{ 
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)', 
            color: 'var(--text-secondary)', 
            maxWidth: '820px', 
            margin: '0 auto 32px auto', 
            lineHeight: '1.65', 
            fontWeight: 400 
          }}
        >
          Senior Flutter Developer specializing in building high-performance, production-ready cross-platform mobile applications. Experienced in mobile architecture, native platform channels, state management, complex UI components, and API integrations. Skilled at leading mobile strategies and delivering scalable solutions for international clients. Also an ex MERN developer.
        </p>

        {/* Primary & Secondary CTAs */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => triggerWarp(1)} 
            className="btn-editorial btn-primary"
            style={{ padding: '14px 28px', fontSize: '14px', fontWeight: 600 }}
          >
            Explore Selected Projects ↓
          </button>
          <a
            href="tel:+9779863021878"
            className="btn-editorial"
            style={{ padding: '14px 28px', fontSize: '14px', fontWeight: 600 }}
          >
            Call: +977 9863021878
          </a>
          <button 
            onClick={() => triggerWarp(3)} 
            className="btn-editorial"
            style={{ padding: '14px 28px', fontSize: '14px', fontWeight: 500 }}
          >
            Send Inquiry
          </button>
        </div>
      </div>

      {/* 2. BENTO BOX EDITORIAL GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', width: '100%' }}>
        
        {/* Tile 1: Profile & Bio Details (8 Columns) */}
        <div 
          className="editorial-card apple-reveal apple-reveal-delay-2" 
          style={{ gridColumn: 'span 8', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
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
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }} className="headline-gradient">
                  ANIK SHAKYA
                </h3>
                <span className="hud-monospace" style={{ fontSize: '12px', color: 'var(--accent-primary)', display: 'block', marginTop: '4px' }}>
                  MOBILE ARCHITECT & FULL-STACK ENGINEER
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                  📞 +977 9863021878 | ✉️ aniklinkin@gmail.com
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: 'var(--text-secondary)', margin: 0 }}>
              Senior Flutter Developer specializing in building high-performance, production-ready cross-platform mobile applications. Experienced in mobile architecture, native platform channels, state management, complex UI components, and API integrations. Skilled at leading mobile strategies and delivering scalable solutions for international clients. Also an ex MERN developer.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
            <a href="https://github.com/AnikShakya" target="_blank" rel="noopener noreferrer" className="btn-editorial">GitHub</a>
            <a href="https://www.linkedin.com/in/anik-shakya-67141b192/" target="_blank" rel="noopener noreferrer" className="btn-editorial">LinkedIn</a>
            <a href="https://www.instagram.com/anik_shakya_" target="_blank" rel="noopener noreferrer" className="btn-editorial">Instagram</a>
            <a href="https://wa.me/9779863021878" target="_blank" rel="noopener noreferrer" className="btn-editorial">WhatsApp</a>
          </div>
        </div>

        {/* Tile 2: Key Metrics (4 Columns) */}
        <div 
          className="editorial-card apple-reveal apple-reveal-delay-3" 
          style={{ gridColumn: 'span 4', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            TRACK RECORD
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px 0' }}>
            <div>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-header)' }}>5+</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', fontWeight: 500 }}>Live Deployed Mobile Apps</span>
            </div>
            <div>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-secondary)', fontFamily: 'var(--font-header)' }}>4+ Yrs</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', fontWeight: 500 }}>Production Mobile Development</span>
            </div>
            <div>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-header)' }}>100%</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', fontWeight: 500 }}>Client Satisfaction & Quality</span>
            </div>
          </div>

          <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            FLUTTER // REACT // FIREBASE
          </span>
        </div>

        {/* Tile 3: Featured Work Highlights (Full 12 Columns) */}
        <div 
          className="editorial-card apple-reveal apple-reveal-delay-4" 
          style={{ gridColumn: 'span 12', padding: '32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }} className="headline-gradient">
              FEATURED ENGINEERING HIGHLIGHTS
            </h3>
            <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              KEY PROJECTS & ARCHITECTURES
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {featuredHighlights.map((item, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: 'rgba(0, 0, 0, 0.04)', 
                  border: '1px solid var(--border-subtle)', 
                  padding: '18px 20px', 
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{item.title}</h4>
                    <span className="hud-monospace" style={{ fontSize: '9px', color: item.tagColor, padding: '3px 8px', background: 'rgba(0,0,0,0.06)', borderRadius: '9999px' }}>
                      {item.cat}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .editorial-card[style*="span 8"],
          .editorial-card[style*="span 4"] {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
}