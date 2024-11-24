import { ChangeEvent } from 'react';

export interface DuaProps {
  data: DuaState[];
  message?: string;
  success?: boolean;
}

export interface DuaViewProps {
  data: DuaState[];
  duaRef?: React.RefObject<HTMLDivElement>;
  filteredData?: DuaState[];
  isCurrent?: number;
  isCloseDrawer?: boolean;
  onCurrent?: (current: number) => void;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export interface DuaState {
  id: number;
  name_dua: string;
  description_dua: string;
  link: string;
  thumbnail_url: string;
  views: null;
  is_active: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}
