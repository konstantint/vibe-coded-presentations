import React, { useState, useEffect, useCallback } from 'react';
import { PRES_BEATS } from './constants';
import VisualBackground from './components/VisualBackground';
import IllustrationLayer from './components/IllustrationLayer';
import ContentOverlay from './components/ContentOverlay';
import Controls from './components/Controls';
import { Maximize, Minimize } from 'lucide-react';

const App: React.FC = () => {
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentBeat = PRES_BEATS[currentBeatIndex];

  const goNext = useCallback(() => {
    setCurrentBeatIndex(prev => Math.min(prev + 1, PRES_BEATS.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentBeatIndex(prev => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'Enter') {
        e.preventDefault(); // Prevent scrolling on Space
        goNext();
      } else if (e.code === 'ArrowLeft' || e.code === 'Backspace') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Fullscreen toggle helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden selection:bg-emerald-500/30 font-sans">
      {/* Layer 1: Global Atmospheric Particles */}
      <VisualBackground 
        mode={currentBeat.visualMode} 
        accentColor={currentBeat.highlightColor}
      />

      {/* Layer 2: Contextual Illustrations (The "Soul") */}
      <IllustrationLayer mode={currentBeat.visualMode} />

      {/* Layer 3: Typography & Content (The "Story") */}
      <ContentOverlay beat={currentBeat} />

      {/* Layer 4: UI Chrome */}
      <Controls 
        currentId={currentBeatIndex}
        onNext={goNext}
        onPrev={goPrev}
      />

      <button 
        onClick={toggleFullscreen}
        className="fixed top-6 right-6 z-30 text-white/30 hover:text-white transition-colors p-2"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_120%)]" />
    </div>
  );
};

export default App;