export interface FaqState {
  id: number;
  title: string;
  category_faqs_id: number | null;
  description: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}

export interface QuestionState {
  id: number;
  category_question_id?: number | null;
  title: string;
  email: string;
  content: string;
  is_show: number;
  views: number;
  is_active: number;
  created_at?: string;
  updated_at?: string;
  answers?: string;
}
