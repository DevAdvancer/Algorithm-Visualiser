import { Step } from '../../types/algorithm';

export function quickSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  function partition(low: number, high: number): number {
    const pivot = array[high];
    let i = low - 1;
    
    steps.push({
      description: `Choosing pivot: ${pivot}`,
      currentState: [...array],
      highlightIndices: [high],
    });
    
    for (let j = low; j < high; j++) {
      steps.push({
        description: `Comparing ${array[j]} with pivot ${pivot}`,
        currentState: [...array],
        highlightIndices: [j, high],
      });
      
      if (array[j] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        if (i !== j) {
          steps.push({
            description: `Swapping ${array[i]} and ${array[j]}`,
            currentState: [...array],
            highlightIndices: [i, j],
          });
        }
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      description: `Placing pivot ${pivot} in its correct position`,
      currentState: [...array],
      highlightIndices: [i + 1, high],
    });
    
    return i + 1;
  }
  
  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }
  
  quickSortHelper(0, array.length - 1);
  return steps;
}