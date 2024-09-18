"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Question from './Question';

interface QuestionData {
  id: number;
  type: 'single' | 'multiple' | 'truefalse' | 'match' | 'fill' | 'short';
  question: string;
  options?: Record<string, string>;
  pairs?: { country: string, capital: string }[];
  answer?: string;
  answers?: string[];
}

const Quiz: React.FC = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (id: number, answers: string[]) => {
    setUserAnswers(prev => ({ ...prev, [id]: answers }));
  };

  const handleReview = () => {
    const score = calculateScore();
    router.push({
      pathname: '/review',
      query: { score, answers: JSON.stringify(userAnswers) },
    });
  };

  const calculateScore = (): number => {
    let score = 0;
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (question.type === 'single' && userAnswer[0] === question.answer ||
          question.type === 'multiple' && JSON.stringify(userAnswer.sort()) === JSON.stringify(question.answers?.sort()) ||
          question.type === 'truefalse' && userAnswer[0] === question.answer ||
          question.type === 'fill' && userAnswer[0] === question.answer ||
          question.type === 'short' && userAnswer[0] === question.answer) {
        score += 1;
      }
    });
    setScore(score);
    return score;
  };

  return (
    <div className="p-4">
      {questions.map(question => (
        <Question
          key={question.id}
          id={question.id}
          type={question.type}
          question={question.question}
          options={question.options}
          pairs={question.pairs}
          answer={question.answer}
          answers={userAnswers[question.id] || []}
          handleAnswer={handleAnswer}
        />
      ))}
      <button
        onClick={handleReview}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Review Answers
      </button>
      {score !== null && <h2 className="mt-4 text-lg font-semibold">Your Score: {score}/{questions.length}</h2>}
    </div>
  );
};

export default Quiz;
