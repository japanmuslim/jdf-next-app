export interface TafseerProps {
    data: Tafseer[];
    message?: string;
    success?: boolean;
}

export interface TafseerViewProps {
    data: Tafseer[];
    tafseerRef?: React.RefObject<HTMLDivElement>;
    isLoading?: boolean;
    isCurrent?: number;
    handleCurrent?: (current: number) => void;
}

export interface Tafseer {
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