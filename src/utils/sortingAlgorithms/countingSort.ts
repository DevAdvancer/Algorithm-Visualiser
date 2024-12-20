import { Step } from '../../types/algorithm';

export function countingSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(array.length);
  
  // Store count of each element
  for (let i = 0; i < array.length; i++) {
    count[array[i] - min]++;
    steps.push({
      description: `Counting occurrences of ${array[i]}`,
      currentState: [...array],
      highlightIndices: [i],
    });
  }
  
  // Modify count array to contain actual positions
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = array.length - 1; i >= 0; i--) {
    output[count[array[i] - min] - 1] = array[i];
    count[array[i] - min]--;
    
    steps.push({
      description: `Placing ${array[i]} in its sorted position`,
      currentState: [...output],
      highlightIndices: [count[array[i] - min]],
    });
  }
  
  // Copy output array to original array
  for (let i = 0; i < array.length; i++) {
    array[i] = output[i];
  }
  
  return steps;
}