import { Step } from '../../types/algorithm';

export function ternarySearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr].sort((a, b) => a - b); // Ternary search requires sorted array
  
  let left = 0;
  let right = array.length - 1;
  
  steps.push({
    description: 'Starting ternary search with sorted array',
    currentState: [...array],
    highlightIndices: [left, right],
  });
  
  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    steps.push({
      description: `Checking partition points ${array[mid1]} and ${array[mid2]}`,
      currentState: [...array],
      highlightIndices: [mid1, mid2],
    });
    
    if (array[mid1] === target) {
      steps.push({
        description: `Found ${target} at index ${mid1}!`,
        currentState: [...array],
        highlightIndices: [mid1],
      });
      return steps;
    }
    
    if (array[mid2] === target) {
      steps.push({
        description: `Found ${target} at index ${mid2}!`,
        currentState: [...array],
        highlightIndices: [mid2],
      });
      return steps;
    }
    
    if (target < array[mid1]) {
      steps.push({
        description: `${target} is less than ${array[mid1]}, searching first third`,
        currentState: [...array],
        highlightIndices: [left, mid1 - 1],
      });
      right = mid1 - 1;
    } else if (target > array[mid2]) {
      steps.push({
        description: `${target} is greater than ${array[mid2]}, searching last third`,
        currentState: [...array],
        highlightIndices: [mid2 + 1, right],
      });
      left = mid2 + 1;
    } else {
      steps.push({
        description: `${target} is between ${array[mid1]} and ${array[mid2]}, searching middle third`,
        currentState: [...array],
        highlightIndices: [mid1 + 1, mid2 - 1],
      });
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }
  
  steps.push({
    description: `${target} not found in the array`,
    currentState: [...array],
    highlightIndices: [],
  });
  
  return steps;
}