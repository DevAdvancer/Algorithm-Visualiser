import { kruskalMST } from './kruskal';
import { primMST } from './prim';
import { fordFulkerson } from './fordFulkerson';
import { floydWarshall } from './floydWarshall';

export const graphAlgorithms = {
  'Kruskal\'s Algorithm (MST)': kruskalMST,
  'Prim\'s Algorithm (MST)': primMST,
  'Ford-Fulkerson (Max Flow)': fordFulkerson,
  'Floyd-Warshall (All-Pairs Shortest Path)': floydWarshall,
} as const;

export type GraphAlgorithmName = keyof typeof graphAlgorithms;