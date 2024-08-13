import { useGetQuizQuery } from '@/services/api/quizService';
import { useState } from 'react';
import { QuizState } from '../Quiz.type';
import Swal from 'sweetalert2';

const useQuizStart = () => {
  const { data, isLoading, isError } = useGetQuizQuery({});
  const [stepQuiz, setStepQuiz] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);

  const handleStart = () => {
    if (data?.data && data.data.length > 0) {
      setCurrentQuiz(data.data[stepQuiz]);
    }
  };

  const handleNext = () => {
    if (data?.data && stepQuiz + 1 < data.data.length) {
      setStepQuiz(stepQuiz + 1);
      setCurrentQuiz(data.data[stepQuiz + 1]);
    }

    if (stepQuiz + 1 === data.data.length) {
      Swal.fire({
        title: 'Congratulations!',
        text: 'You have completed the quiz!',
        icon: 'success',
        confirmButtonText: 'Finish',
        confirmButtonColor: '#4caf50',
      }).then((result) => {
        if (result.isConfirmed) {
          setStepQuiz(0);
          setCurrentQuiz(null);
        }
      });
    }
  };

  const handleAttempt = (id: number) => {
    if (currentQuiz) {
      const answer = currentQuiz.answers.find((answer) => answer.id === id);

      if (answer?.is_correct === 1) {
        Swal.fire({
          title: 'Good job!',
          text: `${answer.answer_text} is the correct answer!`,
          icon: 'success',
          confirmButtonText: 'Next',
          confirmButtonColor: '#4caf50',
        }).then((result) => {
          if (result.isConfirmed) {
            handleNext();
          }
        });
      }

      if (answer?.is_correct === 0) {
        Swal.fire({
          title: 'Oops!',
          text: `${answer.answer_text} is the wrong answer!`,
          icon: 'error',
          confirmButtonText: 'Try again',
          confirmButtonColor: '#f44336',
        });
      }
    }
  };

  return {
    quiz: currentQuiz,
    isLoading,
    isError,
    handleStart,
    handleAttempt,
  };
};

export default useQuizStart;
