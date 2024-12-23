import { useCallback, useEffect, useRef, useState } from 'react';

const useIslamicBooks = () => {
  const [isOpenBooks, setIsOpenBooks] = useState(false);

  const containerPdf = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerPdf.current &&
        !containerPdf.current.contains(e.target as Node)
      ) {
        setIsOpenBooks(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerPdf]);

  const handleOpenBooks = useCallback(() => {
    setIsOpenBooks((prev) => !prev);
  }, []);

  return {
    containerPdf,
    isOpenBooks,
    handleOpenBooks,
  };
};

export default useIslamicBooks;
