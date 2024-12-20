import { Step } from '../../types/algorithm';

export function interpolationSearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr].sort((a, b) => a - b); // Interpolation search requires sorted array
  let low = 0;
  let high = array.length - 1;

  while (low <= high && target >= array[low] && target <= array[high]) {
    if (low === high) {
      if (array[low] === target) {
        steps.push({
          description: `Found ${target} at index ${low}!`,
          currentState: [...array],
          highlightIndices: [low],
        });
        return steps;
      }
      break;
    }

    // Probe position formula
    const pos = low + Math.floor(
      ((high - low) * (target - array[low])) / (array[high] - array[low])
    );

    steps.push({
      description: `Checking position ${pos} using interpolation formula`,
      currentState: [...array],
      highlightIndices: [pos],
    });

    if (array[pos] === target) {
      steps.push({
        description: `Found ${target} at index ${pos}!`,
        currentState: [...array],
        highlightIndices: [pos],
      });
      return steps;
    }

    if (array[pos] < target) {
      steps.push({
        description: `${target} is greater than ${array[pos]}, searching right portion`,
        currentState: [...array],
        highlightIndices: [pos + 1, high],
      });
      low = pos + 1;
    } else {
      steps.push({
        description: `${target} is less than ${array[pos]}, searching left portion`,
        currentState: [...array],
        highlightIndices: [low, pos - 1],
      });
      high = pos - 1;
    }
  }

  steps.push({
    description: `${target} not found in the array`,
    currentState: [...array],
    highlightIndices: [],
  });

  return steps;
}