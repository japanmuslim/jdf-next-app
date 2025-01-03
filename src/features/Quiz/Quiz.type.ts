export interface QuizState {
  id: number;
  title: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  quiz_id: number;
  answer_text: string;
  is_correct: number;
  created_at: string;
  updated_at: string;
}

export interface QuizViewProps {
  quiz: QuizState | null;
  stepQuiz: number;
  quizLength: number;
  isFinish: boolean;
  isWrongId: number;
  isCorrectId: number;
  score: number | string;
  anwser?: Answer[];
  isAnswered?: number;
  onStartQuiz: () => void;
  onAttemptQuiz: (id: number) => void;
  onFinishedQuiz: () => void;
  onNextQuiz: () => void;
  onPreviousQuiz?: () => void;
}
