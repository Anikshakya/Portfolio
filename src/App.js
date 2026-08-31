import React, { useState, useRef, useEffect } from 'react';
import SpaceCanvas from './components/SpaceCanvas';
import CockpitHUD from './components/CockpitHUD';
import SectorHome from './components/SectorHome';
import SectorProjects from './components/SectorProjects';
import SectorSkills from './components/SectorSkills';
import SectorContact from './components/SectorContact';

function App() {
  const [currentSector, setSector] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState('dark');

  const sectorRefs = useRef([]);

  // Desktop Custom Cursor
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // ---------------------------------------------------------------------------
  // Theme
  // ---------------------------------------------------------------------------

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ---------------------------------------------------------------------------
  // Disable browser auto scroll restoration
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Theme Toggle
  // ---------------------------------------------------------------------------

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // ---------------------------------------------------------------------------
  // Custom Cursor
  // ---------------------------------------------------------------------------

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;

    let ringX = -100;
    let ringY = -100;

    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX} px`;
        dotRef.current.style.top = `${mouseY} px`;
      }
    };

    const renderCursorRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX} px`;
        ringRef.current.style.top = `${ringY} px`;
      }

      animId = requestAnimationFrame(renderCursorRing);
    };

    window.addEventListener('mousemove', handleMouseMove);

    renderCursorRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Active Section Tracking + Reveal Animation
  // ---------------------------------------------------------------------------

  useEffect(() => {
    let ticking = false;

    const handleWindowScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        setScrollY(currentScrollY);

        // Use the viewport center to determine the active section.
        const viewportCenter = window.innerHeight * 0.5;

        let activeIdx = 0;
        let minDistance = Infinity;

        sectorRefs.current.forEach((ref, idx) => {
          if (!ref) return;

          const rect = ref.getBoundingClientRect();

          const sectionCenter =
            rect.top + rect.height / 2;

          const distance =
            Math.abs(sectionCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            activeIdx = idx;
          }
        });

        setSector(prev =>
          prev !== activeIdx ? activeIdx : prev
        );

        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener(
      'scroll',
      handleWindowScroll,
      { passive: true }
    );

    handleWindowScroll();

    // -------------------------------------------------------------------------
    // Intersection Observer
    // -------------------------------------------------------------------------

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        root: null,
        rootMargin: '-30px 0px -30px 0px',
        threshold: 0.08
      }
    );

    const revealElements = document.querySelectorAll(
      '.apple-reveal, .sector-section'
    );

    revealElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();

      window.removeEventListener(
        'scroll',
        handleWindowScroll
      );
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Sector Navigation
  // ---------------------------------------------------------------------------
  //
  // IMPORTANT:
  //
  // Every section is already min-height: 100vh.
  // We therefore navigate using the SECTION'S DOCUMENT POSITION.
  //
  // We do NOT calculate:
  // - child height
  // - child center
  // - viewport center
  // - dynamic top margins
  //
  // This keeps all sections consistent.
  // ---------------------------------------------------------------------------

  const triggerWarp = (targetSectorIdx) => {
    setSector(targetSectorIdx);

    const targetEl =
      sectorRefs.current[targetSectorIdx];

    if (!targetEl) return;

    // Home should always return exactly to the top.
    if (targetSectorIdx === 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      return;
    }

    // Get the section's absolute document position.
    const sectionTop =
      targetEl.getBoundingClientRect().top +
      window.scrollY;

    // The HUD is floating over the page, so leave a small amount
    // of space above the section.
    //
    // Keep this value small because the section itself is already
    // 100vh and its content is vertically centered.
    const HUD_OFFSET = 20;

    const targetScroll =
      Math.max(0, sectionTop - HUD_OFFSET);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className="App"
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
        position: 'relative',
        transition: 'background-color 0.4s ease'
      }}
    >

      {/* ===================================================================== */}
      {/* Custom Desktop Cursor */}
      {/* ===================================================================== */}

      <div
        ref={dotRef}
        className="custom-cursor-dot"
      />

      <div
        ref={ringRef}
        className="custom-cursor-ring"
      />

      {/* ===================================================================== */}
      {/* Ambient Backdrop Canvas */}
      {/* ===================================================================== */}

      <SpaceCanvas
        currentSector={currentSector}
        scrollY={scrollY}
        theme={theme}
      />

      {/* ===================================================================== */}
      {/* Apple Dynamic Island Floating Navigation */}
      {/* ===================================================================== */}

      <CockpitHUD
        currentSector={currentSector}
        setSector={triggerWarp}
        isWarping={false}
        triggerWarp={triggerWarp}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* ===================================================================== */}
      {/* Main Continuous Scroll Section Stack */}
      {/* ===================================================================== */}

      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%'
        }}
      >

        {/* =================================================================== */}
        {/* Section 0 — Home */}
        {/* =================================================================== */}

        <section
          data-section-idx="0"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding:
              '70px max(4vw, 16px) 30px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => {
            sectorRefs.current[0] = el;
          }}
        >
          <SectorHome
            triggerWarp={triggerWarp}
          />
        </section>

        {/* =================================================================== */}
        {/* Section 1 — Projects */}
        {/* =================================================================== */}

        <section
          data-section-idx="1"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding:
              '70px max(4vw, 16px) 30px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => {
            sectorRefs.current[1] = el;
          }}
        >
          <SectorProjects />
        </section>

        {/* =================================================================== */}
        {/* Section 2 — Skills */}
        {/* =================================================================== */}

        <section
          data-section-idx="2"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding:
              '70px max(4vw, 16px) 30px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => {
            sectorRefs.current[2] = el;
          }}
        >
          <SectorSkills />
        </section>

        {/* =================================================================== */}
        {/* Section 3 — Contact */}
        {/* =================================================================== */}

        <section
          data-section-idx="3"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding:
              '70px max(4vw, 16px) 30px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => {
            sectorRefs.current[3] = el;
          }}
        >
          <SectorContact />
        </section>

      </div>
    </div>
  );
}

export default App;