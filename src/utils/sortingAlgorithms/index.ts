import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import { countingSort } from './countingSort';
import { radixSort } from './radixSort';
import { bucketSort } from './bucketSort';
import { shellSort } from './shellSort';

export const sortingAlgorithms = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort,
  'Heap Sort': heapSort,
  'Counting Sort': countingSort,
  'Radix Sort': radixSort,
  'Bucket Sort': bucketSort,
  'Shell Sort': shellSort,
} as const;

export type SortingAlgorithmName = keyof typeof sortingAlgorithms;