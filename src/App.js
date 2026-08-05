import React, { useState } from 'react';
import SpaceCanvas from './components/SpaceCanvas';
import CockpitHUD from './components/CockpitHUD';
import SectorHome from './components/SectorHome';
import SectorProjects from './components/SectorProjects';
import SectorSkills from './components/SectorSkills';
import SectorContact from './components/SectorContact';

function App() {
  const [currentSector, setSector] = useState(0);
  const [renderSector, setRenderSector] = useState(0); // sector actually rendered (handles delaying until mid-warp)
  const [isWarping, setIsWarping] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(1);

  // Warp transitions: Acceleration -> Sector Swap -> Deceleration
  const triggerWarp = (targetSectorIdx) => {
    if (isWarping) return;
    setIsWarping(true);
    setCardOpacity(0); // Fade out active sector card

    // Step 1: Ramp up warp speed, swap sector card mid-way
    setTimeout(() => {
      setSector(targetSectorIdx);
      setRenderSector(targetSectorIdx);
    }, 700);

    // Step 2: Exit warp speed and fade in new card
    setTimeout(() => {
      setIsWarping(false);
      setCardOpacity(1);
    }, 1500);
  };

  const renderActiveSector = () => {
    switch (renderSector) {
      case 0:
        return <SectorHome />;
      case 1:
        return <SectorProjects />;
      case 2:
        return <SectorSkills />;
      case 3:
        return <SectorContact />;
      default:
        return <SectorHome />;
    }
  };

  return (
    <div 
      className="App" 
      style={{
        minHeight: '100vh',
        backgroundColor: '#020208',
        color: '#e2e8f0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* 1. HTML5 Space Background Engine */}
      <SpaceCanvas currentSector={currentSector} isWarping={isWarping} />

      {/* 2. Cockpit HUD Instrumentation Deck */}
      <CockpitHUD 
        currentSector={currentSector} 
        setSector={triggerWarp} 
        isWarping={isWarping} 
        triggerWarp={triggerWarp} 
      />

      {/* 3. Scrolling/Floating Holographic Card Container */}
      <div 
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          zIndex: 5,
          position: 'relative',
          paddingLeft: 'max(4vw, 16px)',
          opacity: cardOpacity,
          transform: `translateY(${cardOpacity === 1 ? '0' : '12px'})`,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isWarping ? 'none' : 'auto'
        }}
      >
        {renderActiveSector()}
      </div>

      {/* Aesthetic Starship overlay filters */}
      <style>{`
        body {
          overflow: hidden !important; /* Locks browser default scroll to preserve Cockpit HUD coordinates */
        }
        .App {
          height: 100vh;
          width: 100vw;
          overflow-y: auto;
          overflow-x: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

export default App;
