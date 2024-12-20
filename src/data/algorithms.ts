import { Algorithm } from '../types/algorithm';

export const algorithms: Algorithm[] = [
  {
    name: 'Bubble Sort',
    type: 'sorting',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Binary Search',
    type: 'searching',
    description: 'Search algorithm that finds the position of a target value within a sorted array.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
  // Add more algorithms as needed
];