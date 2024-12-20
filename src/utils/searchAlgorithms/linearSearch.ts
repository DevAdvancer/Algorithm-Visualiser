import { Step } from '../../types/algorithm';

export function linearSearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  for (let i = 0; i < array.length; i++) {
    steps.push({
      description: `Checking if ${array[i]} equals ${target}`,
      currentState: [...array],
      highlightIndices: [i],
    });
    
    if (array[i] === target) {
      steps.push({
        description: `Found ${target} at index ${i}!`,
        currentState: [...array],
        highlightIndices: [i],
      });
      return steps;
    }
  }
  
  steps.push({
    description: `${target} not found in the array`,
    currentState: [...array],
    highlightIndices: [],
  });
  
  return steps;
}