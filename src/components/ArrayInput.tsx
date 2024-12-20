import React, { useState } from 'react';

interface ArrayInputProps {
  onArraySubmit: (arr: number[]) => void;
}

export default function ArrayInput({ onArraySubmit }: ArrayInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse the input string into an array of numbers
      const numbers = input.split(',').map(num => {
        const parsed = parseInt(num.trim(), 10);
        if (isNaN(parsed)) throw new Error('Invalid number');
        return parsed;
      });

      if (numbers.length < 2) {
        setError('Please enter at least 2 numbers');
        return;
      }

      if (numbers.length > 20) {
        setError('Please enter no more than 20 numbers');
        return;
      }

      setError('');
      onArraySubmit(numbers);
      setInput('');
    } catch (err) {
      setError('Please enter valid numbers separated by commas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-2">
        <label htmlFor="array-input" className="text-sm font-medium text-gray-700">
          Custom Array Input
        </label>
        <div className="flex gap-2">
          <input
            id="array-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter numbers separated by commas (e.g., 5,2,8,1,9)"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set Array
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </form>
  );
}