import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { JuzState, Surah } from '../Tafseer.type';

const useTafseer = ({ data, juz }: { data: Surah[]; juz: JuzState[] }) => {
  const [isCurrentSurah, setIsCurrentSurah] = useState<number>(0);
  const [isCurrentTafseer, setIsCurrentTafseer] = useState<number>(0);
  const [isCurrentJuz, setIsCurrentJuz] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<Surah[]>(data ?? []);
  const [isJuz, setIsJuz] = useState<JuzState[]>(juz ?? []);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
  const [isTab, setIsTab] = useState<string>('surah');
  const [isCloseDrawer, setIsCloseDrawer] = useState<boolean>(false);

  const tafseerRef = useRef<HTMLDivElement>(null);

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

  const handleCurrentSurah = useCallback((current: number) => {
    setIsCurrentSurah(current);
    tafseerRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCurrentTafseer = useCallback((current: number) => {
    setIsCurrentTafseer(current);
    tafseerRef?.current?.scrollIntoView({ behavior: 'smooth' });

    setIsCloseDrawer(true);

    setTimeout(() => {
      setIsCloseDrawer(false);
    }, 0);
  }, []);

  const handleCurrentJuz = useCallback((current: number) => {
    setIsCurrentJuz(current);
    tafseerRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCurrentLatest = useCallback(
    (idSurah: number, idTafseer: number) => {
      const surahIndex = data.findIndex((item) => item.id === idSurah);
      if (surahIndex !== -1) {
        setIsCurrentSurah(surahIndex);

        const tafseerIndex = data[surahIndex].tafsirs.findIndex(
          (item) => item.id === idTafseer,
        );

        if (tafseerIndex !== -1) {
          setIsCurrentTafseer(tafseerIndex);
        }
      }

      tafseerRef?.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [data],
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const searchValue = e.target.value.toLowerCase();
      const filtered = data.filter((item) => {
        const surahName = item.surah_name.toLowerCase();
        return (
          surahName.includes(searchValue) ||
          `surah ${surahName}`.includes(searchValue)
        );
      });

      const juzFiltered = juz.filter((item) => {
        const juzNumber = item.juz_number?.toLowerCase();
        return (
          juzNumber?.includes(searchValue) ||
          `juz ${juzNumber}`.includes(searchValue)
        );
      });

      isTab === 'surah' ? setFilteredData(filtered) : setIsJuz(juzFiltered);
    },
    [data, isTab, juz],
  );

  const handleTab = useCallback(
    (tab: string) => {
      setIsTab(tab);

      if (tab === 'surah') {
        setFilteredData(data);
      } else {
        setIsJuz(juz);
      }
    },
    [data, juz],
  );

  return {
    filteredData,
    isJuz,
    isCurrentJuz,
    isCurrentSurah,
    isCurrentTafseer,
    isCloseDrawer,
    handleCurrentJuz,
    tafseerRef,
    isNavVisible,
    isTab,
    handleSearch,
    handleCurrentSurah,
    handleCurrentTafseer,
    handleTab,
    handleCurrentLatest,
    handlePlayVideo,
    handlePauseVideo,
  };
};

export { useTafseer };
