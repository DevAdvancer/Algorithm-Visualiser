import { Graph, GraphStep } from '../../types/graph';

class UnionFind {
  private parent: { [key: string]: string };
  private rank: { [key: string]: number };

  constructor(nodes: string[]) {
    this.parent = {};
    this.rank = {};
    nodes.forEach(node => {
      this.parent[node] = node;
      this.rank[node] = 0;
    });
  }

  find(node: string): string {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  union(node1: string, node2: string): void {
    const root1 = this.find(node1);
    const root2 = this.find(node2);

    if (root1 !== root2) {
      if (this.rank[root1] < this.rank[root2]) {
        this.parent[root1] = root2;
      } else if (this.rank[root1] > this.rank[root2]) {
        this.parent[root2] = root1;
      } else {
        this.parent[root2] = root1;
        this.rank[root1]++;
      }
    }
  }
}

export function kruskalMST(graph: Graph): GraphStep[] {
  const steps: GraphStep[] = [];
  const mst: GraphEdge[] = [];
  const sortedEdges = [...graph.edges].sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(graph.nodes.map(node => node.id));

  steps.push({
    description: 'Starting Kruskal\'s Algorithm',
    currentState: [],
    highlightIndices: [],
    highlightedNodes: [],
    highlightedEdges: [],
    mst: []
  });

  for (const edge of sortedEdges) {
    const sourceRoot = uf.find(edge.source);
    const targetRoot = uf.find(edge.target);

    steps.push({
      description: `Examining edge ${edge.source}-${edge.target} with weight ${edge.weight}`,
      currentState: [],
      highlightIndices: [],
      highlightedNodes: [edge.source, edge.target],
      highlightedEdges: [edge],
      mst: [...mst]
    });

    if (sourceRoot !== targetRoot) {
      mst.push(edge);
      uf.union(edge.source, edge.target);

      steps.push({
        description: `Adding edge ${edge.source}-${edge.target} to MST`,
        currentState: [],
        highlightIndices: [],
        highlightedNodes: [edge.source, edge.target],
        highlightedEdges: [edge],
        mst: [...mst]
      });
    } else {
      steps.push({
        description: `Skipping edge ${edge.source}-${edge.target} to avoid cycle`,
        currentState: [],
        highlightIndices: [],
        highlightedNodes: [],
        highlightedEdges: [],
        mst: [...mst]
      });
    }
  }

  return steps;
}