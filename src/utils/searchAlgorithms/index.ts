import { linearSearch } from './linearSearch';
import { binarySearch } from './binarySearch';
import { exponentialSearch } from './exponentialSearch';
import { fibonacciSearch } from './fibonacciSearch';
import { interpolationSearch } from './interpolationSearch';
import { jumpSearch } from './jumpSearch';
import { ternarySearch } from './ternarySearch';

export const searchAlgorithms = {
  'Linear Search': linearSearch,
  'Binary Search': binarySearch,
  'Exponential Search': exponentialSearch,
  'Fibonacci Search': fibonacciSearch,
  'Interpolation Search': interpolationSearch,
  'Jump Search': jumpSearch,
  'Ternary Search': ternarySearch,
} as const;

export type SearchAlgorithmName = keyof typeof searchAlgorithms;