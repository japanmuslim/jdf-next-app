import Loading from '@/components/page/loading';
import { CategoryVideoProps } from '@/features/Home/Home.type';
import {
  useGetCategoryVideoQuery,
  useGetVideoQuery,
} from '@/services/api/homeService';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const Category = dynamic(() => import('@/features/Home/screens/Category'), {
  ssr: false,
  loading: () => <Loading />,
});

const Videos = dynamic(() => import('@/features/Home/screens/Videos'), {
  ssr: false,
  loading: () => <Loading />,
});

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

const Slug = () => {
  const router = useRouter();
  const isCategory = router.query.slug?.[0];
  const isVideo = router.query.slug?.[1];

  const { data: dataCategory, isLoading: isLoadingCategory } =
    useGetCategoryVideoQuery(isCategory);

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

  if (isCategory && !isVideo) {
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
