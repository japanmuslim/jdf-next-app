export interface FaqState {
  id: number;
  title: string;
  category_faqs_id: number | null;
  description: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
