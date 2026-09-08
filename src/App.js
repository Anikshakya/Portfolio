import React, { useState, useRef } from 'react';
import SpaceCanvas from './components/SpaceCanvas';
import CockpitHUD from './components/CockpitHUD';
import SectorHome from './components/SectorHome';
import SectorExperience from './components/SectorExperience';
import SectorProjects from './components/SectorProjects';
import SectorSkills from './components/SectorSkills';
import SectorContact from './components/SectorContact';

function App() {
  const [currentSector, setSector] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [blackHoleTransition, setBlackHoleTransition] = useState(null);

  const scrollContainerRef = useRef(null);
  const sectorRefs = useRef([]);

  // Monitor scroll coordinate offsets to check which sector card is centered
  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollY(scrollTop);

    if (isWarping) return;

    const viewportCenter = scrollTop + window.innerHeight / 2;
    const activeIdx = sectorRefs.current.reduce((closestIdx, sectorEl, index) => {
      if (!sectorEl) return closestIdx;

      const closestEl = sectorRefs.current[closestIdx];
      if (!closestEl) return index;

      const sectorCenter = sectorEl.offsetTop + sectorEl.offsetHeight / 2;
      const closestCenter = closestEl.offsetTop + closestEl.offsetHeight / 2;

      return Math.abs(sectorCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter)
        ? index
        : closestIdx;
    }, 0);
    if (activeIdx !== currentSector) {
      setSector(activeIdx);
    }
  };

  // Black Hole Implosion: UI spirals & collapses into a fixed, small central singularity
  const triggerWarp = (targetSectorIdx) => {
    if (isWarping || targetSectorIdx === currentSector) return;

    // Disable black hole animation on mobile view and scroll directly
    if (window.innerWidth <= 768) {
      setSector(targetSectorIdx);
      if (sectorRefs.current[targetSectorIdx]) {
        sectorRefs.current[targetSectorIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    setIsWarping(true);

    // Dynamic singularity point in viewport
    const bx = window.innerWidth * (0.35 + Math.random() * 0.3);
    const by = window.innerHeight * (0.35 + Math.random() * 0.3);

    // Start internal black hole state
    setBlackHoleTransition({ bx, by, stage: 'implode', targetSector: targetSectorIdx });

    const currentEl = sectorRefs.current[currentSector];
    const targetEl = sectorRefs.current[targetSectorIdx];
    const container = scrollContainerRef.current;

    // Fallback if ref nodes are missing
    if (!currentEl || !targetEl || !container) {
      setTimeout(() => {
        const targetScrollTop = targetEl
          ? targetEl.offsetTop
          : targetSectorIdx * window.innerHeight;
        container && container.scrollTo({ top: targetScrollTop, behavior: 'instant' });
        setSector(targetSectorIdx);
        setBlackHoleTransition(null);
        setIsWarping(false);
      }, 1000);
      return;
    }

    // Dynamic animation overlay container
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';
    overlay.style.overflow = 'hidden';
    document.body.appendChild(overlay);

    // Singularity Core Element (Kept small & concentrated)
    const holeEl = document.createElement('div');
    holeEl.style.position = 'absolute';
    holeEl.style.left = `${bx}px`;
    holeEl.style.top = `${by}px`;
    holeEl.style.width = '70px';
    holeEl.style.height = '70px';
    holeEl.style.margin = '0';
    holeEl.style.borderRadius = '50%';
    holeEl.style.transform = 'translate(-50%, -50%) scale(0)';
    holeEl.style.opacity = '1';
    holeEl.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease, box-shadow 0.4s ease';
    holeEl.style.background = 'radial-gradient(circle at 50% 50%, #000000 0%, #000000 50%, rgba(236, 72, 153, 0.9) 65%, rgba(139, 92, 246, 0.6) 80%, rgba(0, 0, 0, 0) 100%)';
    holeEl.style.zIndex = '10001';
    holeEl.style.boxShadow = '0 0 50px 15px rgba(236, 72, 153, 0.8), inset 0 0 25px 8px rgba(255, 255, 255, 0.9)';
    overlay.appendChild(holeEl);

    // Clone current sector UI to execute vortex suction
    const currRect = currentEl.getBoundingClientRect();
    const currClone = currentEl.cloneNode(true);
    currClone.style.position = 'absolute';
    currClone.style.left = `${currRect.left}px`;
    currClone.style.top = `${currRect.top}px`;
    currClone.style.width = `${currRect.width}px`;
    currClone.style.height = `${currRect.height}px`;
    currClone.style.margin = '0';
    currClone.style.boxSizing = 'border-box';
    // Spiral cubic-bezier for physical acceleration into singularity
    currClone.style.transition = 'transform 1.0s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.9s cubic-bezier(0.6, 0, 0.9, 0.2), filter 0.8s ease';
    currClone.style.transformOrigin = `${bx - currRect.left}px ${by - currRect.top}px`;
    currClone.style.filter = 'blur(0px) brightness(1)';
    overlay.appendChild(currClone);

    // Hide real underlying DOM element during suction
    currentEl.style.visibility = 'hidden';

    // Execute animation frames
    requestAnimationFrame(() => {
      // 1. Open singularity to compact fixed size
      holeEl.style.transform = 'translate(-50%, -50%) scale(2.2)';

      // 2. Vortex pull calculation: UI revolves rapidly while collapsing to origin (0,0) scale
      const deltaX = bx - (currRect.left + currRect.width / 2);
      const deltaY = by - (currRect.top + currRect.height / 2);

      currClone.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0) rotate(-1800deg)`;
      currClone.style.opacity = '0';
      currClone.style.filter = 'blur(12px) brightness(2)';
    });

    // Phase 2: Instant viewport relocation & black hole collapse
    setTimeout(() => {
      setBlackHoleTransition(prev => ({ ...prev, stage: 'scrolling' }));

      // Jump view directly behind singularity
      if (container && sectorRefs.current[targetSectorIdx]) {
        if (window.innerWidth <= 768) {
          sectorRefs.current[targetSectorIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const targetScrollTop = sectorRefs.current[targetSectorIdx].offsetTop;
          container.scrollTo({ top: targetScrollTop, behavior: 'instant' });
        }
      }
      setSector(targetSectorIdx);

      // Snap black hole shut into singularity zero point
      requestAnimationFrame(() => {
        holeEl.style.transition = 'transform 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.3s ease';
        holeEl.style.transform = 'translate(-50%, -50%) scale(0)';
        holeEl.style.opacity = '0';
      });
    }, 950);

    // Phase 3: Cleanup overlay and restore elements
    setTimeout(() => {
      try {
        overlay.remove();
      } catch (e) { }

      currentEl.style.visibility = '';
      targetEl.style.visibility = '';
      setBlackHoleTransition(null);
      setIsWarping(false);
    }, 1350);
  };

  // Compute transform states for non-cloned base sectors
  const getTransitionStyle = (idx) => {
    if (blackHoleTransition) {
      const { stage, targetSector, bx, by } = blackHoleTransition;

      if ((stage === 'implode' || stage === 'scrolling') && idx === currentSector) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = Math.round(bx - centerX);
        const dy = Math.round(by - centerY);
        return {
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(0) rotate(-1800deg)`,
          transformOrigin: `${bx}px ${by}px`,
          opacity: 0,
          filter: 'blur(12px)',
          pointerEvents: 'none',
          transition: 'transform 1.0s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.9s ease'
        };
      }

      if (stage === 'scrolling' && idx === targetSector) {
        return {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) scale(1)',
          filter: 'blur(0px)',
          pointerEvents: 'auto',
          transition: 'opacity 0.4s ease'
        };
      }

      if (idx !== currentSector && idx !== targetSector) {
        return {
          opacity: 0,
          pointerEvents: 'none'
        };
      }
    }

    // Standard standby / scrolling layout
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
        overflowY: isWarping ? 'hidden' : 'scroll',
        overflowX: 'hidden',
        position: 'relative',
        scrollBehavior: isWarping ? 'auto' : 'smooth',
        scrollSnapType: 'y mandatory'
      }}
    >
      {/* 1. Space Canvas Engine */}
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

      {/* 3. Sector Stack */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%' }}>

        {/* Sector 0: Home */}
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
            ...getTransitionStyle(0)
          }}
          ref={el => sectorRefs.current[0] = el}
        >
          <SectorHome onContactClick={() => triggerWarp(4)} />
        </div>

        {/* Sector 1: Experience */}
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
            ...getTransitionStyle(1)
          }}
          ref={el => sectorRefs.current[1] = el}
        >
          <SectorExperience />
        </div>

        {/* Sector 2: Projects */}
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
            ...getTransitionStyle(2)
          }}
          ref={el => sectorRefs.current[2] = el}
        >
          <SectorProjects />
        </div>

        {/* Sector 3: Skills */}
        <div
          className="sector-wrapper-item"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getTransitionStyle(3)
          }}
          ref={el => sectorRefs.current[3] = el}
        >
          <SectorSkills />
        </div>

        {/* Sector 4: Contact */}
        <div
          className="sector-wrapper-item"
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 max(4vw, 16px)',
            boxSizing: 'border-box',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            willChange: 'transform, opacity, filter',
            ...getTransitionStyle(4)
          }}
          ref={el => sectorRefs.current[4] = el}
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
            overflow-y: auto !important;
          }
          .sector-wrapper-item {
            height: auto !important;
            min-height: auto !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            pointer-events: auto !important;
            padding-top: 10px !important;
            padding-bottom: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;