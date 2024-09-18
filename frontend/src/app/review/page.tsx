"use client"

import React, { useEffect, useState } from 'react';

interface QuestionData {
  id: number;
  type: 'single' | 'multiple' | 'truefalse' | 'match' | 'fill' | 'short';
  question: string;
  options?: Record<string, string>;
  pairs?: { country: string, capital: string }[];
  answer?: string;
  answers?: string[];
}

const Review: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    // Fetch questions from the JSON file
    fetch('api/questions.json')
      .then(response => response.json())
      .then(data => setQuestions(data));

    // Get quiz results from local storage
    const results = localStorage.getItem('quizResults');
    if (results) {
      const { score, userAnswers } = JSON.parse(results);
      setScore(score);
      setUserAnswers(userAnswers);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Review Your Answers</h1>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        questions.map(question => (
          <div key={question.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
            {question.type === 'match' ? (
              <div>
                {question.pairs?.map(pair => (
                  <div key={pair.country} className="mb-1">
                    {pair.country} - {pair.capital}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {question.options && Object.entries(question.options).map(([key, option]) => (
                  <div key={key} className="mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                        name={question.id.toString()}
                        value={key}
                        checked={userAnswers[question.id]?.includes(key) || false}
                        readOnly
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
                {(question.type === 'fill' || question.type === 'short') && (
                  <div className="mt-2 p-2 border border-gray-300 rounded-md">
                    {userAnswers[question.id]?.[0] || ''}
                  </div>
                )}
              </div>
            )}
            <div className="mt-2 font-semibold">
              <span className="text-gray-600">Correct Answer:</span> {question.answer}
            </div>
          </div>
        ))
      )}
      {score !== null && <h2 className="mt-4 text-lg font-semibold">Your Score: {score}/{questions.length}</h2>}
    </div>
  );
};

export default Review;
