import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const projects = [
  {
    id: 'goatus',
    title: 'GOATUS App',
    category: 'Mobile App (Japan)',
    isShowcase: true,
    appIcon: '/icons/goatus.png',
    stack: ['Flutter', 'Dart', 'Firebase', 'In-App Subscriptions', 'BLoC'],
    shortDesc: 'Japanese app engineered for Athletes where fans can subscribe, gift, view activities, and engage directly.',
    longDesc: 'GOATUS is a specialized Japanese mobile platform built for athletes and fans. Fans can subscribe to their favorite athletes, send gifts, track real-time athletic activities, and access exclusive content. Built with Flutter, clean BLoC architecture, and Firebase for scalable real-time synchronization.',
    status: 'STORE RELEASE',
    playstore: 'https://play.google.com/store/apps/details?id=jp.goatus&hl=en',
    appstore: 'https://apps.apple.com/jp/app/goatus-%E3%82%B4%E3%83%BC%E3%82%BF%E3%82%B9/id6499320524?l=en-US',
    metrics: [
      'Available on Japan Play Store & App Store',
      'In-app subscription & gifting payment engine',
      'Real-time activity feed & notifications',
      'High-performance cross-platform Flutter architecture'
    ]
  },
  {
    id: 'pecon',
    title: 'Pecon App',
    category: 'Wholesale E-Commerce',
    isShowcase: true,
    appIcon: '/icons/pecon.png',
    stack: ['Flutter', 'QR Scanning', 'Reward Engine', 'REST API', 'Electronics'],
    shortDesc: 'E-commerce app for wholesale buyers of electronic products featuring QR code scanning & rewards system.',
    longDesc: 'Pecon App is a B2B wholesale e-commerce mobile application designed for electronic product procurement. Features integrated QR code scanning for bulk inventory orders, automated catalog sync, and buyer reward point tracking.',
    status: 'STORE RELEASE',
    playstore: 'https://play.google.com/store/search?q=Pecon&c=apps&hl=en',
    metrics: [
      'Available on Google Play Store',
      'Wholesale buyer QR scanner procurement flow',
      'Automated reward points & loyalty program',
      'Electronic goods catalog & bulk order processing'
    ]
  },
  {
    id: 'trandz-vistaar',
    title: 'Trandz Vistaar',
    category: 'Appliances E-Commerce',
    isShowcase: true,
    appIcon: '/icons/trandz.png',
    stack: ['Flutter', 'QR Code Scanner', 'Loyalty Rewards', 'E-Commerce', 'Dart'],
    shortDesc: 'E-commerce platform for purchasing house appliances with QR scanning and customer reward programs.',
    longDesc: 'Trandz Vistaar is a consumer e-commerce mobile application for purchasing home appliances. Built with Flutter, it integrates instant QR scanning for product authenticity verification, digital warranty registration, and customer reward points redemption.',
    status: 'STORE RELEASE',
    playstore: 'https://play.google.com/store/search?q=trandz%20vistaar&c=apps&hl=en',
    metrics: [
      'Available on Google Play Store',
      'Home appliance catalog & warranty scan engine',
      'Customer reward system & points redemption',
      'Seamless Flutter mobile checkout experience'
    ]
  },
  {
    id: 'mulyankan',
    title: 'MULYANKAN App',
    category: 'Land Valuation Nepal',
    isShowcase: true,
    appIcon: '/icons/mulyankan.png',
    stack: ['Flutter', 'Land Valuation Algorithm', 'Nepal Geo-Data', 'iOS & Android'],
    shortDesc: 'Specialized mobile application for official land valuation and property real estate assessment in Nepal.',
    longDesc: 'MULYANKAN is a land valuation mobile app engineered for real estate assessment across Nepal. It allows users, evaluators, and financial institutions to compute precise land values based on government rates, road access, location coordinates, and land area parameters.',
    status: 'STORE RELEASE',
    playstore: 'https://play.google.com/store/apps/details?id=com.app.mulyankan&hl=en',
    appstore: 'https://apps.apple.com/us/app/mulyankan/id6446269812',
    metrics: [
      'Available on Play Store & Apple App Store',
      'Official land valuation calculation algorithms',
      'Property geo-data & government rate matrix',
      'Used by real estate evaluators in Nepal'
    ]
  },
  {
    id: 'durgabhagawati',
    title: 'Durga Bhagawati Gaupalika',
    category: 'Civic Utility Mobile',
    isShowcase: true,
    appIcon: '/icons/durga_bhagawati.png',
    stack: ['Flutter', 'Android SDK', 'Firebase', 'Civic Tech', 'Nepal Ward'],
    shortDesc: 'Ward app in Nepal delivering real-time municipal notices, assistance, and situation updates to citizens.',
    longDesc: 'Created for the Durga Bhagawati Rural Municipality ward in Nepal, this mobile application provides local residents with instant news updates, official ward notices, situational assistance, and direct municipal service channels.',
    status: 'STORE RELEASE',
    playstore: 'https://play.google.com/store/apps/details?id=com.durgagaupalika.np',
    github: 'https://github.com/Anikshakya/Durga-Bhagawati-Gaupalika',
    metrics: [
      'Available on Google Play Store in Nepal',
      'Real-time municipal notices & news feed',
      'Civic assistance request submission port',
      'Bilingual support UI for local citizens'
    ]
  },
  {
    id: 'portfolio-app',
    title: 'Portfolio Web App',
    category: 'Interactive Web',
    isShowcase: true,
    appIcon: '/icons/portfolio.png',
    stack: ['React', 'CSS3', 'WebGL Shaders', 'Web Audio API', 'JavaScript'],
    shortDesc: 'Interactive sci-fi starship HUD portfolio showcasing mobile & web engineering projects and expertise.',
    longDesc: 'This personal portfolio web application built in React features a custom space canvas background, interactive black hole warp transitions, reactive audio synthesis, and HUD metrics.',
    status: 'WEB APPLICATION',
    github: 'https://github.com/Anikshakya/Portfolio',
    metrics: [
      'Custom WebGL/Canvas particle starfield physics',
      'Immersive black hole warp sector transition',
      'Web Audio synthesizer sound effects',
      'Responsive sci-fi HUD cyberpunk design system'
    ]
  },
  {
    id: 'open-street',
    title: 'OpenStreet App',
    category: 'Pet Tracking Mobile',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'OS',
    stack: ['Flutter', 'OpenStreetMap', 'Geolocation', 'Polylines', 'Dart'],
    shortDesc: 'Pet walking tracker app that monitors walks using OpenStreetMap with real-time markers and route polylines.',
    longDesc: 'OpenStreet App is a dedicated pet walking application that tracks walk routes in real time. Utilizing OpenStreetMap integration, it plots live GPS markers and dynamic route polylines as soon as the user starts their walk session.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/Open-Street',
    metrics: [
      'OpenStreetMap mapping vector engine',
      'Real-time GPS coordinate polyline tracking',
      'Live walk metrics & location marker updates',
      'Optimized battery & location polling'
    ]
  },
  {
    id: 'showbox',
    title: 'ShowBox App',
    category: 'Streaming Mobile',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'SB',
    stack: ['Flutter', 'REST APIs', 'In-App Webview', 'Media Player', 'Dart'],
    shortDesc: 'Movie streaming mobile application built in Flutter with REST API integrations and in-app web player.',
    longDesc: 'ShowBox App is a cross-platform movie browsing and media streaming app. Built using Flutter, it connects to movie REST APIs to fetch catalogs, trending content, metadata, and embed web streaming video players.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/ShowBox',
    metrics: [
      'REST API catalog integration & query filtering',
      'In-app WebView player integration',
      'Smooth thumbnail lazy-loading & caching',
      'Responsive mobile UI layout'
    ]
  },
  {
    id: 'chat-hub',
    title: 'Chat App (ChatHub)',
    category: 'Messaging & AI',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'CH',
    stack: ['Flutter', 'Firebase', 'AI Chatbot', 'Firestore', 'Dart'],
    shortDesc: 'Real-time messaging application powered by Flutter, Cloud Firebase, and an intelligent AI chatbot assistant.',
    longDesc: 'ChatHub is a full-featured communication application offering real-time user-to-user messaging alongside an integrated AI chatbot. Features Firebase Cloud Firestore for instant message delivery and state sync.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/ChatHub',
    metrics: [
      'Sub-second message synchronization via Firestore',
      'Interactive AI chatbot conversational integration',
      'User authentication & session persistence',
      'Clean chat bubble & media layout UI'
    ]
  },
  {
    id: 'melo-rhythm',
    title: 'Melo App (Rhythm)',
    category: 'Music & Audio',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'ML',
    stack: ['Flutter', 'Audio Service', 'Dart', 'Android & iOS', 'State Management'],
    shortDesc: 'Feature-packed music streaming and audio playback app built using Flutter for both Android and iOS devices.',
    longDesc: 'Melo (Rhythm) is a cross-platform audio player designed for continuous music playback, custom playlist generation, and smooth UI animations across Android and iOS operating systems.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/Rhythm',
    metrics: [
      'Background audio play & lockscreen media controls',
      'Cross-platform Android & iOS optimization',
      'Custom audio progress seeker & waveform visualizer',
      'High performance state management'
    ]
  },
  {
    id: 'stripe-payment',
    title: 'Stripe Payment App',
    category: 'Fintech & Payments',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'ST',
    stack: ['Flutter', 'Stripe API', 'Payment Gateways', 'Dart', 'Security'],
    shortDesc: 'Secure checkout and financial transaction payment gateway integration powered by Stripe SDK in Flutter.',
    longDesc: 'Stripe Payment App demonstrates seamless tokenized card checkout and digital payment processing in Flutter applications utilizing Stripe payment gateways and webhooks.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/Stripe',
    metrics: [
      'PCI-compliant Stripe payment sheet modal integration',
      'Tokenized transaction payload security',
      'Multi-currency processing capability',
      'Clean transaction status feedback'
    ]
  },
  {
    id: 'suitcase',
    title: 'SuitCase App',
    category: 'Native Android Travel',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'SC',
    stack: ['Kotlin', 'Android SDK', 'Jetpack UI', 'Room DB', 'Material Design'],
    shortDesc: 'Native Android holiday planner and itinerary management application built natively using Kotlin.',
    longDesc: 'SuitCase App is a travel and vacation planning client developed natively with Kotlin for Android. Allows travelers to organize holiday itineraries, packing checklists, and local schedule points.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/SuitCase',
    metrics: [
      'Native Kotlin performance & Jetpack architecture',
      'Local room database itinerary offline cache',
      'Material Design 3 user interface components',
      'Trip timeline scheduler & packing checks'
    ]
  },
  {
    id: 'mern-app',
    title: 'MERN User Management',
    category: 'Full-Stack Web',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'MN',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    shortDesc: 'User management full-stack web application constructed on the MERN stack.',
    longDesc: 'A web portal delivering complete CRUD operations for user identity, profile settings, role assignments, and security authentication using MongoDB, Express.js, React, and Node.js.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/Mern-App',
    metrics: [
      'Full CRUD RESTful API routes with Express & Node',
      'MongoDB document schema & query models',
      'Responsive React single-page dashboard',
      'Token-based user session handling'
    ]
  },
  {
    id: 'olympics-management',
    title: 'Olympics Management',
    category: 'Web Portal & Dashboards',
    isShowcase: false,
    appIcon: null,
    iconLetter: 'OL',
    stack: ['PHP', 'MySQL', 'Web Dashboards', 'HTML5 Video', 'CSS3'],
    shortDesc: 'PHP web app for managing Olympics videos with admin analytical dashboards and streaming control.',
    longDesc: 'FunOlympics Management is a comprehensive PHP web application engineered for managing video streams, highlights, user access permissions, and analytics dashboards for sports events.',
    status: 'GITHUB REPO',
    github: 'https://github.com/Anikshakya/FunOlympics',
    metrics: [
      'Admin dashboard control panel for video uploads',
      'Relational MySQL schema for sports & events',
      'HTML5 video streaming integration',
      'User roles & content moderation options'
    ]
  }
];

