import { useGetQuizQuery } from '@/services/api/quizService';
import { useEffect, useState } from 'react';
import { Answer, QuizState } from '../Quiz.type';
import Swal from 'sweetalert2';

const useQuiz = () => {
  const { data, isLoading, isError } = useGetQuizQuery({});
  const [stepQuiz, setStepQuiz] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer[]>();
  const [shuffledQuizzes, setShuffledQuizzes] = useState<QuizState[]>([]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleStart = () => {
    if (data?.data?.length > 0) {
      // Mengacak urutan quiz pertama kali
      const quizzes = shuffleArray([...data.data]); // Mengacak array quiz
      setShuffledQuizzes(quizzes); // Simpan quiz yang sudah diacak

      // Atur quiz pertama dan acak jawabannya
      setCurrentQuiz(quizzes[stepQuiz]); // Atur quiz saat ini berdasarkan langkah
      const shuffledAnswers = shuffleArray([
        ...(quizzes[stepQuiz]?.answers || []),
      ]);
      setAnswer(shuffledAnswers); // Atur jawaban yang sudah diacak
    }
  };

  const handleNext = () => {
    if (!shuffledQuizzes || !shuffledQuizzes.length) return; // Pastikan quiz sudah diacak

    if (stepQuiz + 1 < shuffledQuizzes.length) {
      setStepQuiz((prevStep) => prevStep + 1); // Tingkatkan stepQuiz
      setCurrentQuiz(shuffledQuizzes[stepQuiz + 1]); // Atur quiz berikutnya dari quiz yang sudah diacak

      // Acak jawaban untuk quiz berikutnya
      const shuffledAnswers = shuffleArray([
        ...(shuffledQuizzes[stepQuiz + 1]?.answers || []),
      ]);
      setAnswer(shuffledAnswers);
    } else {
      Swal.fire({
        title: 'Quiz Completed',
        text: 'You have completed the quiz',
        icon: 'success',
        confirmButtonText: 'Selesai',
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
    answer,
    isLoading,
    isError,
    handleStart,
    handleAttempt,
    handleFinishedQuiz,
  };
};

export default useQuiz;
