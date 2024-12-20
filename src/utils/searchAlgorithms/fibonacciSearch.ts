import { Step } from '../../types/algorithm';

export function fibonacciSearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr].sort((a, b) => a - b); // Fibonacci search requires sorted array
  const n = array.length;

  // Initialize Fibonacci numbers
  let fibM2 = 0; // (m-2)'th Fibonacci number
  let fibM1 = 1; // (m-1)'th Fibonacci number
  let fibM = fibM2 + fibM1; // m'th Fibonacci number

  // Find the smallest Fibonacci number greater than or equal to n
  while (fibM < n) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM2 + fibM1;
  }

  let offset = -1;

  while (fibM > 1) {
    const i = Math.min(offset + fibM2, n - 1);

    steps.push({
      description: `Comparing ${array[i]} with ${target}`,
      currentState: [...array],
      highlightIndices: [i],
    });

    if (array[i] < target) {
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      offset = i;
      steps.push({
        description: `${target} is greater than ${array[i]}, moving right`,
        currentState: [...array],
        highlightIndices: [i + 1, Math.min(offset + fibM2, n - 1)],
      });
    } else if (array[i] > target) {
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;
      steps.push({
        description: `${target} is less than ${array[i]}, moving left`,
        currentState: [...array],
        highlightIndices: [offset + 1, i - 1],
      });
    } else {
      steps.push({
        description: `Found ${target} at index ${i}!`,
        currentState: [...array],
        highlightIndices: [i],
      });
      return steps;
    }
  }

  // Check last element
  if (fibM1 && array[offset + 1] === target) {
    steps.push({
      description: `Found ${target} at index ${offset + 1}!`,
      currentState: [...array],
      highlightIndices: [offset + 1],
    });
    return steps;
  }

  steps.push({
    description: `${target} not found in the array`,
    currentState: [...array],
    highlightIndices: [],
  });

  return steps;
}