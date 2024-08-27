import { useGetQuizQuery } from '@/services/api/quizService';
import { useState } from 'react';
import { QuizState } from '../Quiz.type';
import Swal from 'sweetalert2';

const useQuiz = () => {
  const { data, isLoading, isError } = useGetQuizQuery({});
  const [stepQuiz, setStepQuiz] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleStart = () => {
    if (data?.data?.length) {
      setCurrentQuiz(data.data[stepQuiz]);
    }
  };

  const handleNext = () => {
    if (!data?.data) return;

    if (stepQuiz + 1 < data.data.length) {
      setStepQuiz((prevStep) => prevStep + 1);
      setCurrentQuiz(data.data[stepQuiz + 1]);
    } else {
      Swal.fire({
        title: 'Congratulations!',
        text: 'You have completed the quiz!',
        icon: 'success',
        confirmButtonText: 'Finish',
        confirmButtonColor: '#4caf50',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsFinish(true);
        }
      });
    }
  };

  const handleAttempt = (id: number) => {
    if (!currentQuiz) return;

    const answer = currentQuiz.answers.find((answer) => answer.id === id);

    if (answer?.is_correct) {
      setScore((prevScore) => prevScore + 1);
    }

    Swal.fire({
      title: 'Next Question',
      text: 'Do you want to continue to the next question?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#f44336',
    }).then((result) => {
      if (result.isConfirmed) {
        handleNext();
      }
    });
  };

  const handleFinishedQuiz = () => {
    Swal.fire({
      title: 'Quiz Completed',
      text: 'Do you want to start the quiz again?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#f44336',
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset quiz
        setIsFinish(false);
        setStepQuiz(0);
        setScore(0);
        setCurrentQuiz(null);

        // Start quiz
        handleStart();
      }
    });
  };

  const finalScore = (score / data?.data.length) * 100;

  return {
    quiz: currentQuiz,
    stepQuiz,
    quizLength: data?.data.length,
    isFinish,
    score: finalScore,
    isLoading,
    isError,
    handleStart,
    handleAttempt,
    handleFinishedQuiz,
  };
};

export default useQuiz;
