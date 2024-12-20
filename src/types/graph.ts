export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  flow?: number;
  capacity?: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphStep extends Step {
  highlightedNodes: string[];
  highlightedEdges: GraphEdge[];
  mst?: GraphEdge[];
  maxFlow?: number;
  distances?: { [key: string]: number };
}