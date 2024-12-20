import React from 'react';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800">Algorithm Visualizer</h3>
            <p className="text-gray-600 text-sm">
              A tool to help understand algorithms through visualization
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/devadvancer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Abhirup Kumar</p>
        </div>
      </div>
    </footer>
  );
}
