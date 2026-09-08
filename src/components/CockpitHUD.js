import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function CockpitHUD({
  currentSector,
  setSector,
  isWarping,
  triggerWarp
}) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [hoveredSector, setHoveredSector] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [shipStats, setShipStats] = useState({
    speed: '2,400 km/s',
    energy: '98.4%',
    shields: '100%',
    coordinates: 'RA 04h 35m / DEC +16° 30\''
  });

  const audioCtxRef = useRef(null);
  const logContainerRef = useRef(null);

  /* ================================================================
     AUDIO
  ================================================================ */

  const playSound = useCallback((type) => {
    if (!audioEnabled) return;

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (
          window.AudioContext ||
          window.webkitAudioContext
        )();
      }

      const ctx = audioCtxRef.current;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';

        osc.frequency.setValueAtTime(
          800,
          now
        );

        osc.frequency.exponentialRampToValueAtTime(
          150,
          now + 0.1
        );

        gainNode.gain.setValueAtTime(
          0.08,
          now
        );

        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.1
        );

        osc.start(now);
        osc.stop(now + 0.1);

      } else if (type === 'warp') {
        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(
          80,
          now
        );

        osc.frequency.exponentialRampToValueAtTime(
          880,
          now + 0.8
        );

        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';

        filter.frequency.setValueAtTime(
          200,
          now
        );

        filter.frequency.exponentialRampToValueAtTime(
          2000,
          now + 0.8
        );

        osc.disconnect(gainNode);

        osc.connect(filter);
        filter.connect(gainNode);

        gainNode.gain.setValueAtTime(
          0.01,
          now
        );

        gainNode.gain.linearRampToValueAtTime(
          0.12,
          now + 0.2
        );

        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.85
        );

        osc.start(now);
        osc.stop(now + 0.9);

      } else if (type === 'hover') {
        osc.type = 'triangle';

        osc.frequency.setValueAtTime(
          220,
          now
        );

        gainNode.gain.setValueAtTime(
          0.03,
          now
        );

        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.05
        );

        osc.start(now);
        osc.stop(now + 0.05);
      }

    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }, [audioEnabled]);


  /* ================================================================
     AUDIO CONTEXT INITIALIZATION
  ================================================================ */

  useEffect(() => {
    const handleFirstInteraction = () => {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (
            window.AudioContext ||
            window.webkitAudioContext
          )();
        }

        if (
          audioCtxRef.current.state ===
          'suspended'
        ) {
          audioCtxRef.current.resume();
        }

      } catch (e) {}

      window.removeEventListener(
        'click',
        handleFirstInteraction
      );

      window.removeEventListener(
        'touchstart',
        handleFirstInteraction
      );

      window.removeEventListener(
        'keydown',
        handleFirstInteraction
      );
    };

    window.addEventListener(
      'click',
      handleFirstInteraction
    );

    window.addEventListener(
      'touchstart',
      handleFirstInteraction
    );

    window.addEventListener(
      'keydown',
      handleFirstInteraction
    );

    return () => {
      window.removeEventListener(
        'click',
        handleFirstInteraction
      );

      window.removeEventListener(
        'touchstart',
        handleFirstInteraction
      );

      window.removeEventListener(
        'keydown',
        handleFirstInteraction
      );
    };
  }, []);


  /* ================================================================
     SECTOR COORDINATES
  ================================================================ */

  const getSectorCoordinates = (sector) => {
    switch (sector) {
      case 0:
        return 'RA 04h 35m / DEC +16° 30\'';

      case 1:
        return 'RA 18h 53m / DEC -33° 01\'';

      case 2:
        return 'RA 05h 25m / DEC +06° 25\'';

      case 3:
        return 'RA 19h 20m / DEC +22° 41\'';

      case 4:
        return 'RA 21h 14m / DEC +12° 10\'';

      default:
        return 'RA 00h 00m / DEC +00° 00\'';
    }
  };


  /* ================================================================
     BOOT LOGS
  ================================================================ */

  useEffect(() => {
    const bootLogs = [
      'SYS_BOOT: Initiating starship HUD v4.8...',
      'SYS_BOOT: Quantum reactor core: ONLINE',
      'SYS_BOOT: Sound Audio Engine: ENABLED',
      'SYS_BOOT: Particle deflector shields: FULLY CHARGED',
      'SYS_BOOT: Navigation sub-systems active.',
      'SYS_BOOT: Anchor point established at Sector 0.'
    ];

    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${log}`
        ]);
      }, index * 600);
    });
  }, []);


  /* ================================================================
     SECTOR CHANGE LOG
  ================================================================ */

  useEffect(() => {
    const sectorNames = [
      'Sector 0: Genesis (Home)',
      'Sector 1: Career Logs (Experience Timeline)',
      'Sector 2: Creations (Work Showcase & Projects)',
      'Sector 3: Expertise (Skills Constellation)',
      'Sector 4: Contact Grid'
    ];

    setLogs(prev => {
      if (prev.length > 0) {
        return [
          ...prev,

          `[${new Date().toLocaleTimeString()}] [NAV] Target coordinate locked: ${sectorNames[currentSector]}.`,

          `[${new Date().toLocaleTimeString()}] [SYS] Calibration complete. Orbit path projected.`
        ];
      }

      return prev;
    });
  }, [currentSector]);


  /* ================================================================
     WARP TELEMETRY
  ================================================================ */

  useEffect(() => {
    let interval;

    if (isWarping) {
      playSound('warp');

      interval = setInterval(() => {
        setShipStats(prev => ({
          ...prev,

          speed: '2,400 km/s',

          energy:
            `${(
              97.8 -
              Math.random() * 0.5
            ).toFixed(1)}%`,

          shields:
            `${(
              98 +
              Math.random() * 2
            ).toFixed(0)}%`,

          coordinates:
            getSectorCoordinates(
              currentSector
            )
        }));
      }, 300);
    }

    return () =>
      clearInterval(interval);

  }, [
    isWarping,
    currentSector,
    playSound
  ]);


  /* ================================================================
     LOG SCROLL
  ================================================================ */

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop =
        logContainerRef.current.scrollHeight;
    }
  }, [logs]);


  /* ================================================================
     NAVIGATION
  ================================================================ */

  const handleSectorChange = (sectorIdx) => {
    setDrawerOpen(false);

    if (
      sectorIdx === currentSector ||
      isWarping
    ) {
      return;
    }

    playSound('click');

    triggerWarp(sectorIdx);
  };


  /* ================================================================
     AUDIO TOGGLE
  ================================================================ */

  const toggleAudio = () => {
    const nextState = !audioEnabled;

    setAudioEnabled(nextState);

    if (nextState) {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (
            window.AudioContext ||
            window.webkitAudioContext
          )();
        }

        audioCtxRef.current.resume();

        playSound('click');

      } catch (e) {}
    }
  };


  /* ================================================================
     RESUME DOWNLOAD
  ================================================================ */

  const handleResumeDownload = () => {
    playSound('click');

    // Small visual/audio delay makes the interaction
    // feel intentional without blocking the browser.
    setTimeout(() => {
      const link = document.createElement('a');

      link.href = 'https://drive.google.com/uc?export=download&id=1DVXMgBsQ2_-sZ87uilSv-n76lRJsrCFP';

      link.download = 'Anik-Shakya-Resume.pdf';

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }, 80);
  };


  /* ================================================================
     SECTORS
  ================================================================ */

  const sectorLabels = [
    {
      title: 'ABOUT ME',
      label: 'Home Base',
      desc: 'Identity, Bio & Highlights'
    },

    {
      title: 'EXPERIENCE',
      label: 'Career Timeline',
      desc: 'Roles, Milestones & Stack'
    },

    {
      title: 'PROJECTS',
      label: 'Work Showcase & Projects',
      desc: 'Deployed Apps & Repos'
    },

    {
      title: 'SKILLS',
      label: 'Skills Constellation',
      desc: 'Flutter & Native Engine'
    },

    {
      title: 'CONTACT',
      label: 'Comms Uplink',
      desc: 'Signal Deck & Inquiry'
    }
  ];


  return (
    <div
      className="hud-root"
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '12px',
        boxSizing: 'border-box'
      }}
    >

      <div className="crt-overlay" />


      {/* ============================================================
         TOP HEADER DECK
      ============================================================ */}

      <div
        className="hud-top-deck"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          gap: '10px',
          width: '100%'
        }}
      >

        {/* ==========================================================
           SHIP IDENTITY
        ========================================================== */}

        <div
          className="hud-panel"
          style={{
            padding: '8px 14px',
            borderLeftWidth: '4px'
          }}
        >

          <h1
            style={{
              fontSize: '15px',
              margin: 0,
              fontFamily: 'var(--font-header)',
              letterSpacing: '1.5px'
            }}
            className="glow-text-cyan"
          >
            ANIK SHAKYA
          </h1>

          <div
            style={{
              fontSize: '9.5px',
              marginTop: '2px',
              opacity: 0.8,
              display: 'flex',
              gap: '10px'
            }}
            className="hud-monospace"
          >

            <span>
              NAV: SEC_0{currentSector}
            </span>

            <span
              className={
                isWarping
                  ? 'glow-text-magenta'
                  : 'glow-text-green'
              }
            >
              STAT: {isWarping ? 'WARPING' : 'STABLE'}
            </span>

          </div>

        </div>


        {/* ==========================================================
           DESKTOP NAV
        ========================================================== */}

        <div
          className="hud-panel hud-desktop-nav"
          style={{
            display: 'flex',
            gap: '6px',
            padding: '6px',
            alignItems: 'center',
            position: 'relative'
          }}
        >

          {sectorLabels.map((sec, idx) => (
            <button
              key={idx}
              className={`hud-button ${
                currentSector === idx
                  ? 'glow-text-cyan'
                  : ''
              }`}
              style={{
                background:
                  currentSector === idx
                    ? 'rgba(0, 240, 255, 0.2)'
                    : 'transparent',

                borderColor:
                  currentSector === idx
                    ? 'var(--color-cyan)'
                    : 'rgba(0, 240, 255, 0.15)',

                fontSize: '10px',

                padding: '5px 10px'
              }}
              onClick={() =>
                handleSectorChange(idx)
              }
              onMouseEnter={() => {
                playSound('hover');
                setHoveredSector(idx);
              }}
              onMouseLeave={() => setHoveredSector(null)}
              disabled={isWarping}
              title={`${sec.label} — ${sec.desc}`}
            >
              SEC_0{idx} {sec.title}
            </button>
          ))}

          {hoveredSector !== null && (
            <div
              className="hud-panel"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '5px 12px',
                fontSize: '10px',
                fontFamily: 'var(--font-hud)',
                whiteSpace: 'nowrap',
                zIndex: 1000,
                background: 'rgba(2, 8, 22, 0.95)',
                borderColor: 'var(--color-cyan)',
                boxShadow: '0 4px 20px rgba(0, 240, 255, 0.4)',
                pointerEvents: 'none',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              <span className="glow-text-cyan" style={{ fontWeight: 'bold' }}>
                [{sectorLabels[hoveredSector].label}]
              </span>
              <span style={{ color: 'var(--color-text-muted)' }}>
                {sectorLabels[hoveredSector].desc}
              </span>
            </div>
          )}

        </div>


        {/* ==========================================================
           RIGHT ACTIONS
        ========================================================== */}

        <div
          className="hud-actions"
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}
        >

          {/* ========================================================
             RESUME
          ======================================================== */}

          <button
            className="hud-panel hud-button resume-button"
            onClick={handleResumeDownload}
            onMouseEnter={() =>
              playSound('hover')
            }
            aria-label="Download Resume"
            style={{
              padding: '8px 12px',
              fontSize: '10px',
              borderColor: 'var(--color-cyan)',
              color: 'var(--color-cyan)',
              background:
                'rgba(0, 240, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              pointerEvents: 'auto'
            }}
          >

            {/* Download Icon */}

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />

              <path d="m7 10 5 5 5-5" />

              <path d="M5 21h14" />

            </svg>

            <span className="hud-desktop-only">
              RESUME
            </span>

          </button>


          {/* ========================================================
             AUDIO
          ======================================================== */}

          <button
            className="hud-panel hud-button"
            onClick={toggleAudio}
            onMouseEnter={() =>
              playSound('hover')
            }
            style={{
              padding: '8px 12px',
              fontSize: '10px',

              borderColor:
                audioEnabled
                  ? 'var(--color-green)'
                  : 'var(--color-magenta)',

              color:
                audioEnabled
                  ? 'var(--color-green)'
                  : 'var(--color-magenta)',

              background:
                audioEnabled
                  ? 'rgba(0, 255, 102, 0.08)'
                  : 'rgba(255, 0, 127, 0.08)',

              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'auto'
            }}
          >

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              {audioEnabled ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />

                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />

                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />

                  <line
                    x1="22"
                    y1="9"
                    x2="16"
                    y2="15"
                  />

                  <line
                    x1="16"
                    y1="9"
                    x2="22"
                    y2="15"
                  />
                </>
              )}

            </svg>

            <span className="hud-desktop-only">
              AUDIO: {audioEnabled ? 'ON' : 'MUTED'}
            </span>

          </button>


          {/* ========================================================
             MOBILE DRAWER
          ======================================================== */}

          <button
            className="hud-panel hud-button hud-mobile-drawer-btn"
            onClick={() => {
              playSound('click');

              setDrawerOpen(
                prev => !prev
              );
            }}
            style={{
              padding: '8px 12px',
              fontSize: '11px',
              borderColor: 'var(--color-cyan)',
              color: 'var(--color-cyan)',
              background:
                'rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'auto',
              fontWeight: 'bold'
            }}
            aria-label="Toggle Mobile Menu Drawer"
          >
            {drawerOpen
              ? '✕ CLOSE'
              : '☰ NAV MENU'}
          </button>

        </div>

      </div>


      {/* ============================================================
         MOBILE NAVIGATION DRAWER
      ============================================================ */}

      {drawerOpen && (
        <div
          className="mobile-drawer-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background:
              'rgba(2, 2, 8, 0.92)',
            backdropFilter:
              'blur(12px)',
            WebkitBackdropFilter:
              'blur(12px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 16px',
            pointerEvents: 'auto',
            animation:
              'drawerSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            boxSizing: 'border-box'
          }}
          onClick={() =>
            setDrawerOpen(false)
          }
        >

          <div
            className="hud-panel hud-panel-cyan"
            style={{
              padding: '20px',
              width: '100%',
              maxWidth: '480px',
              margin: '0 auto',
              background:
                'rgba(6, 14, 34, 0.96)',
              borderWidth: '1.5px',
              borderColor:
                'var(--color-cyan)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxSizing: 'border-box'
            }}
            onClick={e =>
              e.stopPropagation()
            }
          >

            {/* Drawer Header */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom:
                  '1px solid rgba(0, 240, 255, 0.25)',
                paddingBottom: '12px'
              }}
            >

              <div>

                <span
                  className="hud-monospace glow-text-cyan"
                  style={{
                    fontSize: '11px',
                    display: 'block'
                  }}
                >
                  NAV_COMPUTER // SEC_SELECT
                </span>

                <span
                  style={{
                    fontSize: '14px',
                    fontFamily:
                      'var(--font-header)',
                    fontWeight: 'bold',
                    color: '#fff'
                  }}
                >
                  STARSHIP NAVIGATION DECK
                </span>

              </div>

              <button
                onClick={() =>
                  setDrawerOpen(false)
                }
                className="hud-button"
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  color:
                    'var(--color-magenta)',
                  borderColor:
                    'var(--color-magenta)'
                }}
              >
                ✕ CLOSE
              </button>

            </div>


            {/* Sector Buttons */}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >

              {sectorLabels.map(
                (sec, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleSectorChange(idx)
                    }
                    className="hud-panel mobile-sector-button"
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',

                      background:
                        currentSector === idx
                          ? 'rgba(0, 240, 255, 0.2)'
                          : 'rgba(2, 6, 20, 0.8)',

                      borderColor:
                        currentSector === idx
                          ? 'var(--color-cyan)'
                          : 'rgba(0, 240, 255, 0.2)',

                      cursor: 'pointer',

                      display: 'flex',

                      justifyContent:
                        'space-between',

                      alignItems:
                        'center',

                      transition:
                        'all 0.2s ease',

                      borderRadius: '6px'
                    }}
                  >

                    <div>

                      <span
                        className="hud-monospace"
                        style={{
                          fontSize: '10px',
                          color:
                            'var(--color-cyan)',
                          display: 'block'
                        }}
                      >
                        SEC_0{idx} - {sec.title}
                      </span>

                      <span
                        style={{
                          fontSize: '15px',
                          fontFamily:
                            'var(--font-header)',
                          fontWeight: 'bold',
                          color: '#fff',
                          display: 'block',
                          marginTop: '2px'
                        }}
                      >
                        {sec.label}
                      </span>

                      <span
                        style={{
                          fontSize: '11px',
                          color:
                            'var(--color-text-muted)',
                          display: 'block',
                          marginTop: '2px'
                        }}
                      >
                        {sec.desc}
                      </span>

                    </div>

                    {currentSector === idx && (
                      <span
                        className="glow-text-cyan hud-monospace"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}
                      >
                        ▶ ACTIVE
                      </span>
                    )}

                  </button>
                )
              )}

            </div>


            {/* ======================================================
               MOBILE RESUME
            ====================================================== */}

            <button
              onClick={handleResumeDownload}
              className="mobile-resume-button"
              onMouseEnter={() =>
                playSound('hover')
              }
            >

              <span className="resume-icon">

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />

                  <path d="m7 10 5 5 5-5" />

                  <path d="M5 21h14" />
                </svg>

              </span>

              <span className="resume-text">

                <strong>
                  DOWNLOAD RESUME
                </strong>

                <small>
                  ANIK SHAKYA · PDF DOCUMENT
                </small>

              </span>

              <span className="resume-arrow">
                ↗
              </span>

            </button>


            {/* Footer Telemetry */}

            <div
              style={{
                borderTop:
                  '1px solid rgba(255,255,255,0.08)',
                paddingTop: '12px',
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center'
              }}
            >

              <span
                className="hud-monospace"
                style={{
                  fontSize: '10px',
                  color:
                    'var(--color-text-muted)'
                }}
              >
                ORBIT_STABILITY: 100%
              </span>

              <span
                className="hud-monospace glow-text-green"
                style={{
                  fontSize: '10px'
                }}
              >
                WARP_ENGINE: READY
              </span>

            </div>

          </div>

        </div>
      )}


      {/* ============================================================
         STYLES
      ============================================================ */}

      <style>{`

        /* ==========================================================
           RESUME BUTTON
        ========================================================== */

        .resume-button {
          position: relative;

          overflow: hidden;

          transition:
            color .25s ease,
            background .25s ease,
            border-color .25s ease,
            box-shadow .25s ease,
            transform .25s ease !important;
        }


        .resume-button::before {
          content: '';

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(0,240,255,.08),
              transparent
            );

          transform:
            translateX(-120%);

          transition:
            transform .5s ease;
        }


        .resume-button:hover {
          color:
            #fff !important;

          background:
            rgba(0,240,255,.14) !important;

          border-color:
            var(--color-cyan) !important;

          box-shadow:
            0 0 18px
            rgba(0,240,255,.14);

          transform:
            translateY(-1px);
        }


        .resume-button:hover::before {
          transform:
            translateX(120%);
        }


        /* ==========================================================
           MOBILE RESUME
        ========================================================== */

        .mobile-resume-button {
          width: 100%;

          min-height: 58px;

          display: flex;

          align-items: center;

          gap: 12px;

          padding:
            11px
            13px;

          border:
            1px solid
            rgba(0,240,255,.28);

          border-radius:
            7px;

          background:
            linear-gradient(
              135deg,
              rgba(0,240,255,.11),
              rgba(0,240,255,.035)
            );

          color:
            var(--color-cyan);

          font-family: inherit;

          cursor: pointer;

          text-align: left;

          transition:
            all .25s ease;

          box-sizing:
            border-box;
        }


        .mobile-resume-button:hover {
          border-color:
            var(--color-cyan);

          background:
            rgba(0,240,255,.16);

          box-shadow:
            0 0 22px
            rgba(0,240,255,.1);
        }


        .resume-icon {
          width: 34px;

          height: 34px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border:
            1px solid
            rgba(0,240,255,.25);

          border-radius:
            5px;

          background:
            rgba(0,240,255,.06);
        }


        .resume-text {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 3px;

          flex: 1;
        }


        .resume-text strong {
          font-family:
            var(--font-header);

          font-size:
            10px;

          letter-spacing:
            .1em;

          color:
            #fff;
        }


        .resume-text small {
          font-family:
            var(--font-monospace, monospace);

          font-size:
            7px;

          letter-spacing:
            .08em;

          color:
            var(--color-text-muted);
        }


        .resume-arrow {
          font-size:
            17px;

          opacity:
            .7;

          transition:
            transform .25s ease;
        }


        .mobile-resume-button:hover
        .resume-arrow {
          transform:
            translate(
              2px,
              -2px
            );
        }


        /* ==========================================================
           DRAWER ANIMATION
        ========================================================== */

        @keyframes drawerSlideDown {

          0% {
            opacity: 0;

            transform:
              translateY(-20px);
          }

          100% {
            opacity: 1;

            transform:
              translateY(0);
          }

        }


        /* ==========================================================
           DESKTOP
        ========================================================== */

        @media (min-width: 769px) {

          .hud-mobile-drawer-btn {
            display: none !important;
          }

          .mobile-resume-button {
            display: none;
          }

        }


        /* ==========================================================
           TABLET / MOBILE
        ========================================================== */

        @media (max-width: 768px) {

          .hud-desktop-nav {
            display: none !important;
          }


          .hud-desktop-only {
            display: none !important;
          }


          .hud-actions {
            gap: 6px !important;
          }


          .resume-button {
            padding:
              8px 10px !important;
          }


          .hud-top-deck {
            gap: 6px !important;
          }

        }


        /* ==========================================================
           SMALL MOBILE
        ========================================================== */

        @media (max-width: 480px) {

          .hud-root {
            padding:
              8px !important;
          }


          .hud-top-deck
          .hud-panel {
            padding:
              7px 9px !important;
          }


          .hud-top-deck
          h1 {
            font-size:
              12px !important;
          }


          .hud-top-deck
          .hud-monospace {
            font-size:
              7px !important;
          }


          .resume-button {
            min-width:
              36px;
          }


          .mobile-drawer-overlay {
            padding:
              12px !important;
          }

        }

      `}</style>

    </div>
  );
}