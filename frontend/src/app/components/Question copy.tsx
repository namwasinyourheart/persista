"use client"

import React, { useState } from 'react';

type QuestionType = 'single' | 'multiple' | 'truefalse' | 'match' | 'fill' | 'short';

interface QuestionProps {
  id: number;
  type: QuestionType;
  question: string;
  options?: Record<string, string>;
  pairs?: { country: string, capital: string }[];
  answer?: string;
  answers?: string[];
  handleAnswer: (id: number, answers: string[]) => void;
}

const Question: React.FC<QuestionProps> = ({ id, type, question, options, pairs, answer, answers = [], handleAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(answers);

  const handleOptionChange = (option: string) => {
    if (type === 'multiple') {
      setSelectedOptions(prev => {
        if (prev.includes(option)) {
          return prev.filter(o => o !== option);
        }
        return [...prev, option];
      });
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptions([e.target.value]);
  };

  React.useEffect(() => {
    handleAnswer(id, selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      {type === 'match' ? (
        <div>
          {pairs?.map(pair => (
            <div key={pair.country} className="mb-1">
              {pair.country} - {pair.capital}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {options && Object.entries(options).map(([key, option]) => (
            <div key={key} className="mb-2">
              <label className="flex items-center space-x-2">
                <input
                  type={type === 'multiple' ? 'checkbox' : 'radio'}
                  name={id.toString()}
                  value={key}
                  checked={selectedOptions.includes(key)}
                  onChange={() => handleOptionChange(key)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>{option}</span>
              </label>
            </div>
          ))}
          {(type === 'fill' || type === 'short') && (
            <input
              type="text"
              value={selectedOptions[0] || ''}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
