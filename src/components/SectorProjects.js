import React, { useState, useRef } from 'react';

const APP_ICONS = {
  goatus: "/icons/goatus.png",
  pecon: "/icons/pecon.png",
  trandz: "/icons/trandz.png",
  mulyankan: "/icons/mulyankan.png",
  civic: "/icons/durga_bhagawati.png"
};

const projects = [
  {
    id: 'goatus',
    title: 'GOATUS APP',
    category: 'Flutter Mobile App (Japan)',
    appIcon: APP_ICONS.goatus,
    status: 'LIVE STORE',
    shortDesc: 'Japanese Fan-Athlete subscription, activity feed, and gifting platform.',
    fullDesc: 'GOATUS is a Japanese mobile platform built for athletes and fans. Fans can subscribe to athletes, track their daily activity feeds, purchase digital gifts, and interact directly. Engineered with Flutter, native platform channels, and scalable backend integrations.',
    stack: ['Flutter', 'Dart', 'Firebase', 'iOS & Android', 'Native Channels', 'Stripe'],
    playstore: 'https://play.google.com/store/apps/details?id=jp.goatus&hl=en',
    appstore: 'https://apps.apple.com/jp/app/goatus-%E3%82%B4%E3%83%BC%E3%82%BF%E3%82%B9/id6499320524?l=en-US',
    github: '',
    featured: true
  },
  {
    id: 'pecon',
    title: 'Pecon App',
    category: 'E-Commerce (Wholesale)',
    appIcon: APP_ICONS.pecon,
    status: 'LIVE STORE',
    shortDesc: 'B2B Wholesale E-Commerce app for electronic goods with QR scanning and rewards.',
    fullDesc: 'Pecon is a B2B wholesale e-commerce platform tailored for electronic product buyers. It features integrated QR scanning for instant stock ordering, wholesale catalog management, and automated reward points for bulk purchases.',
    stack: ['Flutter', 'Dart', 'QR Scanner', 'GetX', 'REST API', 'Payment Gateways'],
    playstore: 'https://play.google.com/store/search?q=Pecon&c=apps&hl=en',
    appstore: '',
    github: '',
    featured: true
  },
  {
    id: 'trandz',
    title: 'Trandz Vistaar',
    category: 'E-Commerce (Home Appliances)',
    appIcon: APP_ICONS.trandz,
    status: 'LIVE STORE',
    shortDesc: 'Consumer e-commerce platform for purchasing home appliances with QR & rewards.',
    fullDesc: 'Trandz Vistaar is an e-commerce platform designed for purchasing house appliances. Includes QR code scanning for product authenticity verification, digital warranty registration, and buyer reward tiers.',
    stack: ['Flutter', 'Dart', 'QR Scanner', 'GetX', 'REST APIs', 'Firebase'],
    playstore: 'https://play.google.com/store/search?q=trandz%20vistaar&c=apps&hl=en',
    appstore: '',
    github: '',
    featured: true
  },
  {
    id: 'mulyankan',
    title: 'MULYANKAN App',
    category: 'Fintech & Real Estate (Nepal)',
    appIcon: APP_ICONS.mulyankan,
    status: 'LIVE STORE',
    shortDesc: 'Official land and property valuation engine in Nepal.',
    fullDesc: 'Mulyankan is a specialized property valuation application widely used in Nepal. It calculates accurate land prices based on geographical data, government valuation rates, and road access metrics.',
    stack: ['Flutter', 'Dart', 'Nepal Maps API', 'Provider', 'Local Caching'],
    playstore: 'https://play.google.com/store/apps/details?id=com.app.mulyankan&hl=en',
    appstore: 'https://apps.apple.com/us/app/mulyankan/id6446269812',
    github: '',
    featured: true
  },
  {
    id: 'civic',
    title: 'Durga Bhagawati Gaupalika',
    category: 'Civic Tech & Government',
    appIcon: APP_ICONS.civic,
    status: 'LIVE STORE',
    shortDesc: 'Official municipal ward civic assistance & public awareness app.',
    fullDesc: 'Durga Bhagawati Gaupalika App is a civic tech solution connecting citizens with municipal administration in Nepal. Features emergency alerts, ward news, tax guidelines, digital public service requests, and civic feedback.',
    stack: ['Flutter', 'Dart', 'Push Notifications', 'Firebase', 'REST API'],
    playstore: 'https://play.google.com/store/apps/details?id=com.durgagaupalika.np&hl=en',
    appstore: '',
    github: '',
    featured: true
  }
];

