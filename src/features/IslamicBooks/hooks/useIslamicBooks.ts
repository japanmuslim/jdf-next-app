import { useCallback, useEffect, useRef, useState } from 'react';
import { Datum } from '../IslamicBook.type';

const useIslamicBooks = (data: Datum[]) => {
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [currentBook, setCurrentBook] = useState<number>(0);
  const [isOpenBooks, setIsOpenBooks] = useState<{
    isOpen: boolean;
    url: string;
  }>();

  const containerPdf = useRef<HTMLIFrameElement>(null);

  const isMd = typeof window !== 'undefined' && window.innerWidth > 768;
  const isSm = typeof window !== 'undefined' && window.innerWidth < 768;

  const dataLength = data.length;
  const itemsPerSlide = isMd ? 4 : isSm ? 2 : 1;
  const totalSlides = Math.ceil(dataLength / itemsPerSlide);

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (
  //       containerPdf.current &&
  //       !containerPdf.current.contains(e.target as Node)
  //     ) {
  //       setIsOpenBooks(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [containerPdf]);

  const handleCurrentCategory = useCallback((index: number) => {
    setCurrentCategory(index);
  }, []);

  const handleCurrentBook = useCallback(
    (index: number) => {
      setCurrentBook(index);
      setIsOpenBooks({
        isOpen: true,
        url: data[currentCategory]?.islamic_books[index]?.link_external,
      });
    },
    [currentCategory, data],
  );

  const handleCloseBooks = useCallback(() => {
    setIsOpenBooks({
      isOpen: false,
      url: '',
    });
  }, []);

  return {
    containerPdf,
    currentCategory,
    currentBook,
    isOpenBooks,
    dataLength,
    itemsPerSlide,
    totalSlides,
    handleCurrentBook,
    handleCloseBooks,
    handleCurrentCategory,
  };
};

export default useIslamicBooks;
