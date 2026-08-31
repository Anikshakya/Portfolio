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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Custom Cursor
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
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const renderCursorRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
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

  // IntersectionObserver for Apple Scroll Reveals & Nav Pill Tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -20% 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          const sectionIdx = parseInt(entry.target.getAttribute('data-section-idx'));
          if (!isNaN(sectionIdx)) {
            setSector(sectionIdx);
          }
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.apple-reveal, .sector-section');
    revealElements.forEach(el => observer.observe(el));

    const handleWindowScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const triggerWarp = (targetSectorIdx) => {
    setSector(targetSectorIdx);
    const targetEl = sectorRefs.current[targetSectorIdx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      {/* Custom Desktop Cursor */}
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />

      {/* 1. Ambient Backdrop Canvas */}
      <SpaceCanvas
        currentSector={currentSector}
        scrollY={scrollY}
        theme={theme}
      />

      {/* 2. Floating Navigation Pill Header */}
      <CockpitHUD
        currentSector={currentSector}
        setSector={triggerWarp}
        isWarping={false}
        triggerWarp={triggerWarp}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 3. Main Continuous Scroll Section Stack */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%' }}>

        {/* Section 0: Overview */}
        <section
          data-section-idx="0"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => sectorRefs.current[0] = el}
        >
          <SectorHome triggerWarp={triggerWarp} />
        </section>

        {/* Section 1: Projects */}
        <section
          data-section-idx="1"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => sectorRefs.current[1] = el}
        >
          <SectorProjects />
        </section>

        {/* Section 2: Architecture */}
        <section
          data-section-idx="2"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => sectorRefs.current[2] = el}
        >
          <SectorSkills />
        </section>

        {/* Section 3: Contact */}
        <section
          data-section-idx="3"
          className="sector-section apple-reveal"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px max(4vw, 16px)',
            boxSizing: 'border-box'
          }}
          ref={el => sectorRefs.current[3] = el}
        >
          <SectorContact />
        </section>

      </div>
    </div>
  );
}

export default App;