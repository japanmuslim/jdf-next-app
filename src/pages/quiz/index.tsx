import QuizView from '@/features/Quiz';
import useQuiz from '@/features/Quiz/hooks/useQuiz';
import Layout from '@/layouts/Layout';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa6';

export default function Quiz() {
  const router = useRouter();
  const {
    quiz,
    score,
    stepQuiz,
    quizLength,
    isFinish,
    isLoading,
    isError,
    handleStart,
    handleAttempt,
    handleFinishedQuiz,
  } = useQuiz();

  if (isLoading) {
    return (
      <Layout id="quiz" pageTitle="Quiz" pageDescription="Quiz page">
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="w-16 h-16 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (isError) {
    router.push('/');
  }

  return (
    <Layout id="quiz" pageTitle="Quiz" pageDescription="Quiz page">
      <QuizView
        quiz={quiz}
        score={score}
        stepQuiz={stepQuiz}
        isFinish={isFinish}
        quizLength={quizLength}
        onStartQuiz={handleStart}
        onAttemptQuiz={handleAttempt}
        onFinishedQuiz={handleFinishedQuiz}
      />
    </Layout>
  );
}
