export interface TafseerProps {
  data: Surah[];
  juz: JuzState[];
  latest: TafseerState[];
  message?: string;
  success?: boolean;
  opening?: OpeningTafseer;
}

export interface TafseerViewProps {
  linkVideo: string;
  data: Surah[];
  filteredData?: Surah[];
  isCurrentSurah?: number;
  isCurrentTafseer?: number;
  latest?: TafseerState[];
  tafseerRef?: React.RefObject<HTMLDivElement>;
  isTab?: string;
  isJuz?: JuzState[];
  isCurrentJuz?: number;
  isCloseDrawer?: boolean;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrentSurah?: (current: number) => void;
  onCurrentTafseer?: (current: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onTab?: (tab: string) => void;
  onCurrentJuz?: (current: number) => void;
  onInitThumbnail?: () => void;
  onInitUrlVideo?: () => void;
  onCurrentLatest?: (idSurah: number, idTafseer: number) => void;
}

export interface Surah {
  id: number;
  juz_id: number;
  surah_name: string;
  total_ayah: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
  tafsirs: TafseerState[];
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
  created_at: string;
  updated_at: string;
}

export interface JuzState {
  id: number;
  juz_number?: string;
  total_surah?: number;
  is_active?: number;
  created_at?: Date;
  updated_at?: Date;
  tafsirs?: TafseerState[];
}

export interface OpeningTafseer {
  id: number;
  key: string;
  value: string;
  is_active: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}
