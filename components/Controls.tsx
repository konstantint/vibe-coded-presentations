import React from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PRES_BEATS } from '../constants';

interface ControlsProps {
  currentId: number;
  onNext: () => void;
  onPrev: () => void;
}

const Controls: React.FC<ControlsProps> = ({ currentId, onNext, onPrev }) => {
  const progress = ((currentId + 1) / PRES_BEATS.length) * 100;

  return (
    <div className="fixed bottom-0 left-0 w-full z-20 pointer-events-auto">
      {/* Progress Line */}
      <div className="w-full h-1 bg-white/10">
        <div 
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between p-6">
        <div className="flex gap-2 text-white/50 text-sm font-mono">
          <span>[SPACE] to advance</span>
          <span className="hidden md:inline"> | [ARROWS] to nav</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onPrev}
            disabled={currentId === 0}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={onNext}
            disabled={currentId === PRES_BEATS.length - 1}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;