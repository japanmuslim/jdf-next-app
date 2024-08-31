import { Button } from '@/components/ui/button';
import React, { FC, memo } from 'react';
import { QuizViewProps } from './Quiz.type';
import { Progress } from '@/components/ui/progress';
import { PiSpinnerBallFill } from 'react-icons/pi';
import { Skeleton } from '@/components/ui/skeleton';
import ReactPlayer from 'react-player';

const QuizView: FC<QuizViewProps> = ({
  anwser,
  quiz,
  score,
  stepQuiz,
  quizLength,
  isFinish,
  onAttemptQuiz,
  onStartQuiz,
  onFinishedQuiz,
}) => (
  <section
    id="hero"
    className="min-h-screen flex justify-center items-center lg:px-8 px-6 relative"
  >
    {!quiz && (
      <div className="bg-white w-full md:max-w-2xl px-8 py-10 rounded-3xl text-primary relative z-10">
        <h1 className="md:text-3xl text-2xl font-bold text-center">Quiz</h1>
        <div className="mt-4">
          <p className="text-center md:text-2xl text-xl">
            イスラムに関する知識を試す準備はできましたか？
          </p>
        </div>
        <div className="mt-12 text-center">
          <Button
            type="button"
            size="lg"
            className="rounded-full md:px-20"
            onClick={onStartQuiz}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    )}

    {quiz && !isFinish && (
      <div className="bg-white w-full lg:max-w-2xl px-8 md:py-10 py-8 md:mt-0 mt-20 rounded-3xl text-primary relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gray-200">
          <Skeleton
            className="h-3 bg-green-600 rounded-full rounded-l-none relative"
            style={{ width: `${(stepQuiz / quizLength) * 100}%` }}
          >
            <PiSpinnerBallFill className="animate-spin absolute right-0 top-0 h-3 w-3 text-white" />
          </Skeleton>
        </div>
        <div className="flex justify-between items-center my-4">
          <h1 className="md:text-2xl text-xl font-bold m-0">{`Question ${stepQuiz + 1}`}</h1>
          <p>
            Question: <strong>{stepQuiz}</strong>/{quizLength}
          </p>
        </div>
        <h1 className="md:text-2xl text-xl font-bold text-center md:mt-12 mt-6 md:mb-14 mb-8">
          {quiz.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(anwser?.length || 0) > 0 &&
            anwser?.map((answer) => (
              <Button
                key={answer.id}
                type="button"
                className="w-full rounded-full py-2 hover:-translate-y-1 duration-300 transition-all whitespace-break-spaces h-14"
                onClick={() => onAttemptQuiz && onAttemptQuiz(answer.id)}
              >
                {answer.answer_text}
                {/* {answer.is_correct === 1 && (
                  <span className="text-xs ml-2 bg-green-600 text-white px-2 py-1 rounded-full">
                    Correct
                  </span>
                )} */}
              </Button>
            ))}
        </div>
      </div>
    )}

    {isFinish && (
      <>
        <div className="bg-gradient-to-t from-[#000000b6] to-transparent absolute inset-0 z-0" />
        <div className="flex flex-col relative z-10 md:mt-0 mt-20">
          <h1
            className={`md:text-4xl text-2xl font-extrabold text-center m-0 animate-bounce ${
              score >= 80
                ? 'text-green-500'
                : score >= 40
                  ? 'text-yellow-500'
                  : score <= 40
                    ? 'text-red-500'
                    : ''
            }`}
          >
            {score > 80
              ? '🎉 Congratulations! 🎉'
              : score > 40
                ? 'Excellent'
                : 'Try Again'}
          </h1>
          <p className="text-center md:text-lg text-base text-gray-300 my-4">
            You have completed the quiz with a score of
          </p>
          <h1
            className={`text-5xl font-bold text-center mt-4 mb-0 animate-scale ${
              score >= 80
                ? 'text-green-500'
                : score >= 40
                  ? 'text-yellow-500'
                  : score <= 40
                    ? 'text-red-500'
                    : ''
            }`}
          >
            {score}
          </h1>
          <div className="relative md:h-96 h-60">
            <ReactPlayer
              url={
                score === 100
                  ? '/assets/videos/quiz/correct-all.webm'
                  : score <= 90
                    ? '/assets/videos/quiz/correct-90.webm'
                    : score <= 70
                      ? '/assets/videos/quiz/correct-70.webm'
                      : score <= 40
                        ? '/assets/videos/quiz/correct-40.webm'
                        : '/assets/videos/quiz/correct-40.webm'
              }
              playing
              width={'100%'}
              height={'100%'}
            />
          </div>
          <Button
            type="button"
            className="rounded-full bg-white text-primary border border-primary mt-4 w-fit mx-auto px-6 hover:bg-primary hover:text-white"
            onClick={onFinishedQuiz}
          >
            Start Quiz Again
          </Button>
        </div>
      </>
    )}
  </section>
);

export default memo(QuizView);
