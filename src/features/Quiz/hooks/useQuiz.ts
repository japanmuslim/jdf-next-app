import { useGetQuizQuery } from '@/services/api/quizService';
import { useEffect, useState } from 'react';
import { Answer, QuizState } from '../Quiz.type';
import Swal from 'sweetalert2';

const useQuiz = () => {
  const [stepQuiz, setStepQuiz] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer[]>();
  const [shuffledQuizzes, setShuffledQuizzes] = useState<QuizState[]>([]);
  const [isCorrectId, setIsCorrectId] = useState<number>(0);
  const [isWrongId, setIsWrongId] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<number>(0);
  const [pageQuiz, setPageQuiz] = useState<number>(1);

  const { data, isLoading, isError } = useGetQuizQuery(
    { page: pageQuiz },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    const step = localStorage.getItem('stepQuiz');
    const lastPage = data?.meta?.last_page;

    if (step && lastPage) {
      if (parseInt(step) > lastPage) {
        setPageQuiz(1);
      } else {
        setPageQuiz(parseInt(step));
      }
    }
  }, [
    data?.meta?.last_page,
    data?.meta?.current_page,
    data?.meta?.per_page,
    data?.meta?.total,
  ]);

  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

  const handleStart = () => {
    if (data?.data?.length > 0) {
      // Mengacak urutan quiz pertama kali
      const quizzes = shuffleArray([...data.data]); // Mengacak array quiz
      setShuffledQuizzes(quizzes?.slice(0, 3)); // Simpan quiz yang sudah diacak

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

    if (isAnswered === 0) {
      return Swal.fire({
        title: 'Warning',
        text: 'Please answer the question first',
        icon: 'warning',
        showConfirmButton: false,
      });
    } else if (stepQuiz + 1 < shuffledQuizzes.length) {
      setStepQuiz((prevStep) => prevStep + 1); // Tingkatkan stepQuiz
      setCurrentQuiz(shuffledQuizzes[stepQuiz + 1]); // Atur quiz berikutnya dari quiz yang sudah diacak

      // Acak jawaban untuk quiz berikutnya
      const shuffledAnswers = shuffleArray([
        ...(shuffledQuizzes[stepQuiz + 1]?.answers || []),
      ]);
      setAnswer(shuffledAnswers);

      setIsCorrectId(0);
      setIsWrongId(0);
      setIsAnswered(0);
    } else {
      setIsFinish(true);
    }
  };

  const handleAttempt = (id: number) => {
    if (!currentQuiz) return;

    const answer = currentQuiz.answers.find((answer) => answer.id === id);

    if (!answer) return;

    if (answer?.is_correct === 1) {
      setScore((prevScore) => prevScore + 1);
      setIsCorrectId(id);
      setIsAnswered(id);
    } else {
      setIsWrongId(
        currentQuiz.answers.find((answer) => answer.is_correct === 0)?.id || 0,
      );
      setIsCorrectId(
        currentQuiz.answers.find((answer) => answer.is_correct === 1)?.id || 0,
      );
      setIsAnswered(id);
    }
  };

  const handleFinishedQuiz = () => {
    Swal.fire({
      title: 'クイズ終了しました！',
      text: 'もう一度クイズを始めたいですか？',
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
        setAnswer([]);
        setIsCorrectId(0);
        setIsWrongId(0);
        setIsAnswered(0);

        setPageQuiz((prevPage) => {
          const newPage = prevPage + 1;
          localStorage.setItem('stepQuiz', newPage.toString());
          return newPage;
        });
      }
    });
  };

  const handleNextQuiz = () => {
    handleNext();
  };

  const handlePreviousQuiz = () => {
    if (stepQuiz - 1 >= 0) {
      setStepQuiz((prevStep) => prevStep - 1); // Kurangi stepQuiz
      setCurrentQuiz(shuffledQuizzes[stepQuiz - 1]); // Atur quiz sebelumnya dari quiz yang sudah diacak

      // Acak jawaban untuk quiz sebelumnya
      const shuffledAnswers = shuffleArray([
        ...(shuffledQuizzes[stepQuiz - 1]?.answers || []),
      ]);
      setAnswer(shuffledAnswers);
    }
  };

  const finalScore = Math.floor((score / 3) * 100).toString();

  return {
    quiz: currentQuiz,
    stepQuiz,
    quizLength: 3,
    isFinish,
    score: finalScore,
    answer,
    isCorrectId,
    isWrongId,
    isAnswered,
    isLoading,
    isError,
    handleStart,
    handleAttempt,
    handleFinishedQuiz,
    handleNextQuiz,
    handlePreviousQuiz,
  };
};

export default useQuiz;
