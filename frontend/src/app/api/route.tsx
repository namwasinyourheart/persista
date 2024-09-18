import { NextResponse } from 'next/server';

interface QuestionData {
  id: number;
  type: 'single' | 'multiple' | 'truefalse' | 'match' | 'fill' | 'short';
  answer?: string;
  answers?: string[];
}

export async function POST(request: Request) {
  const { userAnswers, questions } = await request.json();

  let score = 0;
  const results: Record<number, boolean> = {};

  questions.forEach((question: QuestionData) => {
    const userAnswer = userAnswers[question.id];
    const isCorrect = (question.type === 'single' && userAnswer[0] === question.answer ||
                       question.type === 'multiple' && JSON.stringify(userAnswer.sort()) === JSON.stringify(question.answers?.sort()) ||
                       question.type === 'truefalse' && userAnswer[0] === question.answer ||
                       question.type === 'fill' && userAnswer[0] === question.answer ||
                       question.type === 'short' && userAnswer[0] === question.answer);
    results[question.id] = isCorrect;
    if (isCorrect) score += 1;
  });

  return NextResponse.json({ score, results });
}
