import { Step } from '../../types/algorithm';

export function heapSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];

  function heapify(n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    steps.push({
      description: `Heapifying subtree rooted at index ${i}`,
      currentState: [...array],
      highlightIndices: [i, left, right].filter(x => x < n),
    });

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      steps.push({
        description: `Swapping ${array[i]} with ${array[largest]}`,
        currentState: [...array],
        highlightIndices: [i, largest],
      });

      [array[i], array[largest]] = [array[largest], array[i]];
      heapify(n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array.length, i);
  }

  // Extract elements from heap one by one
  for (let i = array.length - 1; i > 0; i--) {
    steps.push({
      description: `Moving current root ${array[0]} to end`,
      currentState: [...array],
      highlightIndices: [0, i],
    });

    [array[0], array[i]] = [array[i], array[0]];
    heapify(i, 0);
  }

  return steps;
}