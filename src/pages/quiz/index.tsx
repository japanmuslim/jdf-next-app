import Loading from '@/components/page/loading';
import QuizView from '@/features/Quiz';
import useQuiz from '@/features/Quiz/hooks/useQuiz';
import Layout from '@/layouts/Layout';
import { useRouter } from 'next/router';

export default function Quiz() {
  const router = useRouter();
  const {
    quiz,
    score,
    answer,
    stepQuiz,
    quizLength,
    isCorrectId,
    isWrongId,
    isAnswered,
    isFinish,
    isLoading,
    isError,
    handleStart,
    handleAttempt,
    handleFinishedQuiz,
    handleNextQuiz,
    handlePreviousQuiz,
  } = useQuiz();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    router.push('/');
  }

  return (
    <Layout id="quiz" pageTitle="Quiz" pageDescription="Quiz page">
      <QuizView
        quiz={quiz}
        score={score}
        anwser={answer}
        stepQuiz={stepQuiz}
        isFinish={isFinish}
        isCorrectId={isCorrectId}
        isWrongId={isWrongId}
        isAnswered={isAnswered}
        quizLength={quizLength}
        onStartQuiz={handleStart}
        onAttemptQuiz={handleAttempt}
        onFinishedQuiz={handleFinishedQuiz}
        onNextQuiz={handleNextQuiz}
        onPreviousQuiz={handlePreviousQuiz}
      />
    </Layout>
  );
}
