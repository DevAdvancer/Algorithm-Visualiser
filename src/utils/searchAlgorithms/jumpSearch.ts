import { Step } from '../../types/algorithm';

export function jumpSearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr].sort((a, b) => a - b); // Jump search requires sorted array
  
  const n = array.length;
  const step = Math.floor(Math.sqrt(n));
  
  steps.push({
    description: `Starting jump search with step size ${step}`,
    currentState: [...array],
    highlightIndices: [],
  });
  
  let prev = 0;
  let jump = step;
  
  // Finding the block where element is present (if it exists)
  while (jump < n && array[Math.min(jump, n) - 1] < target) {
    steps.push({
      description: `Jumping to index ${jump}`,
      currentState: [...array],
      highlightIndices: [prev, jump],
    });
    
    prev = jump;
    jump += step;
  }
  
  // Doing linear search for target in block beginning with prev
  while (prev < Math.min(jump, n)) {
    steps.push({
      description: `Checking element ${array[prev]}`,
      currentState: [...array],
      highlightIndices: [prev],
    });
    
    if (array[prev] === target) {
      steps.push({
        description: `Found ${target} at index ${prev}!`,
        currentState: [...array],
        highlightIndices: [prev],
      });
      return steps;
    }
    prev++;
  }
  
  steps.push({
    description: `${target} not found in the array`,
    currentState: [...array],
    highlightIndices: [],
  });
  
  return steps;
}