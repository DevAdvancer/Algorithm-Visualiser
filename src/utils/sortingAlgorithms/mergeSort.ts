import { Step } from '../../types/algorithm';

export function mergeSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  function merge(left: number, mid: number, right: number): void {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArray.length && j < rightArray.length) {
      steps.push({
        description: `Comparing ${leftArray[i]} and ${rightArray[j]}`,
        currentState: [...array],
        highlightIndices: [left + i, mid + 1 + j],
      });
      
      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        i++;
      } else {
        array[k] = rightArray[j];
        j++;
      }
      k++;
      
      steps.push({
        description: 'Merging arrays',
        currentState: [...array],
        highlightIndices: [k - 1],
      });
    }
    
    while (i < leftArray.length) {
      array[k] = leftArray[i];
      steps.push({
        description: `Adding remaining element ${leftArray[i]}`,
        currentState: [...array],
        highlightIndices: [k],
      });
      i++;
      k++;
    }
    
    while (j < rightArray.length) {
      array[k] = rightArray[j];
      steps.push({
        description: `Adding remaining element ${rightArray[j]}`,
        currentState: [...array],
        highlightIndices: [k],
      });
      j++;
      k++;
    }
  }
  
  function mergeSortHelper(left: number, right: number): void {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        description: `Dividing array into two parts at index ${mid}`,
        currentState: [...array],
        highlightIndices: [left, mid, right],
      });
      
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }
  
  mergeSortHelper(0, array.length - 1);
  return steps;
}