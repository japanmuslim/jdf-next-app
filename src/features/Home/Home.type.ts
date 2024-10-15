import { TafseerState } from '../Tafseer/Tafseer.type';

export interface CardVideosProps {
  name_tafseer?: string;
  thumbnail_url?: string;
  link_youtube?: string;
  className?: string;
  onClick?: () => void;
}

export interface GridVideosProps {
  data?: TafseerState[];
  onTogglePlay?: (videoUrl: string) => void;
}