export default function SectorProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="hud-projects-wrapper apple-reveal"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '60px 20px 40px 20px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="editorial-card" 
        style={{ padding: '36px', width: '100%' }}
      >
        {/* Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            FEATURED ENGINEERING WORK // 5 PRODUCTION APPS
          </span>
          <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: '9999px', fontWeight: 600 }}>
            LIVE DEPLOYED STORE APPS
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '2.6rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }} className="headline-gradient">
              SELECTED PROJECTS
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Explore production mobile applications deployed on Google Play Store & Apple App Store.
            </p>
          </div>

          {/* Carousel Arrow Controls */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scrollCarousel('left')}
              className="btn-editorial"
              style={{ width: '42px', height: '42px', padding: 0, justifyContent: 'center', borderRadius: '50%', fontSize: '18px' }}
              title="Previous App"
            >
              ←
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="btn-editorial"
              style={{ width: '42px', height: '42px', padding: 0, justifyContent: 'center', borderRadius: '50%', fontSize: '18px' }}
              title="Next App"
            >
              →
            </button>
          </div>
        </div>

        {/* APPLE LARGE KEYNOTE CAROUSEL SLIDER */}
        <div className="apple-carousel-container" ref={carouselRef}>
          {projects.map((proj) => (
            <div 
              key={proj.id}
              className="editorial-card apple-carousel-card"
              onClick={() => setSelectedProject(proj)}
              style={{
                padding: '28px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '320px'
              }}
            >
              <div>
                {/* Top Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div 
                      style={{ 
                        width: '56px', 
                        height: '56px', 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        background: 'var(--bg-base)', 
                        border: '1px solid var(--border-subtle)', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: 'var(--shadow-card)'
                      }}
                    >
                      <img 
                        src={proj.appIcon} 
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>

                    <div>
                      <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-header)', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                        {proj.title}
                      </h3>
                      <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                        [{proj.category.toUpperCase()}]
                      </span>
                    </div>
                  </div>

                  <span className="hud-monospace" style={{ fontSize: '9px', padding: '4px 10px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '9999px', fontWeight: 600 }}>
                    {proj.status}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '18px' }}>
                  {proj.fullDesc}
                </p>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {proj.stack.map((s, i) => (
                    <span key={i} className="hud-monospace" style={{ fontSize: '9px', padding: '4px 10px', background: 'rgba(0, 0, 0, 0.06)', color: 'var(--text-primary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Direct Store Links */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  {proj.playstore && (
                    <a 
                      href={proj.playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-editorial btn-primary"
                      style={{ fontSize: '11px', padding: '8px 16px' }}
                    >
                      Google Play Store →
                    </a>
                  )}
                  {proj.appstore && (
                    <a 
                      href={proj.appstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-editorial"
                      style={{ fontSize: '11px', padding: '8px 16px' }}
                    >
                      Apple App Store →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DETAIL MODAL */}
      {selectedProject && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="editorial-card"
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '34px',
              background: 'var(--bg-base)',
              borderRadius: '24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={selectedProject.appIcon} 
                  alt={selectedProject.title} 
                  style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#000', border: '1px solid var(--border-subtle)' }}
                />
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
                  <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--accent-primary)' }}>{selectedProject.category}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedProject(null)}
                style={{ background: 'rgba(0,0,0,0.08)', border: 'none', color: 'var(--text-primary)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '15px', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {selectedProject.fullDesc}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>TECH ARCHITECTURE</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedProject.stack.map((s, i) => (
                  <span key={i} className="hud-monospace" style={{ fontSize: '10px', padding: '4px 10px', background: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-primary)', borderRadius: '9999px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {selectedProject.playstore && (
                <a href={selectedProject.playstore} target="_blank" rel="noopener noreferrer" className="btn-editorial btn-primary">
                  Google Play Store
                </a>
              )}
              {selectedProject.appstore && (
                <a href={selectedProject.appstore} target="_blank" rel="noopener noreferrer" className="btn-editorial">
                  Apple App Store
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}