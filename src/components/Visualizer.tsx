import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Step } from '../types/algorithm';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';
import { searchAlgorithms } from '../utils/searchAlgorithms';
import { graphAlgorithms } from '../utils/graphAlgorithms';
import Controls from './Controls';
import ArrayInput from './ArrayInput';
import Footer from './Footer';
import AlgorithmSelector from './AlgorithmSelector';
import SpeedSelector from './SpeedSelector';
import ArrayVisualizer from './ArrayVisualizer';
import GraphVisualizer from './GraphVisualizer';
import { Graph, GraphStep } from '../types/graph';

type AlgorithmCategory = 'sorting' | 'searching' | 'graph';

const sampleGraph: Graph = {
  nodes: [
    { id: 'A', x: 100, y: 100 },
    { id: 'B', x: 300, y: 100 },
    { id: 'C', x: 500, y: 100 },
    { id: 'D', x: 100, y: 300 },
    { id: 'E', x: 300, y: 300 },
    { id: 'F', x: 500, y: 300 },
  ],
  edges: [
    { source: 'A', target: 'B', weight: 4 },
    { source: 'B', target: 'C', weight: 3 },
    { source: 'A', target: 'D', weight: 5 },
    { source: 'B', target: 'E', weight: 2 },
    { source: 'C', target: 'F', weight: 6 },
    { source: 'D', target: 'E', weight: 4 },
    { source: 'E', target: 'F', weight: 3 },
  ],
};

export default function Visualizer() {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = useState<(Step | GraphStep)[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [category, setCategory] = useState<AlgorithmCategory>('sorting');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('Bubble Sort');
  const [searchTarget, setSearchTarget] = useState<number>(25);
  const [speed, setSpeed] = useState<number>(1000);
  const [graph, setGraph] = useState<Graph>(sampleGraph);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleCustomArray = (newArray: number[]) => {
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(nextStep, speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, steps.length]);

  const startVisualization = () => {
    let visualizationSteps;
    
    switch (category) {
      case 'sorting':
        visualizationSteps = sortingAlgorithms[selectedAlgorithm as keyof typeof sortingAlgorithms](array);
        break;
      case 'searching':
        visualizationSteps = searchAlgorithms[selectedAlgorithm as keyof typeof searchAlgorithms](array, searchTarget);
        break;
      case 'graph':
        const algorithm = graphAlgorithms[selectedAlgorithm as keyof typeof graphAlgorithms];
        if (selectedAlgorithm.includes('Ford-Fulkerson')) {
          visualizationSteps = algorithm(graph, 'A', 'F'); // Example source and sink nodes
        } else {
          visualizationSteps = algorithm(graph);
        }
        break;
    }
      
    setSteps(visualizationSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-4">Algorithm Visualizer</h1>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <select
                  value={category}
                  onChange={(e) => {
                    const newCategory = e.target.value as AlgorithmCategory;
                    setCategory(newCategory);
                    setSelectedAlgorithm(
                      newCategory === 'sorting' ? 'Bubble Sort' : 
                      newCategory === 'searching' ? 'Linear Search' :
                      'Kruskal\'s Algorithm (MST)'
                    );
                  }}
                  className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sorting">Sorting</option>
                  <option value="searching">Searching</option>
                  <option value="graph">Graph</option>
                </select>

                <AlgorithmSelector
                  category={category}
                  selectedAlgorithm={selectedAlgorithm}
                  onAlgorithmChange={setSelectedAlgorithm}
                />
                
                {category === 'searching' && (
                  <input
                    type="number"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(Number(e.target.value))}
                    placeholder="Search target"
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                
                {category !== 'graph' && (
                  <button
                    onClick={generateRandomArray}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Random Array
                  </button>
                )}
                
                <button
                  onClick={startVisualization}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Start Visualization
                </button>
                
                <SpeedSelector speed={speed} onSpeedChange={setSpeed} />
              </div>

              {category !== 'graph' && <ArrayInput onArraySubmit={handleCustomArray} />}

              {category === 'graph' ? (
                <GraphVisualizer
                  graph={graph}
                  currentStep={steps[currentStep] as GraphStep}
                />
              ) : (
                <ArrayVisualizer
                  currentStep={steps[currentStep] as Step}
                  array={array}
                />
              )}

              <Controls
                isPlaying={isPlaying}
                currentStep={currentStep}
                totalSteps={steps.length}
                onPlay={() => setIsPlaying(!isPlaying)}
                onPrevious={previousStep}
                onNext={nextStep}
              />

              <div className="text-center">
                <p className="text-gray-600">
                  {steps[currentStep]?.description || 'Click "Start Visualization" to begin'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}