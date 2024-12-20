export const bubbleSort = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const array = [...arr];
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        description: `Comparing ${array[j]} and ${array[j + 1]}`,
        currentState: [...array],
        highlightIndices: [j, j + 1],
      });
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          description: `Swapping ${array[j]} and ${array[j + 1]}`,
          currentState: [...array],
          highlightIndices: [j, j + 1],
        });
      }
    }
  }
  
  return steps;
};