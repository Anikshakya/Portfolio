import React, { useState, useRef, useEffect } from 'react';

export default function SectorProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('showcase'); // 'showcase' or 'all'
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    {
      id: 'goatus',
      title: 'GOATUS App',
      category: 'Mobile App (Japan)',
      isShowcase: true,
      appIcon: '/icons/goatus.png',
      stack: ['Flutter', 'Dart', 'Firebase', 'In-App Subscriptions'],
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
      id: 'morinfo',
      title: 'Morinfo App',
      category: 'Civic Utility Mobile',
      isShowcase: true,
      appIcon: '/icons/morinfo.png',
      stack: [
        'Flutter',
        'Dart',
        'Firebase',
        'Push Notifications',
        'Maps',
        'Multilingual Support',
        'NFC / My Number Card',
      ],
      shortDesc:
          'Official Moriya City mobile application providing residents with disaster alerts, city notifications, electronic applications, garbage collection information, and daily-life services.',
      longDesc:
          'Morinfo is the official Moriya City mobile application in Japan. The app brings essential municipal services and daily-life information together in one platform, including disaster and evacuation alerts, city announcements, event information, garbage collection schedules, public facility search, electronic applications, multilingual support, and My Number Card integration using NFC.',
      status: 'STORE RELEASE',
      playstore:
          'https://play.google.com/store/apps/details?id=jp.portal.moriya&hl=en',
      appstore:
          'https://apps.apple.com/jp/app/morinfo/id6752234095?l=en-US',
      metrics: [
        'Available on Japan Google Play Store & Apple App Store',
        'Official Moriya City civic service application',
        'Disaster alerts & evacuation information',
        'Electronic applications and municipal notifications',
        'Garbage collection calendar & reminder notifications',
        'Public facility search with map integration',
        'Multilingual support & My Number Card NFC integration',
      ],
    },
    {
      id: 'sendai-portal',
      title: 'SENDAIポータル',
      category: 'Civic Utility Mobile',
      isShowcase: true,
      appIcon: '/icons/sendai-portal.png',
      stack: [
        'Flutter',
        'Dart',
        'Firebase',
        'Push Notifications',
        'Weather API',
        'Disaster Information',
        'Maps',
      ],
      shortDesc:
          'Official Sendai City portal application providing local announcements, weather, disaster information, garbage schedules, events, and online municipal services.',
      longDesc:
          'SENDAIポータル is the official regional portal application for Sendai City, Miyagi Prefecture, Japan. The application provides residents with city announcements, event information, weather and temperature updates, earthquake and tsunami information, heatstroke and heavy-rain alerts, garbage collection information, personal calendars, digital mailbox services, and online municipal procedures.',
      status: 'STORE RELEASE',
      playstore:
          'https://play.google.com/store/apps/details?id=com.sendai_portal&hl=en',
      appstore:
          'https://apps.apple.com/jp/app/sendai%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%AB/id6478195671',
      metrics: [
        'Available on Japan Google Play Store & Apple App Store',
        'Official Sendai City regional portal application',
        'City announcements & event notifications',
        'Weather, earthquake & tsunami information',
        'Disaster and heatstroke warning notifications',
        'Garbage collection calendar & local information',
        'Digital mailbox with My Number Card integration',
        'Online municipal procedures',
      ],
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
      appIcon: '/icons/durgabhagawati.png',
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

  const showcaseProjects = projects.filter(p => p.isShowcase);

  // Monitor scroll positioning to toggle nav buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [activeTab]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="hud-projects-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: '60px 16px 10px 16px',
        zIndex: 5,
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Expanded panel container width */}
      <div
        className="hud-panel hud-projects-container hud-showcase-scroll-container animate-fade-in"
        style={{ padding: '16px 20px', width: '100%', maxWidth: '1240px', margin: '0 auto', maxHeight: 'calc(100vh - 75px)', overflowY: 'auto' }}
      >

        {/* Header telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '10.5px', color: 'var(--color-cyan)' }} className="hud-monospace">
            CARGO_BAY_INVENTORY // SEC_01 // PROJECTS
          </span>
          <span style={{ fontSize: '9.5px', opacity: 0.8 }} className="hud-monospace">
            WORK SHOWCASE: <strong style={{ color: 'var(--color-cyan)' }}>{showcaseProjects.length} APPS</strong> | TOTAL: {projects.length} PROJECTS
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-header)', fontWeight: 800, margin: 0, letterSpacing: '1px' }}>
            PROJECTS & <span className="glow-text-cyan">WORK SHOWCASE</span>
          </h2>

          {/* Navigation View Tabs: Work Showcase vs All Projects */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(2, 2, 12, 0.7)', padding: '3px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.25)' }}>
            <button
              onClick={() => setActiveTab('showcase')}
              className="hud-monospace"
              style={{
                background: activeTab === 'showcase' ? 'var(--color-cyan)' : 'transparent',
                color: activeTab === 'showcase' ? '#020208' : 'var(--color-cyan)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'showcase' ? '0 0 10px rgba(0, 240, 255, 0.4)' : 'none'
              }}
            >
              Work Showcase
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className="hud-monospace"
              style={{
                background: activeTab === 'all' ? 'var(--color-cyan)' : 'transparent',
                color: activeTab === 'all' ? '#020208' : 'var(--color-cyan)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'all' ? '0 0 10px rgba(0, 240, 255, 0.4)' : 'none'
              }}
            >
              All Projects
            </button>
          </div>
        </div>

        {/* 1. WORK SHOWCASE VIEW */}
        {activeTab === 'showcase' && (
          <div>
            <div
              className="hud-showcase-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
                marginBottom: '6px'
              }}
            >
              {showcaseProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="hud-panel hud-showcase-card animate-fade-in"
                  onClick={() => setSelectedProject(proj)}
                  style={{
                    padding: '12px 14px',
                    cursor: 'pointer',
                    background: 'rgba(6, 14, 34, 0.85)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 16px rgba(0, 240, 255, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.012)';
                    e.currentTarget.style.borderColor = 'var(--color-cyan)';
                    e.currentTarget.style.background = 'rgba(8, 24, 52, 0.95)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 240, 255, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)';
                    e.currentTarget.style.background = 'rgba(6, 14, 34, 0.85)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 240, 255, 0.05)';
                  }}
                >
                  <div>
                    {/* Top Row: App Logo & Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* High-res Local App Icon Container */}
                        <div
                          className="showcase-icon-box"
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            background: '#0a0a1a',
                            border: '1.5px solid var(--color-cyan)',
                            boxShadow: '0 0 12px rgba(0, 240, 255, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <img
                            src={proj.appIcon}
                            alt={proj.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>

                        <div>
                          <h3 className="showcase-title-text" style={{ fontSize: '15px', fontFamily: 'var(--font-header)', fontWeight: 'bold', margin: '0 0 2px 0', color: '#fff', transition: 'all 0.3s ease' }}>
                            {proj.title}
                          </h3>
                          <span className="hud-monospace" style={{ fontSize: '9.5px', color: 'var(--color-cyan)' }}>
                            [{proj.category.toUpperCase()}]
                          </span>
                        </div>
                      </div>

                      <span className="hud-monospace" style={{ fontSize: '8.5px', padding: '3px 6px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-cyan)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '3px', fontWeight: 'bold' }}>
                        {proj.status}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--color-text-main)', lineHeight: '1.35', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {proj.shortDesc}
                    </p>
                  </div>

                  <div>
                    {/* Stack Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                      {proj.stack.slice(0, 3).map((s, i) => (
                        <span key={i} className="hud-monospace" style={{ fontSize: '8.5px', padding: '2px 6px', background: 'rgba(255, 255, 255, 0.06)', color: '#fff', borderRadius: '3px' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Direct Quick Store / Repo Action Buttons */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                      {proj.playstore && (
                        <a
                          href={proj.playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            textDecoration: 'none',
                            fontSize: '9px',
                            padding: '4px 8px',
                            borderRadius: '3px',
                            background: 'rgba(0, 255, 102, 0.1)',
                            border: '1px solid #00ff66',
                            color: '#00ff66',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-hud)'
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C20.08,13.24 20.08,12.76 18.81,12.03L16.81,10.88L14.81,12.88M4.6,3.16L13.1,11.66L15.3,9.46L5.3,3.71C5.07,3.58 4.83,3.37 4.6,3.16M4.6,20.84C4.83,20.63 5.07,20.42 5.3,20.29L15.3,14.54L13.1,12.34L4.6,20.84Z" />
                          </svg>
                          PLAY STORE
                        </a>
                      )}
                      {proj.appstore && (
                        <a
                          href={proj.appstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            textDecoration: 'none',
                            fontSize: '9px',
                            padding: '4px 8px',
                            borderRadius: '3px',
                            background: 'rgba(0, 240, 255, 0.1)',
                            border: '1px solid var(--color-cyan)',
                            color: 'var(--color-cyan)',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-hud)'
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                          </svg>
                          APP STORE
                        </a>
                      )}
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            textDecoration: 'none',
                            fontSize: '9px',
                            padding: '4px 8px',
                            borderRadius: '3px',
                            background: 'rgba(255, 170, 0, 0.1)',
                            border: '1px solid var(--color-amber)',
                            color: 'var(--color-amber)',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-hud)'
                          }}
                        >
                          GITHUB
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. ALL PROJECTS CAROUSEL VIEW */}
        {activeTab === 'all' && (
          <div style={{ position: 'relative', width: '100%' }}>

            {/* Scroll Left Button */}
            {canScrollLeft && (
              <button
                onClick={() => handleScroll('left')}
                className="hud-nav-btn"
                style={{
                  position: 'absolute',
                  left: '-16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(6, 12, 30, 0.95)',
                  border: '1px solid var(--color-cyan)',
                  color: 'var(--color-cyan)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Scroll Left"
              >
                &#10094;
              </button>
            )}

            {/* Scroll Right Button */}
            {canScrollRight && (
              <button
                onClick={() => handleScroll('right')}
                className="hud-nav-btn"
                style={{
                  position: 'absolute',
                  right: '-16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: 'rgba(6, 12, 30, 0.95)',
                  border: '1px solid var(--color-cyan)',
                  color: 'var(--color-cyan)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Scroll Right"
              >
                &#10095;
              </button>
            )}

            {/* Project horizontal flex layout */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollPosition}
              style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                padding: '8px 4px 16px 4px',
                width: '100%',
                boxSizing: 'border-box',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="hud-panel hud-panel-magenta"
                  onClick={() => setSelectedProject(proj)}
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '270px',
                    flex: '0 0 310px',
                    borderWidth: '1px',
                    borderColor: proj.isShowcase ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 0, 127, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = proj.isShowcase ? 'var(--color-cyan)' : 'var(--color-magenta)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 0, 127, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = proj.isShowcase ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 0, 127, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-magenta)' }}>
                        [{proj.category.toUpperCase()}]
                      </span>
                      <span className="hud-monospace" style={{ fontSize: '9px', color: 'var(--color-cyan)' }}>
                        {proj.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-header)', fontWeight: 'bold', marginBottom: '10px', color: '#fff' }}>
                      {proj.title}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.45', marginBottom: '16px' }}>
                      {proj.shortDesc}
                    </p>
                  </div>

                  {/* Stack items */}
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                      {proj.stack.slice(0, 3).map((s, i) => (
                        <span key={i} className="hud-monospace" style={{ fontSize: '9px', padding: '3px 8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '2px' }}>
                          {s}
                        </span>
                      ))}
                      {proj.stack.length > 3 && (
                        <span className="hud-monospace" style={{ fontSize: '9px', padding: '3px 6px', color: 'var(--color-magenta)' }}>
                          +{proj.stack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Hologram trigger info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--color-cyan)', fontFamily: 'var(--font-hud)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      INITIALIZE_HOLOGRAM_OUTPUT
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Hologram HUD Modal Overlay */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(2, 2, 8, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="hud-panel hud-panel-amber animate-scale-in"
            style={{
              width: '100%',
              maxWidth: '680px',
              padding: '28px',
              textAlign: 'left',
              borderWidth: '1.5px',
              borderColor: 'var(--color-amber)',
              background: 'rgba(6, 12, 30, 0.95)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 170, 0, 0.2)', paddingBottom: '10px', marginBottom: '18px' }}>
              <span className="hud-monospace glow-text-amber" style={{ fontSize: '11px' }}>
                HOLOGRAM_STREAM_PORT // D-OUT
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-amber)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'var(--font-hud)',
                  padding: '2px 8px'
                }}
              >
                [SHUTDOWN_HOLOGRAM X]
              </button>
            </div>

            {/* Title / Info */}
            <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              {selectedProject.appIcon && (
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#040814',
                  border: '1.5px solid var(--color-amber)',
                  boxShadow: '0 0 12px rgba(255, 170, 0, 0.3)',
                  flexShrink: 0
                }}>
                  <img src={selectedProject.appIcon} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
              <div>
                <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-header)', fontWeight: 900, color: '#fff', margin: 0 }}>
                  {selectedProject.title}
                </h3>
                <span className="hud-monospace" style={{ fontSize: '11px', color: 'var(--color-amber)' }}>
                  COSMIC_SECTOR: LOGS_BAY // STAT: {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '14px', lineHeight: '1.55', color: 'var(--color-text-main)', marginBottom: '18px' }}>
              {selectedProject.longDesc}
            </p>

            {/* Specifications metrics */}
            <div style={{ background: 'rgba(255, 170, 0, 0.05)', borderLeft: '3px solid var(--color-amber)', padding: '14px 18px', borderRadius: '0 4px 4px 0', marginBottom: '18px' }}>
              <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-amber)', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                SYSTEMS DIAGNOSTICS & TELEMETRY
              </span>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {selectedProject.metrics.map((metric, i) => (
                  <li key={i} className="hud-monospace" style={{ fontSize: '11px', color: '#fff', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-amber)' }}>✓</span> [ENG_REP] {metric}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div style={{ marginBottom: '22px' }}>
              <span className="hud-monospace" style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
                SUBSYSTEM INTEGRATIONS:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.stack.map((s, i) => (
                  <span key={i} className="hud-monospace" style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255, 170, 0, 0.1)', color: 'var(--color-amber)', border: '1px solid rgba(255, 170, 0, 0.2)', borderRadius: '3px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Multi-link Footer Uplink triggers */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {selectedProject.playstore && (
                <a
                  href={selectedProject.playstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    fontSize: '11px',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    border: '1px solid #00ff66',
                    background: 'rgba(0, 255, 102, 0.1)',
                    color: '#00ff66',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-hud)',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C20.08,13.24 20.08,12.76 18.81,12.03L16.81,10.88L14.81,12.88L16.81,15.12M4.6,3.16L13.1,11.66L15.3,9.46L5.3,3.71C5.07,3.58 4.83,3.37 4.6,3.16M4.6,20.84C4.83,20.63 5.07,20.42 5.3,20.29L15.3,14.54L13.1,12.34L4.6,20.84Z" />
                  </svg>
                  PLAY STORE
                </a>
              )}

              {selectedProject.appstore && (
                <a
                  href={selectedProject.appstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    fontSize: '11px',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--color-cyan)',
                    background: 'rgba(0, 240, 255, 0.1)',
                    color: 'var(--color-cyan)',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-hud)',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  APP STORE
                </a>
              )}

              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-button-amber"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    fontSize: '11px',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--color-amber)',
                    background: 'rgba(255, 170, 0, 0.1)',
                    color: 'var(--color-amber)',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-hud)',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  GITHUB REPO
                </a>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="hud-button"
                style={{
                  background: 'transparent',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'var(--color-text-muted)',
                  fontSize: '11px',
                  padding: '10px 16px',
                  marginLeft: 'auto'
                }}
              >
                DISMISS
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Styles for scrollbar hiding & button hover */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        .hud-nav-btn:hover {
          background: var(--color-cyan) !important;
          color: #020208 !important;
          box-shadow: 0 0 16px var(--color-cyan) !important;
        }
        .animate-fade-in {
          animation: pageFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: modalScaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes pageFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalScaleIn {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        .hud-showcase-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .hud-showcase-card:hover {
          transform: translateY(-8px) scale(1.015) !important;
          border-color: var(--color-cyan) !important;
          background: rgba(8, 24, 52, 0.95) !important;
          box-shadow: 0 12px 35px rgba(0, 240, 255, 0.35) !important;
        }
        .hud-showcase-card:hover .showcase-icon-box {
          border-color: var(--color-cyan) !important;
          box-shadow: 0 0 20px var(--color-cyan) !important;
          transform: scale(1.1) !important;
        }
        .hud-showcase-card:hover .showcase-title-text {
          color: var(--color-cyan) !important;
          text-shadow: 0 0 12px var(--color-cyan) !important;
        }
        .hud-showcase-scroll-container::-webkit-scrollbar {
          width: 5px;
        }
        .hud-showcase-scroll-container::-webkit-scrollbar-track {
          background: rgba(2, 2, 8, 0.5);
        }
        .hud-showcase-scroll-container::-webkit-scrollbar-thumb {
          background: var(--color-cyan);
          border-radius: 3px;
        }
        @media (min-width: 900px) {
          .hud-showcase-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
          }
        }
        @media (min-width: 650px) and (max-width: 899px) {
          .hud-showcase-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 649px) {
          .hud-projects-wrapper {
            padding-top: 80px !important;
            padding-left: 8px !important;
            padding-right: 8px !important;
            padding-bottom: 20px !important;
          }
          .hud-projects-container {
            padding: 14px !important;
            max-height: none !important;
          }
          .hud-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .hud-modal-content {
            padding: 18px !important;
            max-width: 94vw !important;
            max-height: 84vh !important;
          }
        }
      `}</style>

    </div>
  );
}