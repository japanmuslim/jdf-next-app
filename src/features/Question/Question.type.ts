export interface QuestionState {
  id: number;
  category_question_id?: number | null;
  title: string;
  email: string;
  content: string;
  is_show: number;
  is_active: number;
  created_at?: Date;
  updated_at?: Date;
  answers?: any[];
}
