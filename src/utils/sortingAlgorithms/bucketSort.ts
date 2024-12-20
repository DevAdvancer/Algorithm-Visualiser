import { Step } from '../../types/algorithm';

export function bucketSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  
  const n = array.length;
  const buckets: number[][] = Array.from({ length: n }, () => []);
  
  // Find range of input array
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = (max - min) / n;
  
  // Put array elements in different buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.floor((array[i] - min) / range);
    
    // Handle edge case for the maximum element
    const idx = bucketIndex === n ? n - 1 : bucketIndex;
    buckets[idx].push(array[i]);
    
    steps.push({
      description: `Placing ${array[i]} in bucket ${idx}`,
      currentState: [...array],
      highlightIndices: [i],
    });
  }
  
  // Sort individual buckets
  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b);
    
    if (buckets[i].length > 0) {
      steps.push({
        description: `Sorting bucket ${i}`,
        currentState: [...array],
        highlightIndices: [],
      });
    }
  }
  
  // Concatenate all buckets into array
  let index = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      array[index] = buckets[i][j];
      
      steps.push({
        description: `Moving ${buckets[i][j]} from bucket ${i} to final position`,
        currentState: [...array],
        highlightIndices: [index],
      });
      
      index++;
    }
  }
  
  return steps;
}