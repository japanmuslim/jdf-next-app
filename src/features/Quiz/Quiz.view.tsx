import { Button } from '@/components/ui/button';
import React, { FC, memo } from 'react';
import { QuizViewProps } from './Quiz.type';
import { FaSpinner } from 'react-icons/fa6';

const QuizView: FC<QuizViewProps> = ({ quiz, onAttemptQuiz, onStartQuiz }) => (
  <section
    id="hero"
    className="min-h-screen flex justify-center items-center lg:px-8 px-6"
  >
    {!quiz && (
      <div className="bg-white w-full lg:max-w-lg px-8 py-10 rounded-3xl text-primary relative z-10">
        <h1 className="text-2xl font-bold text-center">Quiz</h1>
        <div className="mt-4">
          <p className="text-center text-xl">
            イスラムに関する知識を試す準備はできましたか？
          </p>
        </div>
        <div className="mt-12">
          <Button
            type="button"
            className="w-full rounded-full"
            onClick={onStartQuiz}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    )}
    {quiz && (
      <div className="bg-white w-full lg:max-w-2xl px-8 rounded-3xl text-primary relative z-10 space-y-12 py-10">
        <h1 className="text-2xl font-bold text-center">{quiz.title}</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          {quiz.answers.map((answer) => (
            <Button
              key={answer.id}
              type="button"
              className="w-full rounded-full"
              onClick={onAttemptQuiz && (() => onAttemptQuiz(answer.id))}
            >
              {answer.answer_text}
            </Button>
          ))}
        </div>
      </div>
    )}
  </section>
);

export default memo(QuizView);
