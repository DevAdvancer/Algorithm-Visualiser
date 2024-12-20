import { Graph, GraphStep } from '../../types/graph';

export function floydWarshall(graph: Graph): GraphStep[] {
  const steps: GraphStep[] = [];
  const n = graph.nodes.length;
  const dist: number[][] = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  const next: number[][] = Array(n).fill(0).map(() => Array(n).fill(-1));

  // Initialize distances and next array
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  // Create node index mapping
  const nodeIndex = new Map<string, number>();
  graph.nodes.forEach((node, index) => {
    nodeIndex.set(node.id, index);
  });

  // Initialize with direct edges
  graph.edges.forEach(edge => {
    const i = nodeIndex.get(edge.source)!;
    const j = nodeIndex.get(edge.target)!;
    dist[i][j] = edge.weight;
    next[i][j] = j;
  });

  steps.push({
    description: 'Starting Floyd-Warshall Algorithm',
    currentState: [],
    highlightIndices: [],
    highlightedNodes: [],
    highlightedEdges: [],
    distances: Object.fromEntries(
      graph.nodes.map(node => [node.id, 
        Object.fromEntries(graph.nodes.map(target => [
          target.id, 
          dist[nodeIndex.get(node.id)!][nodeIndex.get(target.id)!]
        ]))
      ])
    )
  });

  // Floyd-Warshall algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];

          steps.push({
            description: `Updated shortest path from ${graph.nodes[i].id} to ${graph.nodes[j].id} through ${graph.nodes[k].id}`,
            currentState: [],
            highlightIndices: [],
            highlightedNodes: [graph.nodes[i].id, graph.nodes[j].id, graph.nodes[k].id],
            highlightedEdges: [],
            distances: Object.fromEntries(
              graph.nodes.map(node => [node.id, 
                Object.fromEntries(graph.nodes.map(target => [
                  target.id, 
                  dist[nodeIndex.get(node.id)!][nodeIndex.get(target.id)!]
                ]))
              ])
            )
          });
        }
      }
    }
  }

  return steps;
}