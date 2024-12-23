import { useEffect, useState } from 'react';

const useViewport = () => {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSm(true);
        setIsMd(false);
      } else if (window.innerWidth < 768) {
        setIsSm(false);
        setIsMd(true);
      } else {
        setIsSm(false);
        setIsMd(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isSm, isMd };
};

export default useViewport;
