import { Step } from '../../types/algorithm';

export function radixSort(arr: number[]): Step[] {
  const steps: Step[] = [];
  const array = [...arr];

  function countingSortForRadix(exp: number): void {
    const output = new Array(array.length).fill(0);
    const count = new Array(10).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < array.length; i++) {
      const digit = Math.floor(array[i] / exp) % 10;
      count[digit]++;
      steps.push({
        description: `Counting digit ${digit} from number ${array[i]}`,
        currentState: [...array],
        highlightIndices: [i],
      });
    }

    // Change count[i] so that count[i] contains actual
    // position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = array.length - 1; i >= 0; i--) {
      const digit = Math.floor(array[i] / exp) % 10;
      output[count[digit] - 1] = array[i];
      count[digit]--;
      
      steps.push({
        description: `Placing ${array[i]} based on digit ${digit}`,
        currentState: [...output],
        highlightIndices: [count[digit]],
      });
    }

    // Copy the output array to array[]
    for (let i = 0; i < array.length; i++) {
      array[i] = output[i];
    }
  }

  const max = Math.max(...array);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    steps.push({
      description: `Sorting based on digit at position ${exp}`,
      currentState: [...array],
      highlightIndices: [],
    });
    countingSortForRadix(exp);
  }

  return steps;
}