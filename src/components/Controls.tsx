import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Controls({
  isPlaying,
  currentStep,
  totalSteps,
  onPlay,
  onPrevious,
  onNext,
}: ControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center gap-4">
        <button
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        <button
          onClick={onPlay}
          className="p-2 rounded hover:bg-gray-100"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Step {totalSteps ? currentStep + 1 : 0} of {totalSteps}
        </p>
      </div>
    </div>
  );
}