import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { DuaState } from '../Dua.type';

const useDua = ({ data }: { data: DuaState[] }) => {
  const [isCurrent, setIsCurrent] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<DuaState[]>(data ?? []);

  const duaRef = useRef<HTMLDivElement>(null);

  const handleCurrent = useCallback((current: number) => {
    setIsCurrent(current);
    duaRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const searchValue = e.target.value.toLowerCase();
      const filtered = data.filter((item) =>
        item.name_dua.toLowerCase().includes(searchValue),
      );

      setFilteredData(filtered);
    },
    [data],
  );

  return {
    filteredData,
    isCurrent,
    duaRef,
    handleSearch,
    handleCurrent,
  };
};

export default useDua;
