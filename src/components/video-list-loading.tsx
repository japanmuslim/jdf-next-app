import React, { memo } from 'react';
import Swiper from './ui/swiper';
import { Skeleton } from './ui/skeleton';

const VideoListLoading = () => {
  return (
    <Swiper>
      {[1, 2, 3].map((_, index) => (
        <Skeleton key={index} className="h-64 bg-[#777A7B]" />
      ))}
    </Swiper>
  );
};

export default memo(VideoListLoading);
