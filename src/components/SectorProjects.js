import React, { useState } from 'react';

const APP_ICONS = {
  goatus: "/icons/goatus.png",
  pecon: "/icons/pecon.png",
  trandz: "/icons/trandz.png",
  mulyankan: "/icons/mulyankan.png",
  civic: "/icons/durga_bhagawati.png",
  gocart: "/icons/gocart.png"
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
    appstore: 'https://apps.apple.com/jp/app/goatus-%E3%82%B4%E3%83%BC%E3%82%B',
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
    playstore: 'https://play.google.com/store/search?q=durga%20bhagawati%20gaupalika&c=apps&hl=en',
    appstore: '',
    github: '',
    featured: true
  },
  {
    id: 'gocart',
    title: 'GoCart App',
    category: 'E-Commerce Mobile Engine',
    appIcon: APP_ICONS.gocart,
    status: 'LIVE STORE',
    shortDesc: 'Fast grocery & retail shopping mobile client with real-time cart sync.',
    fullDesc: 'GoCart is an e-commerce mobile application built for fast retail shopping. It features real-time cart synchronization, automated coupons, order tracking, and payment gateway integrations.',
    stack: ['Flutter', 'Dart', 'Provider', 'REST API', 'Payment Gateways'],
    playstore: 'https://play.google.com/store/search?q=gocart&c=apps&hl=en',
    appstore: '',
    github: '',
    featured: true
  },
  {
    id: 'food_delivery',
    title: 'Multi-Vendor Food Delivery',
    category: 'On-Demand Delivery Architecture',
    appIcon: APP_ICONS.goatus,
    status: 'COMPLETED',
    shortDesc: 'Complete food ordering client, delivery partner app, and admin dashboard.',
    fullDesc: 'End-to-end multi-vendor food delivery ecosystem featuring live GPS driver tracking, polyline navigation, restaurant dashboard management, dynamic cart pricing, and instant push notifications.',
    stack: ['Flutter', 'Google Maps API', 'Polylines', 'Socket.io', 'GetX'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  },
  {
    id: 'ride_sharing',
    title: 'Ride-Sharing Mobile Platform',
    category: 'Urban Mobility',
    appIcon: APP_ICONS.gocart,
    status: 'COMPLETED',
    shortDesc: 'Real-time ride booking with interactive map routes and fare calculators.',
    fullDesc: 'Urban ride-hailing application with real-time driver matching, custom map markers, fare estimation algorithms, cash/wallet payments, and in-app emergency SOS triggers.',
    stack: ['Flutter', 'Google Maps API', 'Firebase Realtime DB', 'GetX'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  },
  {
    id: 'hotel_booking',
    title: 'Hotel & Resort Booking Engine',
    category: 'Travel & Hospitality',
    appIcon: APP_ICONS.trandz,
    status: 'COMPLETED',
    shortDesc: 'Hotel room discovery, dynamic pricing filters, and instant reservations.',
    fullDesc: 'Travel booking mobile application featuring interactive room photo galleries, date pickers, amenity filtering, guest reviews, and automated PDF booking receipt generation.',
    stack: ['Flutter', 'Provider', 'REST API', 'Stripe API', 'SQLite'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  },
  {
    id: 'fitness_tracker',
    title: 'Fitness & Workout Coach',
    category: 'Health & Wellness',
    appIcon: APP_ICONS.pecon,
    status: 'COMPLETED',
    shortDesc: 'Workout routine planner, calorie counters, and step counter analytics.',
    fullDesc: 'Health and workout tracking application using native device sensors for pedometer step counting, custom workout routines, calorie burn charts, and progress streak badges.',
    stack: ['Flutter', 'Native Sensors', 'Hive Local DB', 'FL Chart'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  },
  {
    id: 'crypto_wallet',
    title: 'Crypto Portfolio Tracker',
    category: 'Fintech & Web3',
    appIcon: APP_ICONS.mulyankan,
    status: 'COMPLETED',
    shortDesc: 'Live crypto ticker, portfolio balance analytics, and price alerts.',
    fullDesc: 'Fintech application tracking real-time cryptocurrency exchange prices, historical candlestick charts, watchlist price thresholds, and portfolio profit/loss analytics.',
    stack: ['Flutter', 'CoinGecko REST API', 'WebSockets', 'GetX'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  },
  {
    id: 'chat_app',
    title: 'Real-Time Messaging Network',
    category: 'Social & Communication',
    appIcon: APP_ICONS.civic,
    status: 'COMPLETED',
    shortDesc: 'Encrypted 1-on-1 chat, media attachments, and voice note sharing.',
    fullDesc: 'Modern messaging application supporting real-time chat sync, message read receipts, image/video compression, voice note recording, and push notifications.',
    stack: ['Flutter', 'Firebase Cloud Messaging', 'Firestore', 'GetX'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  },
  {
    id: 'task_manager',
    title: 'Kanban Productivity Suite',
    category: 'Productivity & Tools',
    appIcon: APP_ICONS.pecon,
    status: 'COMPLETED',
    shortDesc: 'Drag-and-drop task boards, deadline reminders, and team tags.',
    fullDesc: 'Kanban-style productivity app with offline-first local SQLite sync, drag-and-drop cards, subtask checklists, and automated notification reminders.',
    stack: ['Flutter', 'SQLite', 'Provider', 'Local Notifications'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  },
  {
    id: 'mern_ecom',
    title: 'Full-Stack MERN E-Com Portal',
    category: 'Full-Stack Web (Ex-MERN)',
    appIcon: APP_ICONS.gocart,
    status: 'COMPLETED',
    shortDesc: 'React web frontend, Express REST API, and MongoDB backend admin suite.',
    fullDesc: 'Full-stack web e-commerce platform built with MongoDB, Express, React, and Node.js. Features user authentication (JWT), product inventory management, admin dashboard analytics, and checkout integration.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind'],
    playstore: '',
    appstore: '',
    github: 'https://github.com/AnikShakya',
    featured: false
  }
];

export default function SectorProjects() {
  const [activeTab, setActiveTab] = useState('showcase');
  const [selectedProject, setSelectedProject] = useState(null);

  const showcaseProjects = projects.filter(p => p.featured);

  return (
    <div 
      className="hud-projects-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: '80px 16px 10px 16px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="editorial-card hud-showcase-scroll-container" 
        style={{ padding: '24px 28px', width: '100%', maxWidth: '1240px', margin: '0 auto', maxHeight: 'calc(100vh - 65px)', overflowY: 'auto' }}
      >
        {/* Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            SELECTED WORK & PROJECTS
          </span>
          <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            SHOWCASE: <strong style={{ color: 'var(--accent-primary)' }}>{showcaseProjects.length} APPS</strong> | TOTAL: {projects.length} PROJECTS
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }} className="headline-gradient">
            PROJECTS
          </h2>

          {/* Segmented Tab Controls */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.08)', padding: '4px', borderRadius: '9999px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setActiveTab('showcase')}
              style={{
                background: activeTab === 'showcase' ? 'var(--text-primary)' : 'transparent',
                color: activeTab === 'showcase' ? 'var(--bg-base)' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              Showcase Apps ({showcaseProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                background: activeTab === 'all' ? 'var(--text-primary)' : 'transparent',
                color: activeTab === 'all' ? 'var(--bg-base)' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              All Projects ({projects.length})
            </button>
          </div>
        </div>

        {/* SHOWCASE VIEW */}
        {activeTab === 'showcase' && (
          <div 
            className="hud-showcase-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '14px', 
              marginBottom: '6px' 
            }}
          >
            {showcaseProjects.map((proj) => (
              <div 
                key={proj.id}
                className="editorial-card"
                onClick={() => setSelectedProject(proj)}
                style={{
                  padding: '16px 18px',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div 
                        style={{ 
                          width: '42px', 
                          height: '42px', 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          background: 'var(--bg-base)', 
                          border: '1px solid var(--border-subtle)', 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <img 
                          src={proj.appIcon} 
                          alt={proj.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>

                      <div>
                        <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-header)', fontWeight: 700, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>
                          {proj.title}
                        </h3>
                        <span className="hud-monospace" style={{ fontSize: '9.5px', color: 'var(--accent-primary)' }}>
                          [{proj.category.toUpperCase()}]
                        </span>
                      </div>
                    </div>

                    <span className="hud-monospace" style={{ fontSize: '8.5px', padding: '3px 8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '9999px', fontWeight: 600 }}>
                      {proj.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {proj.shortDesc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                    {proj.stack.slice(0, 3).map((s, i) => (
                      <span key={i} className="hud-monospace" style={{ fontSize: '8.5px', padding: '3px 8px', background: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-secondary)', borderRadius: '6px' }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                    {proj.playstore && (
                      <a 
                        href={proj.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-editorial"
                        style={{ fontSize: '9px', padding: '4px 10px' }}
                      >
                        PLAY STORE
                      </a>
                    )}
                    {proj.appstore && (
                      <a 
                        href={proj.appstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-editorial"
                        style={{ fontSize: '9px', padding: '4px 10px' }}
                      >
                        APP STORE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALL PROJECTS VIEW */}
        {activeTab === 'all' && (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '14px',
              marginBottom: '10px' 
            }}
          >
            {projects.map((proj) => (
              <div 
                key={proj.id}
                className="editorial-card"
                onClick={() => setSelectedProject(proj)}
                style={{
                  padding: '16px 18px',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      {proj.title}
                    </h3>
                    <span className="hud-monospace" style={{ fontSize: '8.5px', padding: '2px 8px', background: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-secondary)', borderRadius: '9999px' }}>
                      {proj.status}
                    </span>
                  </div>

                  <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--accent-primary)', display: 'block', marginBottom: '8px' }}>
                    [{proj.category}]
                  </span>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '10px' }}>
                    {proj.shortDesc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {proj.stack.slice(0, 3).map((s, i) => (
                      <span key={i} className="hud-monospace" style={{ fontSize: '8.5px', padding: '2px 6px', background: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-muted)', borderRadius: '4px' }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', fontSize: '9px', fontWeight: 600 }}>
                    {proj.playstore && <span style={{ color: 'var(--accent-emerald)' }}>PLAY STORE</span>}
                    {proj.appstore && <span style={{ color: 'var(--accent-primary)' }}>APP STORE</span>}
                    {proj.github && <span style={{ color: 'var(--accent-amber)' }}>GITHUB</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
              maxWidth: '580px',
              padding: '30px',
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
                  style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#000', border: '1px solid var(--border-subtle)' }}
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

            <p style={{ fontSize: '14.5px', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {selectedProject.fullDesc}
            </p>

            <div style={{ marginBottom: '20px' }}>
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
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-editorial">
                  GitHub Repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .hud-showcase-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 14px !important;
          }
        }
        @media (min-width: 650px) and (max-width: 899px) {
          .hud-showcase-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }
        @media (max-width: 649px) {
          .hud-projects-wrapper {
            padding-top: 80px !important;
          }
          .hud-showcase-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}