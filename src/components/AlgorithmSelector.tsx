import React from 'react';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';
import { searchAlgorithms } from '../utils/searchAlgorithms';
import { graphAlgorithms } from '../utils/graphAlgorithms';

interface AlgorithmSelectorProps {
  category: 'sorting' | 'searching' | 'graph';
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
}

export default function AlgorithmSelector({
  category,
  selectedAlgorithm,
  onAlgorithmChange,
}: AlgorithmSelectorProps) {
  const algorithms = 
    category === 'sorting' ? sortingAlgorithms :
    category === 'searching' ? searchAlgorithms :
    graphAlgorithms;

  return (
    <select
      value={selectedAlgorithm}
      onChange={(e) => onAlgorithmChange(e.target.value)}
      className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {Object.keys(algorithms).map((algo) => (
        <option key={algo} value={algo}>
          {algo}
        </option>
      ))}
    </select>
  );
}