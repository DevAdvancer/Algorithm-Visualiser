import { Step } from '../../types/algorithm';

export function exponentialSearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr].sort((a, b) => a - b); // Exponential search requires sorted array
  const n = array.length;

  if (array[0] === target) {
    steps.push({
      description: `Found ${target} at index 0!`,
      currentState: [...array],
      highlightIndices: [0],
    });
    return steps;
  }

  // Find range for binary search
  let i = 1;
  while (i < n && array[i] <= target) {
    steps.push({
      description: `Checking bound at index ${i}`,
      currentState: [...array],
      highlightIndices: [i],
    });
    i *= 2;
  }

  // Perform binary search
  let left = i / 2;
  let right = Math.min(i, n - 1);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({
      description: `Binary search: checking index ${mid}`,
      currentState: [...array],
      highlightIndices: [mid],
    });

    if (array[mid] === target) {
      steps.push({
        description: `Found ${target} at index ${mid}!`,
        currentState: [...array],
        highlightIndices: [mid],
      });
      return steps;
    }

    if (array[mid] < target) {
      steps.push({
        description: `${target} is greater than ${array[mid]}, searching right half`,
        currentState: [...array],
        highlightIndices: [mid + 1, right],
      });
      left = mid + 1;
    } else {
      steps.push({
        description: `${target} is less than ${array[mid]}, searching left half`,
        currentState: [...array],
        highlightIndices: [left, mid - 1],
      });
      right = mid - 1;
    }
  }

  steps.push({
    description: `${target} not found in the array`,
    currentState: [...array],
    highlightIndices: [],
  });

  return steps;
}