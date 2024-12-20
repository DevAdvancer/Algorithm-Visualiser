import React, { useEffect, useRef } from 'react';
import { Graph, GraphStep } from '../types/graph';

interface GraphVisualizerProps {
  graph: Graph;
  currentStep: GraphStep | null;
}

export default function GraphVisualizer({ graph, currentStep }: GraphVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    graph.edges.forEach(edge => {
      const source = graph.nodes.find(n => n.id === edge.source)!;
      const target = graph.nodes.find(n => n.id === edge.target)!;

      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      
      const isHighlighted = currentStep?.highlightedEdges.some(
        e => e.source === edge.source && e.target === edge.target
      );
      const isMST = currentStep?.mst?.some(
        e => e.source === edge.source && e.target === edge.target
      );

      ctx.strokeStyle = isMST ? '#22c55e' : isHighlighted ? '#eab308' : '#94a3b8';
      ctx.lineWidth = isHighlighted || isMST ? 3 : 1;
      ctx.stroke();

      // Draw weight
      const midX = (source.x + target.x) / 2;
      const midY = (source.y + target.y) / 2;
      ctx.fillStyle = '#1e293b';
      ctx.font = '12px sans-serif';
      ctx.fillText(edge.weight.toString(), midX, midY);

      if (edge.flow !== undefined) {
        ctx.fillText(`${edge.flow}/${edge.weight}`, midX, midY + 15);
      }
    });

    // Draw nodes
    graph.nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      
      const isHighlighted = currentStep?.highlightedNodes.includes(node.id);
      ctx.fillStyle = isHighlighted ? '#eab308' : '#ffffff';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      
      ctx.fill();
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = '#1e293b';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);
    });
  }, [graph, currentStep]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border rounded-lg shadow-md bg-white"
    />
  );
}