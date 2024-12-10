import { TafseerState } from '../Tafseer/Tafseer.type';

// export interface CardVideosProps {
//   name_tafseer?: string;
//   thumbnail_url?: string;
//   link_youtube?: string;
//   className?: string;
//   onClick?: () => void;
// }

export interface CategoryVideoProps {
  id: number;
  thumbnail: string;
  category_name: string;
  description: string;
  is_active: number;
  created_at: Date | string;
  updated_at: Date | string;
  videos: VideoState[];
}

export interface VideoState {
  id: number;
  video_category_id: number;
  thumbnail_url: string;
  type_video: string;
  name_video: string;
  views: number;
  description_video: string;
  link: string;
  is_active: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface GridVideosProps {
  data: CategoryVideoProps[];
  type?: 'category' | 'video';
  isLoading?: boolean;
  onHandleCategory?: (category: string) => void;
  onHandleCurrentCategory?: (category: CategoryVideoProps) => void;
  onHandleVideo?: (videoId: number) => void;
}
