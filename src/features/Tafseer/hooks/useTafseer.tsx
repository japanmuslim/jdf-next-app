import { ChangeEvent, useCallback, useRef, useState } from "react";
import { TafseerState } from "../Tafseer.type";

const useTafseer = ({ data }: { data: TafseerState[] }) => {
    const [isCurrent, setIsCurrent] = useState<number>(0);
    const [filteredData, setFilteredData] = useState<TafseerState[]>(data ?? []);

    const tafseerRef = useRef<HTMLDivElement>(null);

    const handleCurrent = useCallback((current: number) => {
        setIsCurrent(current);
        tafseerRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const searchValue = e.target.value.toLowerCase();
        const filtered = data.filter((item) => item.name_tafseer.toLowerCase().includes(searchValue));

        setFilteredData(filtered);
    }, [data]);

    return {
        filteredData,
        isCurrent,
        tafseerRef,
        handleSearch,
        handleCurrent
    }
}

export { useTafseer }