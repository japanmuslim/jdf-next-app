export interface DuaProps {
    data: DuaState[];
    message?: string;
    success?: boolean;
}

export interface DuaViewProps {
    data: DuaState[];
    duaRef?: React.RefObject<HTMLDivElement>;
    isLoading?: boolean;
    isCurrent?: number;
    handleCurrent?: (current: number) => void;
}

export interface DuaState {
    id: number;
    name_dua:string;
    description_dua:string;
    link: string;
    thumbnail_url: string;
    views: null;
    is_active: number;
    deleted_at: null;
    created_at: string;
    updated_at: string;
}