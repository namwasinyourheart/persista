"use client"

"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure you import useRouter from next/navigation
import Question from './Question';

interface QuestionData {
  id: number;
  type: string;
  question: string;
  options?: { [key: string]: string };
  answers?: string[];
  answer?: string;
  pairs?: { country: string; capital: string }[];
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [score, setScore] = useState<number | null>(null);
  const [redirectToReview, setRedirectToReview] = useState<boolean>(false);

  const router = useRouter(); // Use useRouter here

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions/');
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = () => {
    setRedirectToReview(true);
    // Implement score calculation and redirection logic here
    router.push('/review'); // Example redirection
  };

  if (redirectToReview) {
    return <p>Redirecting to review page...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        ))
      )}
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default Quiz;
