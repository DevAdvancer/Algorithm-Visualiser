import { Step } from '../../types/algorithm';

export function binarySearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr].sort((a, b) => a - b); // Binary search requires sorted array
  
  let left = 0;
  let right = array.length - 1;
  
  steps.push({
    description: 'Starting binary search with sorted array',
    currentState: [...array],
    highlightIndices: [left, right],
  });
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      description: `Checking middle element ${array[mid]}`,
      currentState: [...array],
      highlightIndices: [mid],
    });
    
    if (array[mid] === target) {
      steps.push({
        description: `Found ${target} at index ${mid}!`,
        currentState: [...array],
        highlightIndices: [mid],
      });
      return steps;
    }
    
    if (array[mid] < target) {
      steps.push({
        description: `${target} is greater than ${array[mid]}, searching right half`,
        currentState: [...array],
        highlightIndices: [mid + 1, right],
      });
      left = mid + 1;
    } else {
      steps.push({
        description: `${target} is less than ${array[mid]}, searching left half`,
        currentState: [...array],
        highlightIndices: [left, mid - 1],
      });
      right = mid - 1;
    }
  }
  
  steps.push({
    description: `${target} not found in the array`,
    currentState: [...array],
    highlightIndices: [],
  });
  
  return steps;
}