import React, { useState, useRef } from 'react';
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
  const [blackHoleTransition, setBlackHoleTransition] = useState(null);

  const scrollContainerRef = useRef(null);

  // Monitor scroll coordinate offsets to check which sector card is centered
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

  // Sequential Black Hole transition: Implode -> Black Hole decay -> Snap scroll -> Fade-in target
  const triggerWarp = (targetSectorIdx) => {
    if (isWarping) return;
    setIsWarping(true);

    const bx = window.innerWidth * (0.35 + Math.random() * 0.3);
    const by = window.innerHeight * (0.35 + Math.random() * 0.3);

    // Phase 1: Spawn black hole and implode active sector card
    setBlackHoleTransition({
      bx,
      by,
      stage: 'implode',
      targetSector: targetSectorIdx
    });

    // Phase 2: Card sucked in, collapse the black hole (decay stage)
    setTimeout(() => {
      setBlackHoleTransition(prev => ({
        ...prev,
        stage: 'decay'
      }));
    }, 800);

    // Phase 3: Black hole closed. Snaps the container scroll position silently
    setTimeout(() => {
      const container = scrollContainerRef.current;
      if (container) {
        const targetScrollTop = targetSectorIdx * window.innerHeight;
        // Turn off smooth scrolling briefly to snap instantly
        container.style.scrollBehavior = 'auto';
        container.scrollTop = targetScrollTop;
        setScrollY(targetScrollTop);
        container.style.scrollBehavior = 'smooth';
      }

      setSector(targetSectorIdx);
      setBlackHoleTransition(null);
      
      // Complete warp locking state
      setTimeout(() => {
        setIsWarping(false);
      }, 100);
    }, 1250);
  };

  // Compute CSS transforms for transition cards
  const getTransitionStyle = (idx) => {
    // 1. If black hole transition is active
    if (blackHoleTransition) {
      const { stage, targetSector, bx, by } = blackHoleTransition;

      // Current page is sucked in during implode and stays collapsed during decay
      if ((stage === 'implode' || stage === 'decay') && idx === currentSector) {
        return {
          transform: `translate3d(calc(${bx}px - 30vw), calc(${by}px - 50vh), 0) scale(0) rotate(720deg)`,
          opacity: 0,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          transition: stage === 'implode' ? 'all 0.8s cubic-bezier(0.3, 0, 0.8, 0.15)' : 'none'
        };
      }

      // Keep target sector and other sectors hidden/collapsed during transition
      if (idx === targetSector || idx !== currentSector) {
        return {
          opacity: 0,
          transform: 'translate3d(0, 30px, 0)',
          filter: 'blur(5px)',
          pointerEvents: 'none',
          transition: 'none'
        };
      }
    }

    // 2. Normal scroll flow styles (Standby vs Active wake-up animation)
    const isActive = idx === currentSector;
    return {
      transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
      opacity: isActive ? 1 : 0.05,
      filter: isActive ? 'blur(0px)' : 'blur(4px)',
      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s',
      pointerEvents: isActive ? 'auto' : 'none'
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
        backgroundColor: '#020208',
        color: '#e2e8f0',
        overflowY: isWarping ? 'hidden' : 'scroll', // lock scroll during transitions
        overflowX: 'hidden',
        position: 'relative',
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory' // Enforce native scroll snap
      }}
    >
      {/* 1. HTML5 Space Background Engine */}
      <SpaceCanvas 
        currentSector={currentSector} 
        isWarping={isWarping} 
        scrollY={scrollY}
        blackHoleTransition={blackHoleTransition}
      />

      {/* 2. Cockpit HUD Deck */}
      <CockpitHUD 
        currentSector={currentSector} 
        setSector={triggerWarp} 
        isWarping={isWarping} 
        triggerWarp={triggerWarp} 
      />

      {/* 3. Stacked Scrolling Sectors */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%' }}>
        
        {/* Sector 0: Home */}
        <div 
          style={{
            height: '100vh', // exact 100vh to fit screen perfectly
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start', // Snap target
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getTransitionStyle(0)
          }}
        >
          <SectorHome />
        </div>

        {/* Sector 1: Projects */}
        <div 
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getTransitionStyle(1)
          }}
        >
          <SectorProjects />
        </div>

        {/* Sector 2: Skills */}
        <div 
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getTransitionStyle(2)
          }}
        >
          <SectorSkills />
        </div>

        {/* Sector 3: Contact */}
        <div 
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getTransitionStyle(3)
          }}
        >
          <SectorContact />
        </div>

      </div>

      <style>{`
        body {
          overflow: hidden !important; /* Locks browser frame to enforce the .App container scrolling snaps */
        }
      `}</style>
    </div>
  );
}

export default App;
