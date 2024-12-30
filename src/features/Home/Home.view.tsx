'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import Link from 'next/link';
import useHome from './hooks/useHome';
import Image from 'next/image';

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

const HomeView = () => {
  const { breakpoint } = useHome();

  // Mobile and tab view
  if (breakpoint === 'sm' || breakpoint === 'md') {
    return (
      <section
        className="grid grid-cols-1 min-h-screen w-full"
        style={{
          backgroundImage: 'url(/assets/images/home/bg-mobile.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="h-full w-full flex items-center justify-center text-white font-extrabold text-3xl group relative">
          <div className="relative h-64 w-64">
            <Image
              src="/assets/images/home/button-bg.png"
              alt="Japan Dahwa Foundation"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Link
                href="/non-muslim"
                className="whitespace-nowrap text-[#4A3A17]"
              >
                非ムスリム
              </Link>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center text-white font-extrabold text-3xl group relative">
          <div className="relative h-64 w-64">
            <Image
              src="/assets/images/home/button-bg.png"
              alt="Japan Dahwa Foundation"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <Link href="/muslim" className="whitespace-nowrap text-[#4A3A17]">
              ムスリム
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Desktop View
  return (
    <section className="flex items-center justify-center min-h-screen w-screen h-screen relative overflow-hidden">
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
