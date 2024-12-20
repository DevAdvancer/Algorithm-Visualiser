import { Graph, GraphStep, GraphEdge } from '../../types/graph';

export function primMST(graph: Graph): GraphStep[] {
  const steps: GraphStep[] = [];
  const mst: GraphEdge[] = [];
  const visited = new Set<string>();
  const pq: [number, string, GraphEdge | null][] = [];

  // Start with the first node
  const startNode = graph.nodes[0].id;
  visited.add(startNode);
  
  // Add all edges from start node to priority queue
  graph.edges
    .filter(edge => edge.source === startNode)
    .forEach(edge => {
      pq.push([edge.weight, edge.target, edge]);
    });

  steps.push({
    description: `Starting Prim's Algorithm from node ${startNode}`,
    currentState: [],
    highlightIndices: [],
    highlightedNodes: [startNode],
    highlightedEdges: [],
    mst: []
  });

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [weight, node, edge] = pq.shift()!;

    if (visited.has(node)) continue;

    if (edge) {
      mst.push(edge);
      steps.push({
        description: `Adding edge ${edge.source}-${edge.target} to MST`,
        currentState: [],
        highlightIndices: [],
        highlightedNodes: [edge.source, edge.target],
        highlightedEdges: [edge],
        mst: [...mst]
      });
    }

    visited.add(node);

    // Add all edges from current node to priority queue
    graph.edges
      .filter(e => (e.source === node || e.target === node) && 
                   !visited.has(e.source === node ? e.target : e.source))
      .forEach(e => {
        const nextNode = e.source === node ? e.target : e.source;
        pq.push([e.weight, nextNode, e]);
      });

    steps.push({
      description: `Visiting node ${node}`,
      currentState: [],
      highlightIndices: [],
      highlightedNodes: Array.from(visited),
      highlightedEdges: mst,
      mst: [...mst]
    });
  }

  return steps;
}