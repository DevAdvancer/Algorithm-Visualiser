import { Step } from '../../types/algorithm';

export function insertionSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;
    
    steps.push({
      description: `Current element to insert: ${key}`,
      currentState: [...array],
      highlightIndices: [i],
    });
    
    while (j >= 0 && array[j] > key) {
      steps.push({
        description: `Moving ${array[j]} one position ahead`,
        currentState: [...array],
        highlightIndices: [j, j + 1],
      });
      
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = key;
    steps.push({
      description: `Inserted ${key} at position ${j + 1}`,
      currentState: [...array],
      highlightIndices: [j + 1],
    });
  }
  
  return steps;
}