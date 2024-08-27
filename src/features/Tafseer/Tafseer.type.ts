export interface TafseerProps {
  data: TafseerState[];
  message?: string;
  success?: boolean;
}

export interface TafseerViewProps {
  data: TafseerState[];
  filteredData?: TafseerState[];
  isCurrent?: number;
  tafseerRef?: React.RefObject<HTMLDivElement>;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrent?: (current: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export interface TafseerState {
  id: number;
  juz_id: number;
  surah_id: number;
  name_tafseer: string;
  thumbnail_url: string;
  start_surah: string;
  end_surah: string;
  link_youtube: string;
  views: number | null;
  is_active: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}
