'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import Link from 'next/link';
import useHome from './hooks/useHome';

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

const HomeView = () => {
  const { breakpoint } = useHome();

  // Mobile and tab view
  if (breakpoint === 'sm' || breakpoint === 'md') {
    return (
      <section className="grid grid-cols-1 min-h-screen w-full">
        <div
          className="h-full w-full flex items-center justify-center text-white font-extrabold text-3xl relative"
          style={{
            backgroundImage: 'url(/assets/images/faq/bg-hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 w-full h-full flex justify-center items-center">
            <Link href="/muslim">ムスリム</Link>
          </div>
        </div>
        <div
          className="h-full w-full flex items-center justify-center text-white font-extrabold text-3xl relative"
          style={{
            backgroundImage: 'url(/assets/images/tafseer/surah.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 w-full h-full flex justify-center items-center">
            <Link href="/non-muslim">非ムスリム</Link>
          </div>
        </div>
      </section>
    );
  }

  // Desktop View
  return (
    <section className="flex items-center justify-center min-h-screen w-full relative">
      <div className="absolute -translate-y-1/2 -translate-x-1/2 lg:top-[43%] md:top-[47%] top-[48%] left-1/2 flex justify-around w-[100%] z-50 lg:px-10 px-6">
        <Link
          href="/muslim"
          className="text-white font-extrabold lg:text-3xl md:text-xl text-[8px] text-center w-40 duration-300 hover:scale-125"
        >
          ムスリム
        </Link>
        <Link
          href="/non-muslim"
          className="text-white font-extrabold lg:text-3xl md:text-xl text-[8px] text-center w-40 duration-300 hover:scale-125"
        >
          非ムスリム
        </Link>
      </div>
      <VideoEmbed
        src="/assets/videos/home/section.mp4"
        muted={true}
        controls={false}
      />
    </section>
  );
};

export default memo(HomeView);
