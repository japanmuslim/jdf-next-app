import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { DuaState } from '../Dua.type';

const useDua = ({ data }: { data: DuaState[] }) => {
  const [isCurrent, setIsCurrent] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<DuaState[]>(data ?? []);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
  const [isCloseDrawer, setIsCloseDrawer] = useState<boolean>(false);

  const duaRef = useRef<HTMLDivElement>(null);

  const handlePlayVideo = useCallback(() => {
    let timer: any;

    const handleMouseMove = () => {
      setIsNavVisible(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsNavVisible(true);
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handlePauseVideo = useCallback(() => {
    setIsNavVisible(false);
  }, []);

  const handleCurrent = useCallback((current: number) => {
    setIsCurrent(current);
    duaRef?.current?.scrollIntoView({ behavior: 'smooth' });

    setIsCloseDrawer(true);

    setTimeout(() => {
      setIsCloseDrawer(false);
    }, 0);
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
    isCloseDrawer,
    isNavVisible,
    handleSearch,
    handleCurrent,
    handlePlayVideo,
    handlePauseVideo,
  };
};

export default useDua;
