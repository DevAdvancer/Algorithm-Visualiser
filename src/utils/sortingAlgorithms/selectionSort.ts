import { Step } from '../../types/algorithm';

export function selectionSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    
    steps.push({
      description: `Finding minimum element starting from index ${i}`,
      currentState: [...array],
      highlightIndices: [i],
    });
    
    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        description: `Comparing ${array[j]} with current minimum ${array[minIndex]}`,
        currentState: [...array],
        highlightIndices: [minIndex, j],
      });
      
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      steps.push({
        description: `Swapping ${array[i]} with minimum value ${array[minIndex]}`,
        currentState: [...array],
        highlightIndices: [i, minIndex],
      });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  
  return steps;
}