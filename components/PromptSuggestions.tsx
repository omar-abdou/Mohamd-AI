
import React from 'react';

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelect: (prompt: string) => void;
}

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="p-4 bg-blue-50 border-t border-gray-200">
      <p className="text-center text-gray-600 font-semibold mb-3">أو جرب أحد هذه الأسئلة:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt)}
            className="bg-yellow-300 text-yellow-900 font-semibold p-3 rounded-lg text-center hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
