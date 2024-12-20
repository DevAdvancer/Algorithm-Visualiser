import React from 'react';

interface SpeedSelectorProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export default function SpeedSelector({ speed, onSpeedChange }: SpeedSelectorProps) {
  return (
    <select
      value={speed}
      onChange={(e) => onSpeedChange(Number(e.target.value))}
      className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value={2000}>Slow</option>
      <option value={1000}>Normal</option>
      <option value={500}>Fast</option>
      <option value={250}>Very Fast</option>
    </select>
  );
}