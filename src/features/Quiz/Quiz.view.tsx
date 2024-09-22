import { Button } from '@/components/ui/button';
import React, { FC, memo } from 'react';
import { QuizViewProps } from './Quiz.type';
import { PiSpinnerBallFill } from 'react-icons/pi';
import { Skeleton } from '@/components/ui/skeleton';
import ReactPlayer from 'react-player';
import { ChevronLeftCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const QuizView: FC<QuizViewProps> = ({
  anwser,
  quiz,
  score,
  stepQuiz,
  quizLength,
  isFinish,
  isCorrectId,
  isWrongId,
  isAnswered,
  onAttemptQuiz,
  onStartQuiz,
  onFinishedQuiz,
  onNextQuiz,
}) => (
  <section
    id="hero"
    className="min-h-screen flex justify-center items-center lg:px-8 px-6 relative"
  >
    {!quiz && (
      <div className="bg-white w-full md:max-w-2xl px-8 py-10 rounded-3xl text-primary relative z-10">
        <h1 className="md:text-3xl text-2xl font-bold text-center">Quiz</h1>
        <div className="mt-4">
          <p className="text-center md:text-3xl text-2xl">
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
          <p className="text-base">
            <strong>{stepQuiz + 1}</strong>/{quizLength}
          </p>
        </div>
        <h1 className="md:text-3xl text-2xl font-bold text-center md:mt-12 mt-8 md:mb-14 mb-8">
          {quiz.title + quiz.id}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(anwser?.length || 0) > 0 &&
            anwser?.map((answer) => (
              <Button
                key={answer.id}
                type="button"
                disabled={isAnswered !== 0}
                className={cn(
                  'w-full rounded-full hover:-translate-y-1 duration-300 transition-all whitespace-break-spaces md:text-lg text-md min-h-14 disabled:cursor-not-allowed disabled:opacity-100',

                  // Jika jawaban benar, tambahkan bg hijau
                  isCorrectId === answer.id
                    ? 'bg-green-600 animate-bounce duration-700'
                    : // Jika jawaban salah, tambahkan bg merah
                      isWrongId === answer.id
                      ? 'bg-[#F00A0C] animate-bounce duration-700'
                      : // Jika sudah dijawab tapi bukan jawaban yang benar, tetap merah
                        isAnswered && isCorrectId !== answer.id
                        ? 'animate-bounce duration-700 bg-[#F00A0C]'
                        : // Jawaban yang tidak terpilih tetap dengan background default
                          '!bg-primary',
                )}
                onClick={() => onAttemptQuiz && onAttemptQuiz(answer.id)}
              >
                <span>
                  {answer.answer_text}
                  {isAnswered === answer.id && (
                    <span
                      // className={
                      //   isCorrectId === answer.id
                      //     ? '!text-green-500'
                      //     : 'text-red-500'
                      // }
                      className="!text-white"
                    >
                      {isCorrectId === answer.id ? ' ✔' : ' ✖'}
                    </span>
                  )}
                </span>
              </Button>
            ))}
        </div>

        <div className="flex justify-center md:mt-12 mt-10">
          <Button
            type="button"
            className="rounded-full bg-white text-primary border border-primary px-6 py-6 hover:bg-primary hover:text-white hover:-translate-y-2 duration-300 transition-all hover:shadow-md w-full md:text-lg text-md"
            onClick={quizLength - 1 ? onNextQuiz : onFinishedQuiz}
          >
            {quizLength - 1 ? <span> 次へ</span> : <span> 終了</span>}
            <ChevronLeftCircle className="h-6 w-6 transform rotate-180 ml-2" />
          </Button>
        </div>

        {/* <div className="flex justify-end mt-4 gap-1">
          <button
            className={cn(
              'text-primary h-8 w-8 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center',
              stepQuiz === 0 ? 'opacity-40 cursor-not-allowed' : '',
            )}
            disabled={stepQuiz === 0}
            onClick={() => onPreviousQuiz && onPreviousQuiz()}
          >
            <ChevronLeftCircle className="h-8 w-8" />
          </button>
          <button
            className={cn(
              'text-primary h-8 w-8 rounded-full bg-white hover:bg-primary hover:text-white flex items-center justify-center',
              stepQuiz === quizLength - 1
                ? 'opacity-40 cursor-not-allowed'
                : '',
            )}
            disabled={stepQuiz === quizLength - 1}
            onClick={() => onNextQuiz && onNextQuiz()}
          >
            <ChevronLeftCircle className="h-8 w-8 transform rotate-180" />
          </button>
        </div> */}
      </div>
    )}

    {isFinish && (
      <>
        <div className="bg-gradient-to-t from-[#000000b6] to-transparent absolute inset-0 z-0" />
        <div className="flex flex-col relative z-10 md:mt-0 mt-20">
          <h1
            className={`md:text-4xl text-2xl font-extrabold text-center m-0 animate-bounce ${
              Number(score) >= 80
                ? 'text-green-500'
                : Number(score) >= 40
                  ? 'text-yellow-500'
                  : Number(score) <= 40
                    ? 'text-red-500'
                    : ''
            }`}
          >
            {Number(score) >= 80
              ? '🎉 Congratulations! 🎉'
              : Number(score) >= 40
                ? 'Excellent'
                : 'Try Again'}
          </h1>
          <p className="text-center md:text-lg text-base text-gray-300 my-4">
            You have completed the quiz with a score of
          </p>
          <h1
            className={`text-5xl font-bold text-center mt-4 mb-0 animate-scale ${
              Number(score) >= 80
                ? 'text-green-500'
                : Number(score) >= 60
                  ? 'text-yellow-500'
                  : Number(score) <= 40
                    ? 'text-red-500'
                    : ''
            }`}
          >
            {score}
          </h1>
          <div className="relative md:h-96 h-60">
            <ReactPlayer
              url={
                Number(score) === 100
                  ? '/assets/videos/quiz/correct-all.webm'
                  : Number(score) <= 90
                    ? '/assets/videos/quiz/correct-90.webm'
                    : Number(score) <= 70
                      ? '/assets/videos/quiz/correct-70.webm'
                      : Number(score) <= 40
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
