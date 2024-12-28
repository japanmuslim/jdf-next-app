'use client';

import Loading from '@/components/page/loading';
import useHome from '@/features/Home/hooks/useHome';
import MobileView from '@/features/Home/screens/Mobile.view';
import dynamic from 'next/dynamic';

const Category = dynamic(() => import('@/features/Home/screens/Category'), {
  ssr: false,
  loading: () => <Loading />,
});

const Videos = dynamic(() => import('@/features/Home/screens/Videos'), {
  ssr: false,
  loading: () => <Loading />,
});

const Slug = () => {
  const {
    isCategory,
    isVideo,
    breakpoint,
    dataCategory,
    isLoadingCategory,
    currentCategoryData,
    handleCategory,
  } = useHome();

  if (breakpoint === 'sm' || breakpoint === 'md')
    return <MobileView data={dataCategory?.data} />;

  if (isCategory && !isVideo && breakpoint === 'lg') {
    return (
      <Category
        data={dataCategory?.data}
        isLoading={isLoadingCategory}
        onHandleCategory={handleCategory}
      />
    );
  }

  return <Videos data={currentCategoryData?.videos} />;
};

export default Slug;
