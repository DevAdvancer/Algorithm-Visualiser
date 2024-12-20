import React from 'react';
import { Step } from '../types/algorithm';

interface ArrayVisualizerProps {
  currentStep: Step | null;
  array: number[];
}

export default function ArrayVisualizer({ currentStep, array }: ArrayVisualizerProps) {
  const displayArray = currentStep?.currentState || array;
  
  return (
    <div className="flex justify-center items-end h-64 gap-2">
      {displayArray.map((value, index) => (
        <div
          key={index}
          style={{ height: `${value * 2}px` }}
          className={`w-8 ${
            currentStep?.highlightIndices.includes(index)
              ? 'bg-yellow-400'
              : 'bg-blue-500'
          } rounded-t transition-all duration-300`}
        />
      ))}
    </div>
  );
}