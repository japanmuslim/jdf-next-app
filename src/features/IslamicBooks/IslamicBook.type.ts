export interface IslamicBooks {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  name: string;
  description: string;
  is_active: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  islamic_books: IslamicBook[];
}

export interface IslamicBook {
  id: number;
  book_category_id: number;
  book_title: string;
  cover: string;
  author_books: string;
  publisher: string;
  link_external: string;
  link_file: null;
  description: string;
  is_active: number;
  isbn: string;
  published_on: Date;
  genre: string;
  language: string;
  pages: string;
  external_book: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
