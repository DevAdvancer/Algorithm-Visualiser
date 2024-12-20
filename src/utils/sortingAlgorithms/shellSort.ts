import { Step } from '../../types/algorithm';

export function shellSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  const n = array.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push({
      description: `Using gap of size ${gap}`,
      currentState: [...array],
      highlightIndices: [],
    });
    
    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j;
      
      steps.push({
        description: `Comparing elements with gap ${gap}`,
        currentState: [...array],
        highlightIndices: [i],
      });
      
      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
        steps.push({
          description: `Moving element ${array[j - gap]} up by ${gap} positions`,
          currentState: [...array],
          highlightIndices: [j, j - gap],
        });
      }
      
      // Put temp in its correct location
      array[j] = temp;
      if (j !== i) {
        steps.push({
          description: `Placing ${temp} at position ${j}`,
          currentState: [...array],
          highlightIndices: [j],
        });
      }
    }
  }
  
  return steps;
}