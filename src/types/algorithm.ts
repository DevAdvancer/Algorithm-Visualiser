export type AlgorithmType = 'sorting' | 'searching' | 'graph' | 'tree';

export interface Algorithm {
  name: string;
  type: AlgorithmType;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface Step {
  description: string;
  currentState: number[];
  highlightIndices: number[];
}