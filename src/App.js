import React, { useState, useRef, useEffect } from 'react';
import SpaceCanvas from './components/SpaceCanvas';
import CockpitHUD from './components/CockpitHUD';
import SectorHome from './components/SectorHome';
import SectorProjects from './components/SectorProjects';
import SectorSkills from './components/SectorSkills';
import SectorContact from './components/SectorContact';

function App() {
  const [currentSector, setSector] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState('dark');

  const scrollContainerRef = useRef(null);
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

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollY(scrollTop);

    if (isWarping) return;

    const height = window.innerHeight;
    const activeIdx = Math.min(3, Math.max(0, Math.round(scrollTop / height)));
    if (activeIdx !== currentSector) {
      setSector(activeIdx);
    }
  };

  const triggerWarp = (targetSectorIdx) => {
    if (isWarping || targetSectorIdx === currentSector) return;
    setIsWarping(true);

    if (sectorRefs.current[targetSectorIdx]) {
      if (window.innerWidth <= 768) {
        sectorRefs.current[targetSectorIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const targetScrollTop = targetSectorIdx * window.innerHeight;
        scrollContainerRef.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
      }
    }

    setSector(targetSectorIdx);
    setTimeout(() => {
      setIsWarping(false);
    }, 600);
  };

  // APPLE 3D PARALLAX SCROLL ENGINE
  const getAppleParallaxStyle = (idx) => {
    const height = window.innerHeight || 800;
    const itemTargetScroll = idx * height;
    const scrollDelta = scrollY - itemTargetScroll;
    const isActive = idx === currentSector;

    const parallaxOffset = scrollDelta * 0.22;
    const rotateX = Math.max(-10, Math.min(10, scrollDelta * 0.012));
    const scale = isActive ? 1 : Math.max(0.92, 1 - Math.abs(scrollDelta) / 3000);

    return {
      transform: `translate3d(0, ${parallaxOffset}px, 0) rotateX(${rotateX}deg) scale(${scale})`,
      opacity: isActive ? 1 : Math.max(0.08, 1 - Math.abs(scrollDelta) / 800),
      filter: isActive ? 'blur(0px)' : 'blur(8px)',
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s',
      pointerEvents: isActive ? 'auto' : 'none',
      perspective: '1200px'
    };
  };

  return (
    <div
      className="App"
      ref={scrollContainerRef}
      onScroll={handleScroll}
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
        overflowY: isWarping ? 'hidden' : 'scroll',
        overflowX: 'hidden',
        position: 'relative',
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory',
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* Custom Cursor */}
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />

      {/* 1. Ambient Lighting Canvas */}
      <SpaceCanvas
        currentSector={currentSector}
        scrollY={scrollY}
        theme={theme}
      />

      {/* 2. Floating Navigation Header */}
      <CockpitHUD
        currentSector={currentSector}
        setSector={triggerWarp}
        isWarping={isWarping}
        triggerWarp={triggerWarp}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 3. Main Sector Content Stack */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%' }}>

        {/* Sector 0: Overview */}
        <div
          className="sector-wrapper-item"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getAppleParallaxStyle(0)
          }}
          ref={el => sectorRefs.current[0] = el}
        >
          <SectorHome triggerWarp={triggerWarp} />
        </div>

        {/* Sector 1: Projects */}
        <div
          className="sector-wrapper-item"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getAppleParallaxStyle(1)
          }}
          ref={el => sectorRefs.current[1] = el}
        >
          <SectorProjects />
        </div>

        {/* Sector 2: Architecture */}
        <div
          className="sector-wrapper-item"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getAppleParallaxStyle(2)
          }}
          ref={el => sectorRefs.current[2] = el}
        >
          <SectorSkills />
        </div>

        {/* Sector 3: Contact */}
        <div
          className="sector-wrapper-item"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getAppleParallaxStyle(3)
          }}
          ref={el => sectorRefs.current[3] = el}
        >
          <SectorContact />
        </div>

      </div>

      <style>{`
        body {
          overflow: hidden !important;
        }
        @media (max-width: 768px) {
          body {
            overflow-y: auto !important;
          }
          .App {
            scroll-snap-type: none !important;
            height: auto !important;
            min-height: 100vh !important;
            overflow-y: visible !important;
          }
          .sector-wrapper-item {
            min-height: auto !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            scroll-snap-align: none !important;
            scroll-snap-stop: normal !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;