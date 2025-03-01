export interface ArticleProps {
  currentPages: number;
  first_page_url?: string;
  from?: number;
  data: ArticleState[];
  last_page?: number;
  last_page_url?: string;
  links?: Link[];
  next_page_url?: null | string;
  path?: string;
  per_page?: number;
  prev_page_url?: null | string;
  to?: number;
  total?: number;
  categories?: Category[];
  carousel?: ArticleState[];
}

export interface ArticleViewProps {
  data?: ArticleProps;
  articles?: ArticleState[];
  categories?: Category[];
  carousel?: ArticleState[];
  isLoading?: boolean;
  currentCategory: number;
  page?: number;
  lastPage?: number;
  categoryRef?: React.RefObject<HTMLDivElement>;
  sectionRef?: React.RefObject<HTMLDivElement>;
  onPaginate: (page: number) => void;
  onRedirect: (slug: string) => void;
  onCategory: (id: number) => void;
  onSlideCategory: (index: number) => void;
}

export interface Images {
  id: number;
  post_id: number;
  thumbnail_url: string;
  alt_url_image: null | string;
  created_at: Date;
  updated_at: Date;
}

export interface Tags {
  id: number;
  name: string;
  slug: string;
  keywords: string;
  meta_desc: string;
  is_active: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot;
}

export interface Pivot {
  post_id: number;
  tag_id: number;
}

export interface ArticleState {
  id: number;
  user_id: number;
  news_categories_id: number;
  tags_id: number;
  cover: null | string;
  thumbnail_url: null;
  images?: Images[];
  title: string;
  slug: string;
  desc: string;
  keywords: string;
  meta_desc: string;
  views?: null | number;
  status: string;
  created_at: Date;
  updated_at: Date;
  category: Category;
  tags: Tags[];
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug?: string;
  keywords?: string;
  meta_desc?: string;
  is_active: number;
  created_at?: Date;
  updated_at?: Date;
}