// Helper to render App Icon image or Glass Badge Placeholder
function RenderAppIcon({ proj, size = 56 }) {
  if (proj.appIcon) {
    return (
      <div 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          borderRadius: `${Math.round(size * 0.28)}px`, 
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
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    );
  }

  // Placeholder glass badge if no image exists
  return (
    <div 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        borderRadius: `${Math.round(size * 0.28)}px`, 
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))', 
        border: '1px solid var(--border-hover)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontWeight: 'bold',
        color: 'var(--accent-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: `${Math.round(size * 0.35)}px`
      }}
    >
      {proj.iconLetter || proj.title.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function SectorProjects() {
  const [activeTab, setActiveTab] = useState('showcase');
  const [selectedProject, setSelectedProject] = useState(null);
  const carouselRef = useRef(null);

  const showcaseProjects = projects.filter(p => p.isShowcase);

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
        padding: '20px 0',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div className="editorial-card" style={{ padding: '36px', width: '100%' }}>
        
        {/* Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            FEATURED ENGINEERING WORK // {projects.length} PROJECTS
          </span>
          <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.12)', padding: '4px 12px', borderRadius: '9999px', fontWeight: 600 }}>
            SHOWCASE: {showcaseProjects.length} APPS | TOTAL: {projects.length} PROJECTS
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '2.6rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }} className="headline-gradient">
              SELECTED PROJECTS
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Explore production mobile applications, web platforms, and open-source GitHub repositories.
            </p>
          </div>

          {/* Controls: Segmented Tabs & Carousel Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {activeTab === 'showcase' && (
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
            )}

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
                Work Showcase ({showcaseProjects.length})
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
        </div>

        {/* APPLE LARGE KEYNOTE CAROUSEL SLIDER VIEW */}
        {activeTab === 'showcase' && (
          <div>
            <div className="apple-carousel-container" ref={carouselRef}>
              {showcaseProjects.map((proj) => (
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
                    minHeight: '340px'
                  }}
                >
                  <div>
                    {/* Top Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <RenderAppIcon proj={proj} size={56} />

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
                      {proj.longDesc}
                    </p>
                  </div>

                  <div>
                    {/* Key Metrics Summary */}
                    <div style={{ marginBottom: '16px' }}>
                      {proj.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>✓</span> {m}
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {proj.stack.map((s, i) => (
                        <span key={i} className="hud-monospace" style={{ fontSize: '9px', padding: '4px 10px', background: 'rgba(0, 0, 0, 0.06)', color: 'var(--text-primary)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Direct Action Links */}
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
                      {proj.github && (
                        <a 
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-editorial"
                          style={{ fontSize: '11px', padding: '8px 16px' }}
                        >
                          GitHub Repo →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALL PROJECTS GRID VIEW */}
        {activeTab === 'all' && (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '16px',
              marginBottom: '10px' 
            }}
          >
            {projects.map((proj) => (
              <div 
                key={proj.id}
                className="editorial-card"
                onClick={() => setSelectedProject(proj)}
                style={{
                  padding: '22px',
                  cursor: 'pointer',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <RenderAppIcon proj={proj} size={36} />
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                        {proj.title}
                      </h3>
                    </div>
                    <span className="hud-monospace" style={{ fontSize: '8.5px', padding: '3px 8px', background: 'rgba(0, 0, 0, 0.06)', color: 'var(--text-secondary)', borderRadius: '9999px' }}>
                      {proj.status}
                    </span>
                  </div>

                  <span className="hud-monospace" style={{ fontSize: '9.5px', color: 'var(--accent-primary)', display: 'block', marginBottom: '8px' }}>
                    [{proj.category}]
                  </span>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '12px' }}>
                    {proj.shortDesc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {proj.stack.map((s, i) => (
                      <span key={i} className="hud-monospace" style={{ fontSize: '8.5px', padding: '2px 8px', background: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-muted)', borderRadius: '4px' }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', fontSize: '10px', fontWeight: 600 }}>
                    {proj.playstore && <span style={{ color: 'var(--accent-emerald)' }}>PLAY STORE</span>}
                    {proj.appstore && <span style={{ color: 'var(--accent-primary)' }}>APP STORE</span>}
                    {proj.github && <span style={{ color: 'var(--accent-amber)' }}>GITHUB REPO</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* REACT PORTAL DETAIL MODAL OVERLAY (PERFECT VIEWPORT CENTERING) */}
      {selectedProject && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="editorial-card"
            style={{
              width: '100%',
              maxWidth: '660px',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '32px',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(40px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '28px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <RenderAppIcon proj={selectedProject} size={56} />
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
              {selectedProject.longDesc}
            </p>

            {/* Metrics List */}
            {selectedProject.metrics && (
              <div style={{ marginBottom: '20px', background: 'rgba(0,0,0,0.04)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>HIGHLIGHTS & KEY METRICS</h4>
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>✓</span> {m}
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>TECH ARCHITECTURE</h4>
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
                  Google Play Store →
                </a>
              )}
              {selectedProject.appstore && (
                <a href={selectedProject.appstore} target="_blank" rel="noopener noreferrer" className="btn-editorial">
                  Apple App Store →
                </a>
              )}
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-editorial">
                  GitHub Repository →
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}