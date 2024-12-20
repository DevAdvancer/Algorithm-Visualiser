import { Graph, GraphStep, GraphEdge } from '../../types/graph';

function bfs(
  graph: Graph,
  source: string,
  sink: string,
  residualGraph: Map<string, Map<string, number>>
): [string[], Map<string, string>] {
  const visited = new Set<string>();
  const parent = new Map<string, string>();
  const queue: string[] = [source];
  visited.add(source);

  while (queue.length > 0) {
    const u = queue.shift()!;
    
    for (const [v, capacity] of residualGraph.get(u)!.entries()) {
      if (!visited.has(v) && capacity > 0) {
        parent.set(v, u);
        visited.add(v);
        queue.push(v);
        
        if (v === sink) {
          const path: string[] = [];
          let current = sink;
          while (current !== source) {
            path.unshift(current);
            current = parent.get(current)!;
          }
          path.unshift(source);
          return [path, parent];
        }
      }
    }
  }

  return [[], parent];
}

export function fordFulkerson(graph: Graph, source: string, sink: string): GraphStep[] {
  const steps: GraphStep[] = [];
  let maxFlow = 0;

  // Create residual graph
  const residualGraph = new Map<string, Map<string, number>>();
  graph.nodes.forEach(node => {
    residualGraph.set(node.id, new Map());
  });
  
  graph.edges.forEach(edge => {
    residualGraph.get(edge.source)!.set(edge.target, edge.weight);
    residualGraph.get(edge.target)!.set(edge.source, 0);
  });

  steps.push({
    description: 'Starting Ford-Fulkerson Algorithm',
    currentState: [],
    highlightIndices: [],
    highlightedNodes: [source, sink],
    highlightedEdges: [],
    maxFlow: 0
  });

  while (true) {
    const [path, parent] = bfs(graph, source, sink, residualGraph);
    if (path.length === 0) break;

    // Find minimum residual capacity along the path
    let pathFlow = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      pathFlow = Math.min(pathFlow, residualGraph.get(u)!.get(v)!);
    }

    // Update residual capacities
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      residualGraph.get(u)!.set(v, residualGraph.get(u)!.get(v)! - pathFlow);
      residualGraph.get(v)!.set(u, residualGraph.get(v)!.get(u)! + pathFlow);
    }

    maxFlow += pathFlow;

    steps.push({
      description: `Found augmenting path with flow ${pathFlow}`,
      currentState: [],
      highlightIndices: [],
      highlightedNodes: path,
      highlightedEdges: path.slice(0, -1).map((node, i) => ({
        source: node,
        target: path[i + 1],
        weight: pathFlow,
        flow: pathFlow
      })),
      maxFlow
    });
  }

  return steps;
}