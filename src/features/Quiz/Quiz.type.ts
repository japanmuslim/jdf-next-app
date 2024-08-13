export interface QuizState {
  id: number;
  title: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  quiz_id: number;
  answer_text: string;
  is_correct: number;
  created_at: string;
  updated_at: string;
}

export interface QuizViewProps {
  quiz: QuizState | null;
  onStartQuiz: () => void;
  onAttemptQuiz: (id: number) => void;
}
