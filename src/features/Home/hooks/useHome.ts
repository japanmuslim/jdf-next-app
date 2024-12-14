import { useGetCategoryVideoQuery } from '@/services/api/homeService';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { CategoryVideoProps } from '../Home.type';

const useHome = () => {
  const router = useRouter();
  const isCategory = router.query.slug?.[0];
  const isVideo = router.query.slug?.[1];

  const [breakpoint, setBreakpoint] = useState<string>();

  const { data: dataCategory, isLoading: isLoadingCategory } =
    useGetCategoryVideoQuery(isCategory || '', {
      skip: !isCategory,
    });

  const currentCategoryData = dataCategory?.data.find(
    (category: CategoryVideoProps) =>
      category?.category_name?.replace(/ /g, '-').toLowerCase() === isVideo,
  );

  const handleCategory = useCallback(
    (categoryName: string) => {
      const name = categoryName.replace(/ /g, '-').toLowerCase();

      router.push(`/${isCategory}/${name}`);
    },
    [router, isCategory],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBreakpoint('sm');
      } else if (window.innerWidth < 1024) {
        setBreakpoint('md');
      } else {
        setBreakpoint('lg');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isCategory,
    isVideo,
    breakpoint,
    dataCategory,
    isLoadingCategory,
    currentCategoryData,
    handleCategory,
  };
};

export default useHome;
