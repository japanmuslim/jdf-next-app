import { useGetQuizQuery } from '@/services/api/quizService';
import { useState } from 'react';
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
  const [isCorrectId, setIsCorrectId] = useState<number>(0);
  const [isWrongId, setIsWrongId] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<number>(0);

  // const shuffleArray = (array: any[]) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

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
    // else {
    //   Swal.fire({
    //     title: 'クイズ終了しました！',
    //     text: 'クイズを終了しました！あなたのスコアは以下です completed the quiz',
    //     icon: 'success',
    //     confirmButtonText: 'Selesai',
    //     confirmButtonColor: '#4caf50',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       setIsFinish(true);
    //     }
    //   });
    // }
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

    // if (
    //   currentQuiz.answers.some(
    //     (answer) => answer.id === isCorrectId || answer.id === isWrongId,
    //   )
    // ) {
    //   Swal.fire({
    //     title: 'Warning',
    //     text: 'クイズを終了しました！あなたのスコアは以下です answered the question, please click next button',
    //     icon: 'warning',
    //     showConfirmButton: false,
    //   });

    //   return;
    // }

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'Are you sure with your answer?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes',
    //   cancelButtonText: 'No',
    //   confirmButtonColor: '#4caf50',
    //   cancelButtonColor: '#f44336',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     if (answer?.is_correct === 1) {
    //       setScore((prevScore) => prevScore + 1);
    //       setIsCorrectId(id);
    //       setIsAnswered(id);
    //     } else {
    //       setIsWrongId(
    //         currentQuiz.answers.find((answer) => answer.is_correct === 0)?.id ||
    //           0,
    //       );
    //       setIsCorrectId(
    //         currentQuiz.answers.find((answer) => answer.is_correct === 1)?.id ||
    //           0,
    //       );
    //       setIsAnswered(id);
    //     }
    //   }
    // });
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

        // Start quiz
        // handleStart();
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
