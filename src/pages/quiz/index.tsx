import QuizView from '@/features/Quiz';
import useQuizStart from '@/features/Quiz/hooks/useQuizStart';
import Layout from '@/layouts/Layout';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa6';

export default function Quiz() {
  const router = useRouter();
  const { quiz, isLoading, isError, handleStart, handleAttempt } =
    useQuizStart();

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
        onStartQuiz={handleStart}
        onAttemptQuiz={handleAttempt}
      />
    </Layout>
  );
}
